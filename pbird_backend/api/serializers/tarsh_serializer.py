"""Trash Serializer module definition"""
# DJANGO FILES
from rest_framework.serializers import ModelSerializer

# LOCAL FILES
from ..serializers import (
    UserNoDetailSerializer,
    FolderSerializer,
    DocumentDetailSerializer,
)
from ..models import Trash


class TrashExtra:
    """TARSH EXTRA class"""

    EXTRA = {
        "is_shortcut": {"read_only": True},
    }


class TrashSerializer(ModelSerializer):
    """TRASH SERIALIZER"""

    class Meta:
        """Meta class definition"""

        model = Trash
        fields = ("id", "user_id", "folder_id", "document_id", "deleted", "is_shortcut")
        extra_kwargs = TrashExtra.EXTRA

    def get_trash_document(self, document_id, user_id):
        """get trash document"""
        return Trash.objects.filter(document=document_id, user=user_id).first()

    def get_trash_folders(self, folder_id, user_id):
        """get trash folder"""
        return Trash.objects.filter(
            user=user_id, folder=folder_id, document__isnull=True
        ).first()


class TrashDetailsSerializer(ModelSerializer):
    """TRASH DETAILS SERIALIZER"""

    user = UserNoDetailSerializer(many=False)
    folder = FolderSerializer(many=False)
    document = DocumentDetailSerializer(many=False)

    class Meta:
        """Meta class definition"""

        model = Trash
        fields = ("id", "deleted", "is_shortcut", "user", "folder", "document")
        extra_kwargs = TrashExtra.EXTRA
