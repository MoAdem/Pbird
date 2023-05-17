"""User service definition"""
# DJANGO FILES
import os
import random
from django.conf import settings
from twilio.rest import Client
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail, From

# LOCAL FILES
from ..models import Account, CustomUser, Company, Error
from .interfaces.user_interface import UserInterface
from ..serializers import user_serializer as U


class UserService(UserInterface):
    """User service class definition"""

    def send_Mail(mail, otp):
        """send mail with send grid"""
        sg = SendGridAPIClient(settings.SENDGRID_API_KEY)
        message = Mail(
            from_email=From("pbirdtestsmtp@gmail.com", "PBird"), to_emails=mail
        )
        message.dynamic_template_data = {
            "body": "your confirmation code is " + str(otp),
            "code": str(otp),
        }
        message.template_id = "d-f26e93d444fc4fb2a7090e7c0b78ee0e"
        sg.send(message)

    def generate_otp():
        """generate rondom otp"""
        otp = random.randint(100000, 999999)
        return otp

    def send_phone(phone_number, otp):
        """send otp to phone number"""
        account_sid = settings.TWILIO_SID
        auth_token = settings.TWILIO_TOKEN
        client = Client(account_sid, auth_token)

        client.messages.create(
            body=otp, from_=settings.TWILIO_PHONE_NUMBER, to=phone_number
        )

    def getProfile(self, user: CustomUser):
        """get user serializer profile"""
        if user.role == Account.SIMPLE_USER:
            return U.UserSerializer(CustomUser.objects.get(id=user.id), many=False).data
        elif user.role == Account.COMPANY:
            return U.CompanySerializer(Company.objects.get(id=user.id), many=False).data
        raise Error.not_define("role")

    def getObjectProfile(self, user: CustomUser):
        """get user object profile"""
        if user.role == Account.SIMPLE_USER:
            return CustomUser.objects.get(id=user.id)
        elif user.role == Account.COMPANY:
            return Company.objects.get(id=user.id)
        raise Error.not_define("role")

    def encryptionFile(self, path):
        """encryption signature"""
        with open(path, "rb") as fin:
            file = fin.read()
            fin.close()

        file = bytearray(file)
        key = settings.ENCRYPTION_KEY

        for index, values in enumerate(file):
            file[index] = values ^ key

        with open(path, "wb") as fin:
            fin.write(file)
            fin.close()

    def verify_existing_signature(self, path):
        """verify existing signatuer if not raise an error"""
        if not os.path.exists(path):
            raise Error.not_exists("signature")
