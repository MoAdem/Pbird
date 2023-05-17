"""Django Admin site"""
# DJANGO FILES
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.utils.translation import ugettext_lazy as _
from django.contrib.auth import get_user_model

# LOCAL FILES
from .models import (
    Company,
    Document,
    Folder,
    FoldersUsers,
    DocumentsUsers,
    Address,
    Notification,
    Template,
    Trash,
)


class CustomUserAdmin(UserAdmin):
    """Define admin model for custom User model with no username field."""

    fieldsets = (
        (None, {"fields": ("phone_number", "password", "role")}),
        (_("Personal info"), {"fields": ("first_name", "last_name", "email")}),
        (
            _("Permissions"),
            {
                "fields": (
                    "is_active",
                    "is_staff",
                    "is_superuser",
                    "groups",
                    "user_permissions",
                    "is_validated",
                )
            },
        ),
        (_("Important dates"), {"fields": ("last_login", "date_joined")}),
    )
    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": ("phone_number", "password1", "password2"),
            },
        ),
    )
    list_display = ("id", "phone_number", "first_name", "last_name", "is_staff", "role")
    search_fields = ("phone_number", "first_name", "last_name")
    ordering = ("phone_number",)


admin.site.register(get_user_model(), CustomUserAdmin)
admin.site.register(Company)
admin.site.register(Address)
admin.site.register(Document)
admin.site.register(Template)
admin.site.register(DocumentsUsers)
admin.site.register(Folder)
admin.site.register(FoldersUsers)
admin.site.register(Notification)
admin.site.register(Trash)
