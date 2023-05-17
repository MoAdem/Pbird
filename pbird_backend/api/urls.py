"""Django urls definition"""
# DJANGO FILES
from django.urls import path, include
from rest_framework import routers
from knox import views as knox_views

# LOCAL FILES
from .controllers import (
    TrashViewSet,
    NotificationViewSet,
    FolderViewSet,
    DocumentViewSet,
    TemplateViewSet,
    UserViewSet,
    UploadPhotoController,
    UploadCompanySignatureController,
    RegisterController,
    UpdateProfileController,
    ResetPasswordController,
    LoginController,
    UserAuthenticated,
)


router_folder = routers.DefaultRouter()
router_user = routers.DefaultRouter()
router_notification = routers.DefaultRouter()
router_trash = routers.DefaultRouter()

router_document = routers.DefaultRouter()
router_template = routers.DefaultRouter()

router_folder.register("folder", viewset=FolderViewSet)
router_user.register("user", viewset=UserViewSet)
router_notification.register("notification", viewset=NotificationViewSet)
router_trash.register("trash", viewset=TrashViewSet)

router_document.register("document", viewset=DocumentViewSet)
router_template.register("template", viewset=TemplateViewSet)


urlpatterns = [
    path("", include(router_folder.urls)),
    path("", include(router_document.urls)),
    path("", include(router_user.urls)),
    path("", include(router_notification.urls)),
    path("", include(router_template.urls)),
    path("", include(router_trash.urls)),
    path("users/auth", include("knox.urls")),
    path("users/auth/register", RegisterController.as_view()),
    path("users/auth/login", LoginController.as_view()),
    path("users/auth/user", UserAuthenticated.as_view()),
    path("users/auth/reset_password", ResetPasswordController.as_view()),
    path("users/auth/logout", knox_views.LogoutView.as_view(), name="knox_logout"),
    path("users/auth/update_profile", UpdateProfileController.as_view()),
    path("users/auth/upload/photo", UploadPhotoController.as_view()),
    path("users/auth/upload/signature", UploadCompanySignatureController.as_view()),
]
