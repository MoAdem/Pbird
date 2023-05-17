"""Document module definition"""
# DJANGO FILES
from django.db import models
from ckeditor.fields import RichTextField

# LOCAL FILES
from .user_model import CustomUser
from .folder_model import Folder


class Document(models.Model):
    """Document class definition"""

    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=255, null=False, blank=False)
    file = models.FileField(
        upload_to="documents", max_length=100, null=False, blank=False
    )
    size = models.BigIntegerField(blank=True, null=True)
    type = models.CharField(max_length=10, blank=True, null=True)
    qr_code = models.ImageField(upload_to="qr_codes/documents", blank=True)
    key_code = models.CharField(max_length=100, null=False)
    users = models.ManyToManyField(CustomUser, blank=True, through="DocumentsUsers")

    def __unicode__(self):
        return self.title

    def __str__(self):
        return str(self.title)


class Template(models.Model):
    """Template class definition"""

    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    header = RichTextField(blank=True, null=False)
    body = RichTextField(blank=True, null=False)
    footer = RichTextField(blank=True, null=False)
    created = models.DateTimeField(auto_now_add=True)

    def set_title(self, user: CustomUser):
        """set a default document's title"""
        self.title = user._get_full_name() + "_" + str(self.id)

    def set_title_template(self, user: CustomUser):
        """set a default template's title"""
        self.title = "template_" + user._get_full_name() + "_" + str(self.id)

    def __str__(self):
        return str(self.id)


class DocumentType:
    """Document Type class definition, to identify the type of documents"""

    UPLOADED = "UPLOADED"
    SHARED = "SHARED"
    RECEIVED = "RECEIVED"
    TEMPLATE = "TEMPLATE"
    TYPE = [
        (UPLOADED, "UPLOAD"),
        (SHARED, "SHARED"),
        (RECEIVED, "RECEIVED"),
        (TEMPLATE, "TEMPLATE"),
    ]


class DocumentsUsers(models.Model):
    """Documents Users class definition, class many to many between User and Document"""

    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(CustomUser, on_delete=models.SET_NULL, null=True)
    document = models.ForeignKey(Document, on_delete=models.SET_NULL, null=True)
    folder = models.ForeignKey(Folder, on_delete=models.SET_NULL, null=True)
    created = models.DateTimeField(auto_now_add=True)
    type = models.CharField(
        max_length=20, choices=DocumentType.TYPE, blank=True, null=True
    )
    is_shortcut = models.BooleanField(default=True)

    class Meta:
        """Meta class definition"""

        unique_together = [["user", "document"]]

    def __str__(self):
        return str(self.id)
