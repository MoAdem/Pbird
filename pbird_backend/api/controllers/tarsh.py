"""Trash Controller definition"""
# DJANGO FILES
from rest_framework import viewsets, permissions
from rest_framework.response import Response
from rest_framework.decorators import action

# LOCAL FILES
from pbird.pagination import CustomPagination
from ..serializers import TrashSerializer, TrashDetailsSerializer, FolderSerializer
from ..models import Trash, DocumentsUsers, FoldersUsers
from ..services import TrashService, DocumentService


class TrashViewSet(viewsets.ReadOnlyModelViewSet):

    """
    API endpoint that allows trash attachments to be viewed
    """

    permission_classes = [permissions.IsAuthenticated]
    queryset = Trash.objects.all().order_by("-deleted")
    serializer_class = TrashSerializer
    detail_serializer_class = TrashDetailsSerializer
    pagination_class = CustomPagination

    def get_serializer_class(self):
        """function of request getAllTrashs or getTarshById"""
        if self.action == "retrieve":
            return self.detail_serializer_class
        return super().get_serializer_class()

    @action(
        detail=False,
        methods=["delete"],
        url_name="send_documents",
        url_path="send_documents",
    )
    def send_documents_to_trash(self, request):
        """
        ENDPOINT TO SEND DOCUMENT TO TRASH OF AUTHENTICATED USER
        """
        user = self.request.user
        data = self.request.data

        documents = TrashService.verify_documents(self, data, user)
        documents_deleted = 0
        for document in documents:
            trash = Trash(
                user=user,
                folder=document.folder,
                document=document.document,
                is_shortcut=document.is_shortcut,
            )
            trash.save()
            if document.folder:
                FolderSerializer.remove_size(
                    self, document.folder.id, document.document.size
                )
            document.delete()
            documents_deleted += 1
        return Response({"success": str(documents_deleted) + " documents deleted"})

    @action(
        detail=False,
        methods=["post"],
        url_name="restor_documents",
        url_path="restor_documents",
    )
    def restor_documents_from_trash(self, request):
        """
        ENDPOINT TO RESTOR DOCUMENT FROM TRASH OF AUTHENTICATED USER
        """
        user = self.request.user
        data = self.request.data

        documents = TrashService.verify_trash_documents(self, data, user)
        documents_restored = 0
        for document in documents:
            document_user = DocumentsUsers(
                user=user, document=document.document, is_shortcut=document.is_shortcut
            )
            document_user.save()
            document.delete()
            documents_restored += 1
        return Response({"success": str(documents_restored) + " documents restored"})

    @action(
        detail=False,
        methods=["delete"],
        url_name="delete_documents",
        url_path="delete_documents",
    )
    def delete_documents_from_trash(self, request):
        """
        ENDPOINT TO DELETE DOCUMENT FROM TRASH OF AUTHENTICATED USER
        """
        user = self.request.user
        data = self.request.data

        documents = TrashService.verify_trash_documents(self, data, user)
        documents_deleted = 0
        for document in documents:
            if not document.is_shortcut:
                DocumentService.deleteFile(self, document.document.file.name)
                DocumentService.deleteFile(self, document.document.qr_code.name)
            document.delete()
            documents_deleted += 1
        return Response({"success": str(documents_deleted) + " documents deleted"})

    @action(
        detail=False,
        methods=["delete"],
        url_name="send_folders",
        url_path="send_folders",
    )
    def send_folders_to_trash(self, request):
        """
        ENDPOINT TO SEND FOLDERS TO TRASH OF AUTHENTICATED USER
        """
        user = self.request.user
        data = FolderSerializer.validate_folders(self, self.request.data)

        folders = TrashService.verify_folders(self, data, user)
        folders_deleted = 0
        documents_deleted = 0
        for folder in folders:
            documents_deleted += TrashService.send_all_documents_in_folder_to_trash(
                self, folder.folder, user
            )
            trash = Trash(
                user=user, folder=folder.folder, is_shortcut=folder.is_shortcut
            )
            trash.save()
            folder.delete()
            folders_deleted += 1
        return Response(
            {
                "success": str(folders_deleted)
                + " folders deleted and "
                + str(documents_deleted)
                + " documents deleted"
            }
        )

    @action(
        detail=False,
        methods=["post"],
        url_name="restor_folders",
        url_path="restor_folders",
    )
    def restor_folders_from_trash(self, request):
        """
        ENDPOINT TO RESTOR FOLDERS FROM TRASH OF AUTHENTICATED USER
        """
        user = self.request.user
        data = FolderSerializer.validate_folders(self, self.request.data)
        trashs = TrashService.verify_trash_folders(self, data, user)
        folders_restored = 0
        documents_restored = 0
        for trash in trashs:
            documents_restored += (
                TrashService.restor_all_documents_in_folder_from_trash(
                    self, trash, user
                )
            )
            folder_user = FoldersUsers(
                user=user, folder=trash.folder, is_shortcut=trash.is_shortcut
            )
            folder_user.save()
            trash.delete()
            folders_restored += 1
        return Response(
            {
                "success": str(folders_restored)
                + " folders restored and "
                + str(documents_restored)
                + " documents restored"
            }
        )

    @action(
        detail=False,
        methods=["delete"],
        url_name="delete_folders",
        url_path="delete_folders",
    )
    def delete_folders_from_trash(self, request):
        """
        ENDPOINT TO DELETE FOLDERS FROM TRASH OF AUTHENTICATED USER
        """
        user = self.request.user
        data = self.request.data

        trashs = TrashService.verify_trash_folders(self, data, user)
        folders_deleted = 0
        documents_deleted = 0
        for trash in trashs:
            documents_deleted += TrashService.delete_all_documents_in_folder_from_trash(
                self, trash, user
            )
            if not trash.is_shortcut:
                trash.folder.delete()
            trash.delete()
            folders_deleted += 1
        return Response(
            {
                "success": str(folders_deleted)
                + " folders deleted and "
                + str(documents_deleted)
                + " documents deleted"
            }
        )

    @action(detail=False, methods=["get"], url_name="user", url_path="user")
    def get_trash_by_user(self, request):
        """
        ENDPOINT TO FIND ALL TRASH FOR AUTHENTICATED USER
        """
        user = self.request.user

        trashs = Trash.objects.filter(user=user.id).order_by("-deleted")
        page = self.paginate_queryset(trashs)
        serializer = TrashSerializer(page, many=True)
        result = self.get_paginated_response(serializer.data)
        return Response(result.data)

    @action(
        detail=False,
        methods=["get"],
        url_name="documents_user",
        url_path="documents_user",
    )
    def get_documents_in_trash_by_user(self, request):
        """
        ENDPOINT TO FIND ALL DOCUMENTS IN TRASH FOR AUTHENTICATED USER
        """
        user = self.request.user

        trashs = Trash.objects.filter(user=user.id, document__isnull=False).order_by(
            "-deleted"
        )
        page = self.paginate_queryset(trashs)
        serializer = TrashSerializer(page, many=True)
        result = self.get_paginated_response(serializer.data)
        return Response(result.data)

    @action(
        detail=False, methods=["get"], url_name="folders_user", url_path="folders_user"
    )
    def get_folders_in_trash_by_user(self, request):
        """
        ENDPOINT TO FIND ALL FOLDERS IN TRASH FOR AUTHENTICATED USER
        """
        user = self.request.user

        trashs = Trash.objects.filter(user=user.id, document__isnull=True).order_by(
            "-deleted"
        )
        page = self.paginate_queryset(trashs)
        serializer = TrashSerializer(page, many=True)
        result = self.get_paginated_response(serializer.data)
        return Response(result.data)
