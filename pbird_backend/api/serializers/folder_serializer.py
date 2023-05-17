"""Folder Serializer module definition"""
# DJANGO FILES
from rest_framework.serializers import ModelSerializer

# LOCAL FILES
from ..serializers.user_serializer import UserNoDetailSerializer, FieldSerializer
from ..models import Folder, FoldersUsers, Error


class FolderExtra:
    """FOLDER EXTRA"""

    EXTRA = {
        "size": {"read_only": True},
        "users": {"read_only": True},
    }


class FolderUserExtra:
    """FOLDER USER EXTRA"""

    EXTRA = {
        "created": {"read_only": True},
        "is_shortcut": {"read_only": True},
    }


class FolderSerializer(ModelSerializer):
    """FOLDER SERIALIZER"""

    class Meta:
        """Meta class definition"""

        model = Folder
        exclude = ("users", "key_code")
        extra_kwargs = FolderExtra.EXTRA

    def _validate_id(self, data):
        """validate folder_id"""
        FieldSerializer.validate_field(self, "id", data)
        return data["id"]

    def _validate_name(self, data):
        """validate folder_name"""
        FieldSerializer.validate_field(self, "name", data)
        return data["name"]

    def get_folder(self, _id):
        """get folder by id"""
        return Folder.objects.get(id=_id)

    def remove_size(self, _id, size):
        """remove folder size"""
        folder = FolderSerializer.get_folder(self, _id)
        if folder:
            folder.remove_document(size)

    def add_size(self, _id, size):
        """add folder size"""
        folder = FolderSerializer.get_folder(self, _id)
        if folder:
            folder.add_document(size)

    def validate_qr_code(self, data):
        """validate qr code"""
        if "qr_code" not in data:
            raise Error.required("qr_code")
        qr_code = data["qr_code"]
        fields = ["folder_id", "key_code"]
        for field in fields:
            FieldSerializer.validate_field(self, field, qr_code)
        return qr_code

    def verify_existing_folder(self, _id):
        """verify Existing folder by id"""
        folder = Folder.objects.filter(id=_id).first()
        if not folder:
            raise Error.not_exists("folder")
        return folder

    def validate_key_code(self, folder, key_code):
        """validate key_code"""
        if key_code != folder.key_code:
            raise Error.invalid("key code")
        return folder

    def validate_folders(self, data):
        """validate folders"""
        if "folders" not in data:
            raise Error.required("folders")
        return data


class FolderDetailsSerializer(ModelSerializer):
    """FOLDER DETAILS SERIALIZER"""

    users = UserNoDetailSerializer(many=True)

    class Meta:
        """Meta class definition"""

        model = Folder
        exclude = ("key_code",)
        extra_kwargs = FolderExtra.EXTRA


class FoldersUsersSerializer(ModelSerializer):
    """FOLDERS USERS SERIALIZER"""

    folder = FolderSerializer(many=False)

    class Meta:
        """Meta class definition"""

        model = FoldersUsers
        fields = ("id", "user_id", "is_shortcut", "created", "type", "folder")
        extra_kwargs = FolderUserExtra.EXTRA

    def verify_exist_folder(self, folder_id, user_id):
        """verify existing folder"""
        folder = FoldersUsers.objects.filter(folder=folder_id, user=user_id).first()
        if not folder:
            raise Error.not_exists("folder")
        return folder

    def verify_send_folder(self, user, folder):
        """verify send folder"""
        if FoldersUsers.objects.filter(user=user.id, folder=folder.folder.id).exists():
            return True
        return False

    def get_folder(self, folder_id, user_id):
        """get folder by id and user id"""
        return FoldersUsers.objects.filter(folder=folder_id, user=user_id).first()

    def verify_existing_folder(self, folder_id, user_id):
        """verify existing folder error"""
        folder = FoldersUsersSerializer.get_folder(self, folder_id, user_id)
        if folder:
            raise Error.exists("document")


class FoldersUsersDetailsSerizlizer(ModelSerializer):
    """FOLDER USERS SERIALIZER DETAILS"""

    user = UserNoDetailSerializer(many=False)
    folder = FolderDetailsSerializer(many=False)

    class Meta:
        """Meta class definition"""

        model = FoldersUsers
        fields = ("id", "is_shortcut", "created", "type", "user", "folder")
        extra_kwargs = FolderUserExtra.EXTRA
