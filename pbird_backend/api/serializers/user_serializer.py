"""User Serializer module definition"""
# DJANGO FILES
import re
from django.contrib.auth import authenticate
import phonenumbers
from rest_framework.serializers import (
    ModelSerializer,
    ValidationError,
    Serializer,
    CharField,
)

# LOCAL FILES
from ..models import CustomUser, Company, Account, Address, Error
from ..services.user_service import UserService


class RegistrationExclude:
    """class for the config UserRegistraionSerializer"""

    EXCLUDE = ("password", "groups", "user_permissions")
    EXTRA = {
        "security_question": {"write_only": True},
        "security_question_answer": {"write_only": True},
        "password": {"write_only": True},
        "otp": {"write_only": True},
    }


class FieldSerializer:
    """class for validate fields"""

    def validate_field(self, field, data):
        """validate any field"""
        if field not in data:
            raise Error.required(field)
        if data[field] == "":
            raise Error.empty(field)


class UserExclude:
    """class for the config UserSerializer"""

    EXCLUDE = RegistrationExclude.EXCLUDE
    EXTRA = {
        "security_question": {"write_only": True},
        "security_question_answer": {"write_only": True},
        "otp": {"write_only": True},
        "phone_number": {"read_only": True},
        "email": {"read_only": True},
        "last_login": {"read_only": True},
        "is_superuser": {"read_only": True},
        "is_staff": {"read_only": True},
        "is_active": {"read_only": True},
        "date_joined": {"read_only": True},
        "photo": {"read_only": True},
        "is_validated": {"read_only": True},
        "address": {"read_only": True},
        "signature": {"read_only": True},
        "role": {"read_only": True},
    }


class UserRegistrationSerializer(ModelSerializer):
    """User Serializer for Registration"""

    class Meta:
        """Meta class definition"""

        model = CustomUser
        exclude = RegistrationExclude.EXCLUDE
        extra_kwargs = RegistrationExclude.EXTRA

    def _validate_role(self, data):
        """validate user role"""
        if "role" not in data:
            raise Error.required("role")
        role = data["role"]
        if not Account.ROLE_SELECTION.__contains__((role, role)):
            raise Error.invalid("role (" + role + ")")
        return role

    def validate_phone_number(self, value):
        """validate phone number"""
        UserSerializer._validate_phone_number(self, value)
        if CustomUser.objects.filter(phone_number=value).exists():
            raise Error.exists("phone_number (" + str(value) + ")")
        return value

    def verify_existing_phone_number(self, value):
        """verify existing phone number"""
        value = UserSerializer._validate_phone_number(self, value)
        user = CustomUser.objects.filter(phone_number=value).first()
        if not user:
            raise Error.not_exists("phone_number (" + str(value) + ")")
        return user

    def _validate_phone_number(self, value):
        """validate phone number"""
        try:
            phonenumbers.parse(value)
        except:
            raise Error.not_valid("phone_number")
        return value

    def verifyPhoneNumber(self, oldnumber, newnumber):
        """verify existing phone number"""
        if oldnumber != newnumber:
            raise Error.not_match("Phone_number")
        return oldnumber

    def validate_is_active(self, value):
        """validate is_active"""
        value = True
        return value

    def _validate_otp(self, data):
        """validate otp"""
        FieldSerializer.validate_field(self, "otp", data)
        return data["otp"]

    def verify_otp(self, otp, otpmsg):
        """verify otp equals"""
        if otp != otpmsg:
            raise Error.not_match("otp")
        return otpmsg

    def validate_address():
        """validate and create adress"""
        address = Address(country="", state="", city="", zip_code="")
        address.save()
        return address

    def validate(self, data):
        """validate a required fields"""
        fields = ["first_name", "last_name", "phone_number"]
        for field in fields:
            FieldSerializer.validate_field(self, field, data)
        data["address"] = UserRegistrationSerializer.validate_address()
        data["otp"] = str(UserService.generate_otp())
        return data

    def verifyTwilio(self, phone_number, otp):
        """function to verify the twilio is working"""
        try:
            UserService.send_phone(str(phone_number), str(otp))
        except:
            raise Error.not_work("twilio")

    def verifySendGrid(self, email, otp):
        """function to verify the send grid service is working"""
        try:
            UserService.send_Mail(email, otp)
        except:
            raise Error.not_work("send grid service")


