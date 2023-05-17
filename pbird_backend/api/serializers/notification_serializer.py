"""Notification Serializer module definition"""
# DJANGO FILES
from rest_framework import serializers

# LOCAL FILES
from ..models import Notification


class NotificationSerializer(serializers.ModelSerializer):
    """NOTIFICATION SERIALIZER"""

    class Meta:
        """Meta class definition"""

        model = Notification
        fields = "__all__"

        depth = 1
