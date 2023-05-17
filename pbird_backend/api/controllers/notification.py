"""Notification Controller module definition"""
# DJANGO FILES
from rest_framework import viewsets, permissions
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework import status

# LOCAL FILES
from ..models import CustomUser, Notification
from ..serializers import NotificationSerializer


class NotificationViewSet(viewsets.ModelViewSet):

    """
    API endpoint that allows notification attachments to be viewed or edited.
    """

    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer

    @action(
        detail=False,
        methods=["get"],
        permission_classes=[permissions.IsAuthenticated],
        url_name="notification_by_user",
        url_path="notification_by_user",
    )
    def get_notifications(self, request):
        """
        ENDPOINT TO LOAD ALL NOTIFICATIONS OF AUTHENTICATED USER WHICH ARE NOT SEEN YET
        """
        user = self.request.user
        user = CustomUser.objects.get(id=user.id)
        notifications = Notification.objects.filter(to_user=user, is_seen="0")
        serializer = NotificationSerializer(notifications, many=True)
        return Response(serializer.data)

    @action(
        detail=False,
        methods=["put"],
        permission_classes=[permissions.IsAuthenticated],
        url_name="see_notif",
        url_path="see_notif",
    )
    def see_notif(self, request):
        """
        ENDPOINT TO SEE NOTIFICATION
        """
        data = self.request.data
        _id = data["id"]
        Notification.objects.filter(id=_id).update(is_seen="1")

        return Response({"seen": "seen"}, status=status.HTTP_200_OK)