class CompanyRegistrationSerializer(UserRegistrationSerializer):
    """Company Serializer for Registration"""

    class Meta:
        """Meta class definition"""

        model = Company
        exclude = RegistrationExclude.EXCLUDE
        extra_kwargs = RegistrationExclude.EXTRA
        # depth = 1

    def validate(self, data):
        """validate fields for the step one of registration of a company"""
        super().validate(data)
        fields = ["_company", "siret"]
        for field in fields:
            FieldSerializer.validate_field(self, field, data)
        return data


class AddressSerializer(UserRegistrationSerializer):
    """Adress serializer"""

    class Meta:
        """Meta class definition"""

        model = Address
        fields = "__all__"

    def validate(self, data):
        fields = ["country", "city", "state", "zip_code"]
        for field in fields:
            FieldSerializer.validate_field(self, field, data)
        return data


class UserSerializer(UserRegistrationSerializer):
    """User Serializer"""

    class Meta:
        """Meta class definition"""

        model = CustomUser
        exclude = UserExclude.EXCLUDE
        extra_kwargs = UserExclude.EXTRA

    def validate_email(self, value):
        """validate email"""
        UserSerializer._validate_email(self, value)
        if CustomUser.objects.filter(email=value).exists():
            raise Error.exists("email (" + str(value) + ")")
        return value

    def validate_existing_email(self, value):
        """validate existing email"""
        UserSerializer._validate_email(self, value)
        user = CustomUser.objects.filter(email=value).first()
        if not user:
            raise Error.not_exists("email (" + str(value) + ")")
        return user

    def _validate_email(self, value):
        """validate email"""
        patt = r"^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$"
        if not re.match(patt, value):
            raise Error.not_valid("email (" + str(value) + ")")

    def verifyPassword(self, data):
        """verify password matched"""
        field = "password"
        FieldSerializer.validate_field(self, field, data)
        return data["password"]

    def _verifyPassword(self, password):
        """verify password"""
        if len(password) < 6:
            raise Error.err_length_least("password", 6)
        return password

    def validate(self, data):
        """validate a required fields"""
        fields = ["first_name", "last_name", "sex"]
        for field in fields:
            FieldSerializer.validate_field(self, field, data)
        return data


class UserNoDetailSerializer(UserSerializer):
    """User No Detail Serializer"""

    class Meta:
        """Meta class definition"""

        model = CustomUser
        fields = ("first_name", "last_name", "phone_number", "email")
        extra_kwargs = UserExclude.EXTRA


class CompanySerializer(ModelSerializer):
    """Company Serializer"""

    class Meta:
        """Meta class definition"""

        model = Company
        exclude = UserExclude.EXCLUDE
        extra_kwargs = UserExclude.EXTRA

    def _validate_file(self, files):
        """validate file"""
        if "file" not in files:
            raise Error.required("file")
        return files["file"]

    def verify_company(self, user):
        """function to verify company permission"""
        if user.role == Account.COMPANY:
            return user
        raise Error.not_company()

    def validate(self, data):
        """validate fields for update a profile of company"""
        UserSerializer.validate(self, data)
        fields = ["_company", "siret"]
        for field in fields:
            FieldSerializer.validate_field(self, field, data)
        return data


class LoginSerliazer(Serializer):
    """Login Serializer class"""

    phone_number = CharField()
    password = CharField()

    def validate(self, data):
        """default global validation serializer"""
        user = authenticate(**data)
        if user and user.is_active:
            if user.is_validated:
                return user
            raise Error.not_valid("account")
        raise ValidationError({"Authorization": "incorrect Credentials"})
