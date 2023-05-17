"""Folder service definition"""
# DJANGO FILES
import qrcode

# LOCAL FILES
from ..models import Error, FoldersUsers, FolderType
from ..serializers import FoldersUsersSerializer
from ..services import DocumentService


class FolderService:
    """Folder service class definition"""

    def generateQrCodeFolder(self, folder):
        """generate Qr Code Folder"""
        folder.key_code = DocumentService.generateKeyCode()
        original_file = qrcode.make(
            {"folder_id": folder.id, "key_code": folder.key_code}
        )
        folder.qr_code = DocumentService.genererQrCode(self, original_file, folder.id)

    def verify_folders(self, data, user_sender):
        """verify sharing folders"""
        if "folders" in data:
            folders = []
            for folder in data["folders"]:
                folder = FoldersUsersSerializer.get_folder(
                    self, folder["id"], user_sender.id
                )
                if folder:
                    folders.append(folder)
            return folders
        raise Error.required("folders")

    def send_folders(self, users, folders):
        """share folder"""
        folders_sent = 0
        for user in users:
            for folder in folders:
                if folder.type != FolderType.SHARED:
                    folder.type = FolderType.SHARED
                    folder.save()
                if not FoldersUsersSerializer.verify_send_folder(self, user, folder):
                    folder_user = FoldersUsers(
                        user=user,
                        folder=folder.folder,
                        is_shortcut=True,
                        type=FolderType.RECEIVED,
                    )
                    folder_user.save()
                    folders_sent += 1
        return folders_sent
