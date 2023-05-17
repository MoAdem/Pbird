"""User module definition"""
# DJANGO FILES
from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.utils.translation import ugettext_lazy as _
from django.db import models
from phonenumber_field.modelfields import PhoneNumberField


class CustomUserManager(BaseUserManager):
    """Define a model manager for User model with no username field."""

    def _create_user(self, phone_number, password=None, **extra_fields):
        """Create and save a User with the given phone and password."""
        if not phone_number:
            raise ValueError("The given phone must be set")

        user = self.model(phone_number=phone_number, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, phone_number, password=None, **extra_fields):
        """Create and save a SuperUser with the given phone and password."""
        extra_fields.setdefault("is_staff", False)
        extra_fields.setdefault("is_superuser", False)
        return self._create_user(phone_number, password, **extra_fields)

    def create_superuser(self, phone_number, password=None, **extra_fields):
        """Create and save a SuperUser with the given phone and password."""
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError("Superuser must have is_staff=True.")
        if extra_fields.get("is_superuser") is not True:
            raise ValueError("Superuser must have is_superuser=True.")
        return self._create_user(phone_number, password, **extra_fields)


class Account:
    """Account class definition, used to identify different user application"""

    COMPANY = "COMPANY"
    SIMPLE_USER = "SIMPLE_USER"
    ROLE_SELECTION = [
        (COMPANY, "COMPANY"),
        (SIMPLE_USER, "SIMPLE_USER"),
    ]

    MAN = "MAN"
    WOMEN = "WOMEN"
    SEX_SELECTION = [
        (MAN, "man"),
        (WOMEN, "women"),
    ]


class Address(models.Model):
    """Address class definition"""

    id = models.AutoField(primary_key=True)
    country = models.CharField(max_length=200)
    city = models.CharField(max_length=200)
    state = models.CharField(max_length=200)
    zip_code = models.CharField(max_length=200)

    def get_full_address(self):
        """function return the full user's address"""
        return self.state + self.zip_code + self.city + self.country

    def __str__(self):
        return str(self.id)


class CustomUser(AbstractUser):
    """CustomUser class definition"""

    id = models.AutoField(primary_key=True)
    username = None
    address = models.OneToOneField(
        Address, on_delete=models.SET_NULL, null=True, blank=True
    )
    phone_number = PhoneNumberField(null=False, blank=False, unique=True)
    password = models.CharField(_("password"), max_length=128, blank=False)
    role = models.CharField(max_length=15, choices=Account.ROLE_SELECTION, blank=True)
    sex = models.CharField(
        max_length=10, choices=Account.SEX_SELECTION, default=Account.MAN
    )
    photo = models.ImageField(upload_to="photo_profil", blank=True)
    otp = models.CharField(max_length=200, blank=True)
    is_validated = models.BooleanField(default=False)

    USERNAME_FIELD = "phone_number"
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    def get_full_name(self):
        return str(self.first_name + " " + self.last_name)

    def _get_full_name(self):
        return str(self.first_name + "_" + self.last_name)

    def __str__(self):
        return str(self.phone_number)


class Company(CustomUser):
    """Company class definition"""

    _company = models.CharField(max_length=200, blank=True)
    siret = models.CharField(max_length=200, blank=False)
    signature = models.ImageField(upload_to="signature", blank=True)

    def __str__(self):
        return str(self.id)
