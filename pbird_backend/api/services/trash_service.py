"""Trash service definition"""
# LOCAL FILES
from ..models import Error, DocumentsUsers, Trash
from ..serializers import (
    TrashSerializer,
    DocumentUsersSerializer,
    FoldersUsersSerializer,
)
from .document_service import DocumentService


class TrashService:
    """Trash service class definition"""

    def verify_documents(self, data, user_sender):
        """verify existing documents"""
        if "documents" in data:
            documents = []
            for document in data["documents"]:
                document = DocumentUsersSerializer.verifyExistingFile(
                    self, document["id"], user_sender.id
                )
                if document:
                    documents.append(document)
            return documents
        raise Error.required("documents")

    def verify_trash_documents(self, data, user_sender):
        """verify existing trash documents"""
        if "documents" in data:
            documents = []
            for document in data["documents"]:
                document = TrashSerializer.get_trash_document(
                    self, document["id"], user_sender.id
                )
                if document:
                    documents.append(document)
            return documents
        raise Error.required("documents")

    def verify_folders(self, data, user_sender):
        """berify existing folders"""
        folders = []
        for folder in data["folders"]:
            folder = FoldersUsersSerializer.get_folder(
                self, folder["id"], user_sender.id
            )
            if folder:
                folders.append(folder)
        return folders

    def send_all_documents_in_folder_to_trash(self, folder, user):
        """send all documents in folder to trash"""
        documents_deleted = 0
        documents = DocumentsUsers.objects.filter(user=user.id, folder=folder.id)
        for document in documents:
            trash = Trash(
                user=user,
                document=document.document,
                folder=document.folder,
                is_shortcut=document.is_shortcut,
            )
            trash.save()
            document.delete()
            documents_deleted += 1
        return documents_deleted

    def verify_trash_folders(self, data, user):
        """verify existing trash folders"""
        folders = []
        for folder in data["folders"]:
            folder = TrashSerializer.get_trash_folders(self, folder["id"], user.id)
            if folder:
                folders.append(folder)
        return folders

    def restor_all_documents_in_folder_from_trash(self, trash, user):
        """restor all documents in folder from trash"""
        documents_restored = 0
        trash_documents = Trash.objects.filter(
            user=user.id, folder=trash.folder.id, document__isnull=False
        )
        for document in trash_documents:
            document_user = DocumentsUsers(
                user=user,
                folder=trash.folder,
                document=document.document,
                is_shortcut=document.is_shortcut,
            )
            document_user.save()
            document.delete()
            documents_restored += 1
        return documents_restored

    def delete_all_documents_in_folder_from_trash(self, trash, user):
        """delete all documents in folder from trash"""
        documents_deleted = 0
        trash_documents = Trash.objects.filter(
            user=user.id, folder=trash.folder.id, document__isnull=False
        )
        for document in trash_documents:
            if not document.is_shortcut:
                DocumentService.deleteFile(self, document.document.file.name)
                DocumentService.deleteFile(self, document.document.qr_code.name)
            document.delete()
            documents_deleted += 1
        return documents_deleted
