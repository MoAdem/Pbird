"""Document Controller module definition"""
# django files
import os
from django.db.models import Value
from django.core.files import File
from django.conf import settings
from rest_framework import viewsets, permissions
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import action

# local files
from pbird.pagination import CustomPagination
from ..models import Document, DocumentsUsers, DocumentType, Template, Error
from ..services import TemplateService, UserService, DocumentService
from ..filters import DocumentFilter
from ..serializers import (
    FoldersUsersSerializer,
    DocumentSerializer,
    DocumentUsersSerializer,
    DocumentUsersDetailsSerializer,
    TemplateSerializer,
    TemplateDetailsSerializer,
    UserSerializer,
    CompanySerializer,
)


class DocumentViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint that allows document attachments to be viewed
    """

    permission_classes = [permissions.IsAuthenticated]
    serializer_class = DocumentUsersSerializer
    detail_serializer_class = DocumentUsersDetailsSerializer
    queryset = DocumentsUsers.objects.all().order_by("-created")
    pagination_class = CustomPagination
    filterset_class = DocumentFilter

    def get_serializer_class(self):
        """default function return get all documents user or document by id"""
        if self.action == "retrieve":
            return self.detail_serializer_class
        return super().get_serializer_class()

    @action(
        detail=False,
        methods=["post"],
        url_name="upload_documents",
        url_path="upload_documents",
    )
    def upload_documents(self, request):
        """
        ENDPOINT TO UPLOAD DOCUMENTS AND GENERATE ITS CODE QR FROM OUR APPLICATION
        """
        user = self.request.user
        files = self.request.FILES.getlist("files")

        files = DocumentSerializer.validate_files(self, files)
        _list = []
        for file in files:
            name, extension = os.path.splitext(file.name)
            document = Document(title=name, size=file.size, type=extension)
            document.save()
            filename = str(document.id) + extension
            document.file.save(filename, File(file), save=False)
            DocumentService.generateQrCodeDocument(self, document)
            document.save()
            document_user = DocumentsUsers(
                user=user,
                document=document,
                is_shortcut=False,
                type=DocumentType.UPLOADED,
            )
            document_user.save()
            _list.append(document_user)
        serializer = DocumentUsersSerializer(_list, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=["get"], url_name="user", url_path="user")
    def get_all_documents_by_user(self, request):
        """
        ENDPOINT TO FIND ALL DOCUMENTS FOR AUTHENTICATED USER
        """
        user = self.request.user
        documents = DocumentsUsers.objects.filter(user=user.id).order_by("-created")
        document_filter = DocumentFilter(self.request.GET, queryset=documents).qs
        page = self.paginate_queryset(document_filter)
        serializer = DocumentUsersSerializer(page, many=True)
        result = self.get_paginated_response(serializer.data)
        return Response(result.data)

    @action(detail=False, methods=["get"], url_name="uploaded", url_path="uploaded")
    def get_all_uploaded_documents_by_user(self, request):
        """
        ENDPOINT TO FIND ALL UPLOADED DOCUMENTS FOR AUTHENTICATED USER
        """
        user = self.request.user
        documents = DocumentsUsers.objects.filter(
            user=user.id, is_shortcut=Value(False)
        ).order_by("-created")
        document_filter = DocumentFilter(self.request.GET, queryset=documents).qs
        page = self.paginate_queryset(document_filter)
        serializer = DocumentUsersSerializer(page, many=True)
        result = self.get_paginated_response(serializer.data)
        return Response(result.data)

    @action(detail=False, methods=["get"], url_name="received", url_path="received")
    def get_all_received_documents_by_user(self, request):
        """
        ENDPOINT TO FIND ALL RECEIVED DOCUMENTS FOR AUTHENTICATED USER
        """
        user = self.request.user
        documents = DocumentsUsers.objects.filter(
            user=user.id, is_shortcut=Value(True)
        ).order_by("-created")
        document_filter = DocumentFilter(self.request.GET, queryset=documents).qs
        page = self.paginate_queryset(document_filter)
        serializer = DocumentUsersSerializer(page, many=True)
        result = self.get_paginated_response(serializer.data)
        return Response(result.data)

    @action(
        detail=False,
        methods=["post"],
        url_name="send_to_users",
        url_path="send_to_users",
    )
    def send_documents(self, request):
        """
        ENDPOINT TO SEND DOCUMENTS TO USERS
        """
        user_sender = self.request.user
        data = self.request.data

        # send document by phone number
        if "users" in data:
            users = []
            for user in data["users"]:
                user = UserSerializer.verify_existing_phone_number(
                    self, user["phone_number"]
                )
                users.append(user)

            documents = DocumentService.verify_documents(self, data, user_sender)
            documents_send = DocumentService.send_documents(self, users, documents)
            return Response(
                {"success": str(documents_send) + " files sent"},
                status=status.HTTP_200_OK,
            )

        # send document by email
        if "emails" in data:
            users = []
            for email in data["emails"]:
                user = UserSerializer.validate_existing_email(self, email["email"])
                users.append(user)

            documents = DocumentService.verify_documents(self, data, user_sender)
            documents_send = DocumentService.send_documents(self, users, documents)
            return Response(
                {"success": str(documents_send) + " files sent"},
                status=status.HTTP_200_OK,
            )
        raise Error.required("users or emails")

    @action(
        detail=False,
        methods=["post"],
        url_name="send_by_qr_code",
        url_path="send_by_qr_code",
    )
    def send_documents_by_qr_code(self, request):
        """
        ENDPOINT TO SEND DOCUMENT TO USER BY QR CODE
        """
        user = self.request.user
        data = self.request.data
        qr_code = DocumentSerializer.validate_qr_code(self, data)

        document = DocumentSerializer.verify_existing_document(
            self, qr_code["document_id"]
        )
        DocumentUsersSerializer.verify_existing_file(self, document.id, user.id)
        DocumentSerializer.validate_key_code(self, document, qr_code["key_code"])

        document_user = DocumentsUsers(
            user=user,
            document=document,
            is_shortcut=True,
            read_only=False,
            type=DocumentType.SHARED,
        )
        document_user.save()
        serializer = DocumentUsersSerializer(document_user, many=False)
        return Response(serializer.data)

    @action(
        detail=False,
        methods=["put"],
        url_name="transfer_to_folder",
        url_path="transfer_to_folder",
    )
    def transfer_to_folder(self, request):
        """
        ENDPOINT TO TRANSFER DOCUMENTS TO FOLDER
        """
        user = self.request.user
        data = DocumentSerializer.validate_documents(self, self.request.data)

        folder = FoldersUsersSerializer.verify_exist_folder(
            self, data["folder_id"], user.id
        )
        documents = DocumentService.verify_documents(self, data, user)
        for document in documents:
            if document.folder:
                document.folder.size -= document.document.size
                document.folder.save()
            document.folder = folder.folder
            folder.folder.size += document.document.size
            document.save()
        folder.folder.save()
        return Response({"success": "files transfed"}, status=status.HTTP_200_OK)

    @action(
        detail=False,
        methods=["get"],
        url_name="documents_by_folder",
        url_path="documents_by_folder",
    )
    def documents_by_folder(self, request):
        """
        ENDPOINT TO FIND DOCUMENTS BY FOLDER
        """
        user = self.request.user
        folder_id = self.request.GET.get("folder_id")

        folder = FoldersUsersSerializer.verify_exist_folder(self, folder_id, user.id)
        documents = DocumentsUsers.objects.filter(folder=folder.folder).order_by(
            "-created"
        )
        document_filter = DocumentFilter(self.request.GET, queryset=documents).qs
        page = self.paginate_queryset(document_filter)
        serializer = DocumentUsersSerializer(page, many=True)
        result = self.get_paginated_response(serializer.data)
        return Response(result.data)


class TemplateViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint that allows template document attachments to be viewed
    """

    permission_classes = [permissions.IsAuthenticated]
    serializer_class = TemplateSerializer
    detail_serializer_class = TemplateDetailsSerializer
    queryset = Template.objects.all().order_by("-created")
    pagination_class = CustomPagination

    def get_serializer_class(self):
        """function of request getAllTemplate or getTemplateById"""
        if self.action == "retrieve":
            return self.detail_serializer_class
        return super().get_serializer_class()

    @action(detail=False, methods=["post"], url_name="generate", url_path="generate")
    def generate_template(self, request):
        """
        ENDPOINT TO GENERATE A TEMPLATE OF DOCUMENTS
        """
        user = self.request.user
        data = self.request.data

        serializer = TemplateSerializer(data=data)
        serializer.is_valid(raise_exception=True)
        serializer = serializer.add_template(user)
        return Response(serializer.data)

    @action(detail=False, methods=["get"], url_name="user", url_path="user")
    def get_all_templates_by_user(self, request):
        """
        ENDPOINT TO FIND ALL TEMPLATES BY USER
        """
        user = self.request.user
        templates = Template.objects.filter(user=user.id).order_by("-created")
        page = self.paginate_queryset(templates)
        serializer = TemplateSerializer(page, many=True)
        result = self.get_paginated_response(serializer.data)
        return Response(result.data)

    @action(
        detail=False,
        methods=["post"],
        url_name="generate_document",
        url_path="generate_document",
    )
    def generate_document(self, request):
        """
        ENDPOINT TO GENERATE A DOCUMENT FROM TEMPLATE
        """
        user = self.request.user
        data = self.request.data
        template_id = TemplateSerializer._validate_template_id(self, data)
        title = DocumentSerializer._validate_title(self, data)

        template = TemplateSerializer.get_template_by_user(self, template_id, user.id)
        template = TemplateService(template.header, template.footer, template.body)
        document = template.create_document(title)
        template.generate_document(document.id)

        document.file = template.path
        document.size = document.file.size
        DocumentService.generateQrCodeDocument(self, document)
        document.save()
        document_user = DocumentsUsers(user=user, document=document, is_shortcut=False)
        document_user.save()
        serializer = DocumentUsersDetailsSerializer(document_user, many=False)
        return Response(serializer.data)

    @action(
        detail=False,
        methods=["post"],
        url_name="generate_secure_document",
        url_path="generate_secure_document",
    )
    def generate_secure_document(self, request):
        """
        ENDPOINT TO GENERATE A SECURE TEMPLATE OF DOCUMENTS
        """
        user = UserService.getObjectProfile(self, self.request.user)
        data = self.request.data
        CompanySerializer.verify_company(self, user)
        template_id = TemplateSerializer._validate_template_id(self, data)
        title = DocumentSerializer._validate_title(self, data)
        url_signature = settings.BACKEND_ROOT_URL + "/media/" + user.signature.name
        path_signature = settings.MEDIA_ROOT + "/" + user.signature.name

        UserService.verify_existing_signature(self, path_signature)
        template = TemplateSerializer.get_template_by_user(self, template_id, user.id)
        template = TemplateService(template.header, template.footer, template.body)
        document = template.create_document(title)
        UserService.encryptionFile(self, path_signature)
        template.generate_document_with_signature(document.id, url_signature)
        UserService.encryptionFile(self, path_signature)

        document.file = template.path
        document.size = document.file.size
        DocumentService.generateQrCodeDocument(self, document)
        document.save()
        document_user = DocumentsUsers(user=user, document=document, is_shortcut=False)
        document_user.save()
        serializer = DocumentUsersDetailsSerializer(document_user, many=False)
        return Response(serializer.data)

    @action(detail=False, methods=["put"], url_name="update", url_path="update")
    def update_template(self, request):
        """
        ENDPOINT TO UPDATE TEMPLATE FOR AUTHENTICATED USER
        """
        user = self.request.user
        data = self.request.data
        template_id = TemplateSerializer._validate_id(self, data)

        instance = TemplateSerializer.get_template_by_user(self, template_id, user.id)
        serializer = TemplateSerializer(instance=instance, data=data, many=False)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
