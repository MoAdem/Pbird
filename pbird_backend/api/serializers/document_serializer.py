"""Document Serializer module definition"""
# DJANGO FILES
from rest_framework.serializers import ModelSerializer

# LOCAL FILES
from ..models import Document, Template, DocumentsUsers, Error
from .user_serializer import UserNoDetailSerializer, FieldSerializer
from .folder_serializer import FolderSerializer


class DocumentSerializer(ModelSerializer):
    """DOCUMENT SERIALIZER"""

    class Meta:
        """Meta class definition"""

        model = Document
        fields = ("id", "title", "file", "size", "type", "qr_code")
        depth = 1

    def validate_files(self, files):
        """validate list of files"""
        if len(files) <= 0:
            raise Error.empty("file")
        return files

    def verify_existing_document(self, _id):
        """verify Existing document"""
        document = Document.objects.filter(id=_id).first()
        if not document:
            raise Error.not_exists("document")
        return document

    def validate_documents(self, data):
        """validate documents in data"""
        if "documents" not in data:
            raise Error.required("files")
        return data

    def validate_qr_code(self, data):
        """validate qr code"""
        if "qr_code" not in data:
            raise Error.required("qr_code")
        qr_code = data["qr_code"]
        fields = ["document_id", "key_code"]
        for field in fields:
            FieldSerializer.validate_field(self, field, qr_code)
        return qr_code

    def validate_key_code(self, document, key_code):
        """validate key_code"""
        if key_code != document.key_code:
            raise Error.invalid("key code")
        return document

    def _validate_title(self, data):
        """validate title"""
        FieldSerializer.validate_field(self, "title", data)
        return data["title"]


class DocumentDetailSerializer(ModelSerializer):
    """DOCUMENT DETAIL SERIALIZER"""

    users = UserNoDetailSerializer(many=True)

    class Meta:
        """Meta class definition"""

        model = Document
        fields = ("id", "title", "file", "size", "type", "qr_code", "users")
        depth = 1


class TemplateSerializer(ModelSerializer):
    """TEMPLATE SERIALIZER"""

    class Meta:
        """Meta class definition"""

        model = Template
        fields = ("id", "user_id", "header", "body", "footer")
        depth = 1

    def _validate_template_id(self, data):
        """validate template_id"""
        FieldSerializer.validate_field(self, "template_id", data)
        return data["template_id"]

    def _validate_id(self, data):
        """validate id"""
        FieldSerializer.validate_field(self, "id", data)
        return data["id"]

    def validate(self, data):
        """validate template"""
        fields = ["header", "body", "footer"]
        for field in fields:
            FieldSerializer.validate_field(self, field, data)
        return data

    def add_template(self, user):
        """template save function"""
        data = self.data
        template = Template(
            user=user, header=data["header"], body=data["body"], footer=data["footer"]
        )
        template.save()
        return TemplateSerializer(template, many=False)

    def get_template_by_user(self, template_id, user_id):
        """get template by user"""
        template = Template.objects.filter(user=user_id, id=template_id).first()
        if template:
            return template
        raise Error.not_exists("template")


class TemplateDetailsSerializer(TemplateSerializer):
    """TEMPLATE  DETAILS SERIALIZER"""

    user = UserNoDetailSerializer(many=False)

    class Meta:
        """Meta class definition"""

        model = Template
        fields = "__all__"
        depth = 1


class DocumentUsersSerializer(ModelSerializer):
    """DOCUMENT USER SERIALIZER"""

    document = DocumentSerializer(many=False)
    folder = FolderSerializer(many=False)

    class Meta:
        """Meta class definition"""

        model = DocumentsUsers
        fields = (
            "id",
            "user_id",
            "type",
            "created",
            "is_shortcut",
            "folder",
            "document",
        )
        depth = 1

    def _verify_permission(self, document_id, user_id):
        """verify permission"""
        document = DocumentsUsers.objects.filter(id=document_id, user=user_id).first()
        if not document:
            raise Error.not_exists("document")
        return document

    def verify_send_document(self, user, document):
        """verify send document"""
        if DocumentsUsers.objects.filter(
            user=user.id, document=document.document.id
        ).exists():
            return True
        return False

    def verifyExistingFile(self, document_id, user_id):
        """verify existing file without error"""
        return DocumentsUsers.objects.filter(document=document_id, user=user_id).first()

    def verify_existing_file(self, document_id, user_id):
        """verify existing file error"""
        file = DocumentUsersSerializer.verifyExistingFile(self, document_id, user_id)
        if file:
            raise Error.exists("document")


class DocumentUsersDetailsSerializer(ModelSerializer):
    """DOCUMENT USER DETAILS SERIALIZER"""

    user = UserNoDetailSerializer(many=False)
    document = DocumentDetailSerializer(many=False)
    folder = FolderSerializer(many=False)

    class Meta:
        """Meta class definition"""

        model = DocumentsUsers
        fields = ("id", "user", "folder", "created", "type", "is_shortcut", "document")
        depth = 1
