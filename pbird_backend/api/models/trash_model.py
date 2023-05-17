"""Trash module definition"""
# DJANGO FILES
from django.db import models

# LOCAL FILES
from ..models import CustomUser, Folder, Document


class Trash(models.Model):
    """Trash class definition"""

    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    folder = models.ForeignKey(Folder, on_delete=models.SET_NULL, null=True)
    document = models.ForeignKey(Document, on_delete=models.SET_NULL, null=True)
    deleted = models.DateTimeField(auto_now_add=True)
    is_shortcut = models.BooleanField(default=True)

    def __str__(self):
        return str(self.id)
