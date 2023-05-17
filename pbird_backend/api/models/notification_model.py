"""Notification module definition"""
# DJANGO FILES
from django.db import models

# LOCAL FILES
from ..models import CustomUser


TYPE_SELECTION = [
    ("folder", "folder"),
    ("document", "document"),
]


class Notification(models.Model):
    """Notification class definition"""

    id = models.AutoField(primary_key=True)
    created_at = models.DateTimeField(auto_now_add=True)
    is_seen = models.CharField(max_length=255, default="0")
    created_by = models.ForeignKey(
        CustomUser, related_name="notifications", null=True, on_delete=models.SET_NULL
    )
    to_user = models.ForeignKey(
        CustomUser,
        related_name="creatednotifications",
        null=True,
        on_delete=models.SET_NULL,
    )
    type = models.CharField(max_length=20, choices=TYPE_SELECTION)

    class Meta:
        """Meta class definition"""

        ordering = ["-created_at"]

    def __str__(self):
        return str(self.created_at)
