"""User Controller difinition"""
# DJANGO FILES
import os
from django.core.files import File
from django.conf import settings
from rest_framework import generics, permissions, viewsets
from rest_framework.exceptions import ValidationError
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.views import APIView
from rest_framework import status
from knox.models import AuthToken
import phonenumbers

# LOCAL FILES
from ..models import CustomUser, Account, Message
from ..serializers.user_serializer import (
    Error,
    UserRegistrationSerializer,
    CompanyRegistrationSerializer,
    LoginSerliazer,
    UserSerializer,
    CompanySerializer,
    AddressSerializer,
)
from ..services import UserService, DocumentService


# pylint: disable=too-many-ancestors
class UserViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint that allows user attachments to be viewed or edited.
    """

    permission_classes = [permissions.IsAuthenticated]
    queryset = CustomUser.objects.all()

    @action(
        detail=False,
        methods=["post"],
        url_name="send_sponsorship",
        url_path="send_sponsorship",
    )
    def send_sponsorship(self, request):
        """
        ENDPOINT TO SEND SPONSORSHIP
        """
        data = self.request.data
        message = "Join Us on http://Pbird.com/"
        if "phones" in data:
            for phone in data["phones"]:
                phone_number = phone["phone_number"]
                if phone_number == "":
                    raise ValidationError({"empty_fields": "Empty fields"})
                try:
                    phonenumbers.parse(phone_number)
                except:
                    raise ValidationError(
                        {"phone_not_valid": "phone_not_valid  " + str(phone_number)}
                    )
            for phone in data["phones"]:
                phone_number = phone["phone_number"]

                UserService.send_phone(str(phone_number), message)

            return Response({"Sent": "sent"}, status=status.HTTP_200_OK)
        if "emails" in data:
            for email in data["emails"]:
                mail = email["mail"]
                if mail == "":
                    raise ValidationError({"empty_fields": "Empty fields"})

            for email in data["emails"]:
                mail = email["mail"]
                UserService.send_Mail(mail, message)

            return Response({"Sent": "sent"}, status=status.HTTP_200_OK)
        return Response({"error": "error"}, status=status.HTTP_400_BADE_REQUEST)

    @action(
        detail=False,
        methods=["put"],
        url_name="define_password",
        url_path="define_password",
    )
    def define_password(self, request):
        """
        ENDPOINT TO DEFINE PASSWORD
        """
        user = self.request.user
        data = self.request.data

        password = UserSerializer.verifyPassword(self, data)
        user.set_password(password)
        user.save()
        return Response(UserService.getProfile(self, user))

    @action(
        detail=False, methods=["post"], url_name="validate_otp", url_path="validate_otp"
    )
    def Validate_otp(self, request):
        """
        ENDPOINT TO VALIDATE OTP
        """
        data = self.request.data
        user = self.request.user

        otp = UserSerializer._validate_otp(self, data)
        if user.is_validated:
            return Message.validated("user")
        UserRegistrationSerializer.verify_otp(self, user.otp, otp)
        user.is_validated = True
        user.save()
        return Response(UserService.getProfile(self, user))

    @action(detail=False, methods=["put"], url_name="send_otp", url_path="send_otp")
    def send_otp(self, request):
        """
        ENDPOINT TO RESEND NEW OTP
        """
        user = self.request.user
        data = self.request.data
        otp = str(UserService.generate_otp())

        if "phone_number" in data:
            phone_number = UserSerializer._validate_phone_number(
                self, data["phone_number"]
            )
            UserSerializer.verifyTwilio(self, phone_number, otp)
            CustomUser.objects.filter(id=user.id).update(otp=otp)
            return Message.send("twilio", "code")
        if "email" in data:
            email = data["email"]
            UserSerializer.verifySendGrid(self, email, otp)
            CustomUser.objects.filter(email=user.email).update(otp=otp)
            return Message.send("email", "code")
        raise Error.required("phone_number or email")

    @action(detail=False, methods=["put"], url_name="address", url_path="address")
    def update_address(self, request):
        """
        ENDPOINT TO UPDATE ADDRESS
        """
        user = self.request.user
        data = self.request.data

        serializer = AddressSerializer(instance=user.address, data=data, many=False)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(UserService.getProfile(self, user))


class RegisterController(generics.GenericAPIView):
    """
    API endpoint that allows user to be registrated.
    """

    def post(self, request):
        """API user registration"""
        data = self.request.data
        role = UserRegistrationSerializer._validate_role(self, data)
        # REGISTRATION FOR A COMPANY
        if role == Account.COMPANY:
            serializer = CompanyRegistrationSerializer(data=request.data)
        # REGISTRATION FOR A SIMPLE USER
        else:
            serializer = UserRegistrationSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        UserSerializer.verifyTwilio(self, user.phone_number, user.otp)
        return Response(
            {"user": serializer.data, "token": AuthToken.objects.create(user)[1]}
        )


class LoginController(generics.GenericAPIView):
    """
    API endpoint that allows user to login.
    """

    serializer_class = LoginSerliazer

    def post(self, request):
        """API login user"""
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        return Response(
            {
                "user": UserService.getProfile(self, user),
                "token": AuthToken.objects.create(user)[1],
            }
        )


class ResetPasswordController(APIView):
    """
    API endpoint that allows user to reset password.
    """

    def put(self, request):
        """API reset password"""
        data = self.request.data
        user = UserSerializer.verify_existing_phone_number(self, data["phone_number"])
        otp = str(UserService.generate_otp())
        UserSerializer.verifyTwilio(self, user.phone_number, otp)
        user.is_validated = False
        user.otp = otp
        user.save()
        return Response(
            {
                "user": UserService.getProfile(self, user),
                "token": AuthToken.objects.create(user)[1],
            }
        )


class UserAuthenticated(generics.RetrieveAPIView):
    """
    API endpoint that allows user to get her profile.
    """

    permission_classes = [
        permissions.IsAuthenticated,
    ]

    # pylint: disable=arguments-differ
    def get(self, request):
        """API get user profile"""
        user = self.request.user
        return Response(UserService.getProfile(self, user))


class UpdateProfileController(generics.GenericAPIView):
    """
    API endpoint that allows user to update her profile.
    """

    permission_classes = [
        permissions.IsAuthenticated,
    ]

    def put(self, request):
        """update user profile"""
        user = UserService.getObjectProfile(self, self.request.user)
        data = self.request.data

        if "otp" in data:
            otp = UserSerializer._validate_otp(self, data)
            UserSerializer.verify_otp(self, user.otp, otp)
            # update only phone number
            if "phone_number" in data:
                if user.phone_number != data["phone_number"]:
                    phone_number = UserSerializer.validate_phone_number(
                        self, data["phone_number"]
                    )
                    user.phone_number = phone_number
            # update only email
            if "email" in data:
                if user.email != data["email"]:
                    email = UserSerializer.validate_email(self, data["email"])
                    user.email = email
            user.save()
        # update password
        if "current_password" in data and "new_password" in data:
            currentPassword = data["current_password"]
            newPassword = UserSerializer._verifyPassword(self, data["new_password"])
            if user.check_password(currentPassword):
                user.set_password(newPassword)
                user.save()
            else:
                raise Error.password_is_false()
        # update company
        if user.role == Account.COMPANY:
            serializer = CompanySerializer(instance=user, data=data, many=False)
        # update simple user
        else:
            serializer = UserSerializer(instance=user, data=data, many=False)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


class UploadPhotoController(generics.GenericAPIView):
    """
    API endpoint that allows user to upload her photo.
    """

    permission_classes = [
        permissions.IsAuthenticated,
    ]

    def put(self, request):
        """upload user photo"""
        user = self.request.user
        files = self.request.FILES

        file = CompanySerializer._validate_file(self, files)
        _, extension = os.path.splitext(file.name)
        DocumentService.deleteFile(self, user.photo.name)
        user.photo.save(str(user.id) + extension, File(file), save=False)
        user.save()
        return Response(
            {"user_photo": settings.BACKEND_ROOT_URL + "/media/" + user.photo.name}
        )


class UploadCompanySignatureController(generics.GenericAPIView):
    """
    API endpoint that allows company to upload her signature.
    """

    permission_classes = [
        permissions.IsAuthenticated,
    ]

    def put(self, request):
        """upload company signature"""
        user = UserService.getObjectProfile(self, self.request.user)
        files = self.request.FILES

        file = CompanySerializer._validate_file(self, files)
        CompanySerializer.verify_company(self, user)
        _, extension = os.path.splitext(file.name)
        DocumentService.deleteFile(self, user.signature.name)
        user.signature.save(str(user.id) + extension, File(file), save=False)
        user.save()
        UserService.encryptionFile(
            self, settings.MEDIA_ROOT + "/" + user.signature.name
        )
        return Response(
            {
                "user_signature": settings.BACKEND_ROOT_URL
                + "/media/"
                + user.signature.name
            }
        )
