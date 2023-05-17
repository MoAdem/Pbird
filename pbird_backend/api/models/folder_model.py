"""Folder module definition"""
# DJANGO FILES
from django.db import models

# LOCAL FILES
from ..models import CustomUser


class Folder(models.Model):
    """Folder class definition"""

    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    size = models.BigIntegerField(blank=False, null=False, default=0)
    qr_code = models.ImageField(upload_to="qr_codes/folders", blank=True)
    key_code = models.CharField(max_length=100, null=False)
    users = models.ManyToManyField(CustomUser, blank=True, through="FoldersUsers")

    def __str__(self):
        return str(self.name)

    def remove_document(self, document_size):
        """remove the size of document from the folder whene it is deleted"""
        self.size -= document_size
        self.save()

    def add_document(self, size):
        """add the size of document to the folder whene it is added"""
        self.size += size
        self.save()


class FolderType:
    """Folder Type class definition, to identify the type of Folders"""

    CREATED = "CREATED"
    SHARED = "SHARED"
    RECEIVED = "RECEIVED"
    TYPE = [
        (CREATED, "CREATED"),
        (SHARED, "SHARED"),
        (RECEIVED, "RECEIVED"),
    ]


class FoldersUsers(models.Model):
    """Folders Users class definition, class many to many between User and Folder"""

    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    folder = models.ForeignKey(Folder, on_delete=models.CASCADE)
    type = models.CharField(
        max_length=20, choices=FolderType.TYPE, blank=True, null=True
    )
    created = models.DateTimeField(auto_now_add=True)
    is_shortcut = models.BooleanField(default=True)

    class Meta:
        """Meta class definition"""

        unique_together = [["user", "folder"]]

    def __str__(self):
        return str(self.id)
