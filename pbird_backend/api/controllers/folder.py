"""Folder Controller module definition"""
# DJANGO FILES
from django.db.models import Value
from rest_framework import viewsets, permissions
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework import status

# LOCAL FILES
from pbird.pagination import CustomPagination
from ..models import FoldersUsers, Error, FolderType
from ..serializers import (
    FolderSerializer,
    FoldersUsersSerializer,
    FoldersUsersDetailsSerizlizer,
    UserSerializer,
)
from ..services import FolderService
from ..filters import FolderFilter


class FolderViewSet(viewsets.ReadOnlyModelViewSet):

    """
    API endpoint that allows folder attachments to be viewed
    """

    permission_classes = [permissions.IsAuthenticated]
    queryset = FoldersUsers.objects.all().order_by("-created")
    serializer_class = FoldersUsersSerializer
    detail_serializer_class = FoldersUsersDetailsSerizlizer
    pagination_class = CustomPagination
    filterset_class = FolderFilter

    def get_serializer_class(self):
        """function of request getAllFolders or getFOlderById"""
        if self.action == "retrieve":
            return self.detail_serializer_class
        return super().get_serializer_class()

    @action(detail=False, methods=["post"], url_name="add", url_path="add")
    def add_folder(self, request):
        """
        ENDPOINT TO CREATE FOLDER OF AUTHENTICATED USER
        """
        user = self.request.user
        data = self.request.data
        serializer = FolderSerializer(data=data, many=False)
        serializer.is_valid(raise_exception=True)
        folder = serializer.save()
        FolderService.generateQrCodeFolder(self, folder)
        folder.save()
        folder_user = FoldersUsers(
            user=user, folder=folder, is_shortcut=False, type=FolderType.CREATED
        )
        folder_user.save()
        return Response(FoldersUsersDetailsSerizlizer(folder_user, many=False).data)

    @action(detail=False, methods=["get"], url_name="by_user", url_path="by_user")
    def get_folders_by_user(self, request):
        """
        ENDPOINT TO FIND ALL FOLDERS OF AUTHENTICATED USER
        """
        user = self.request.user
        folders = FoldersUsers.objects.filter(user=user.id).order_by("-created")
        folder_filter = FolderFilter(self.request.GET, queryset=folders).qs
        page = self.paginate_queryset(folder_filter)
        serializer = FoldersUsersSerializer(page, many=True)
        result = self.get_paginated_response(serializer.data)
        return Response(result.data)

    @action(detail=False, methods=["get"], url_name="received", url_path="received")
    def get_received_folders(self, request):
        """
        ENDPOINT TO FIND ALL RECEIVED FOLDERS FOR AUTHENTICATED USER
        """
        user = self.request.user
        folders = FoldersUsers.objects.filter(
            user=user.id, is_shortcut=Value(True)
        ).order_by("-created")
        folder_filter = FolderFilter(self.request.GET, queryset=folders).qs
        page = self.paginate_queryset(folder_filter)
        serializer = FoldersUsersSerializer(page, many=True)
        result = self.get_paginated_response(serializer.data)
        return Response(result.data)

    @action(detail=False, methods=["get"], url_name="created", url_path="created")
    def get_created_folders(self, request):
        """
        ENDPOINT TO FIND ALL CREATED FOLDERS FOR AUTHENTICATED USER
        """
        user = self.request.user
        folders = FoldersUsers.objects.filter(
            user=user.id, is_shortcut=Value(False)
        ).order_by("-created")
        folder_filter = FolderFilter(self.request.GET, queryset=folders).qs
        page = self.paginate_queryset(folder_filter)
        serializer = FoldersUsersSerializer(page, many=True)
        result = self.get_paginated_response(serializer.data)
        return Response(result.data)

    @action(detail=False, methods=["put"], url_name="update", url_path="update")
    def rename_folder(self, request):
        """
        ENDPOINT TO RENAME FOLDER FOR AUTHENTICATED USER
        """
        user = self.request.user
        data = self.request.data
        folder_id = FolderSerializer._validate_id(self, data)
        name = FolderSerializer._validate_name(self, data)

        folder = FoldersUsersSerializer.verify_exist_folder(self, folder_id, user.id)
        folder.folder.name = name
        folder.folder.save()
        return Response({"sucssess": "folder name updated"}, status=status.HTTP_200_OK)

    @action(
        detail=False,
        methods=["post"],
        url_name="send_to_users",
        url_path="send_to_users",
    )
    def send_folders_to_users(self, request):
        """
        ENDPOINT TO SEND FOLDERS TO USERS AND CHANGE TYPE
        """
        user_sender = self.request.user
        data = self.request.data

        # send folders by phone number
        if "users" in data:
            users = []
            for user in data["users"]:
                user = UserSerializer.verify_existing_phone_number(
                    self, user["phone_number"]
                )
                users.append(user)
            folders = FolderService.verify_folders(self, data, user_sender)
            folders_sent = FolderService.send_folders(self, users, folders)
            return Response(
                {"success": str(folders_sent) + " folders sent"},
                status=status.HTTP_200_OK,
            )

        # send folders by email
        if "emails" in data:
            users = []
            for email in data["emails"]:
                user = UserSerializer.validate_existing_email(self, email["email"])
                users.append(user)
            folders = FolderService.verify_folders(self, data, user_sender)
            folders_sent = FolderService.send_folders(self, users, folders)
            return Response(
                {"success": str(folders_sent) + " folders sent"},
                status=status.HTTP_200_OK,
            )
        raise Error.required("users or emails")

    @action(
        detail=False,
        methods=["post"],
        url_name="send_by_qr_code",
        url_path="send_by_qr_code",
    )
    def send_folder_by_qr_code(self, request):
        """
        ENDPOINT TO SEND FOLDER TO USER BY QR CODE
        """
        user = self.request.user
        data = self.request.data
        qr_code = FolderSerializer.validate_qr_code(self, data)

        folder = FolderSerializer.verify_existing_folder(self, qr_code["folder_id"])
        FoldersUsersSerializer.verify_existing_folder(self, folder.id, user.id)
        FolderSerializer.validate_key_code(self, folder, qr_code["key_code"])

        folder_user = FoldersUsers(
            user=user, folder=folder, is_shortcut=True, type=FolderType.RECEIVED
        )
        folder.type = FolderType.SHARED
        folder.save()
        folder_user.save()
        serializer = FoldersUsersSerializer(folder_user, many=False)
        return Response(serializer.data)
