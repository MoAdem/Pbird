"""Document service definition"""
# DJANGO FILES
import string
import os
import random
from io import BytesIO
from django.conf import settings
from django.core.files.base import ContentFile
import qrcode

# LOCAL FILES
from ..models import DocumentsUsers, Error, DocumentType
from .interfaces.document_interface import DocumentInterface
from ..serializers import DocumentUsersSerializer


class DocumentService(DocumentInterface):
    """Document service class definition"""

    def generateQrCodeDocument(self, document):
        """generate Qr Code Document"""
        document.key_code = DocumentService.generateKeyCode()
        original_file = qrcode.make(
            {"document_id": document.id, "key_code": document.key_code}
        )
        document.qr_code = DocumentService.genererQrCode(
            self, original_file, document.id
        )

    def genererQrCode(self, original_file, _id):
        """generer Qr Code"""
        img_io = BytesIO()
        cropped_img = original_file.crop((0, 0, 490, 490))
        cropped_img.save(img_io, format="JPEG", quality=100)
        qr_code = ContentFile(img_io.getvalue(), str(_id) + ".jpg")
        return qr_code

    def generateKeyCode():
        """generate Key Code"""
        letters = string.ascii_lowercase
        return "".join(random.choice(letters) for i in range(50))

    def deleteFile(self, path):
        """delete physical file"""
        if os.path.exists(settings.MEDIA_ROOT + "/" + path) and path != "":
            os.remove(os.path.join(settings.MEDIA_ROOT, path))

    def verify_documents(self, data, user_sender):
        """verify existing documents"""
        if "documents" in data:
            documents = []
            for document in data["documents"]:
                document = DocumentUsersSerializer.verifyExistingFile(
                    self, document["id"], user_sender.id
                )
                if document:
                    documents.append(document)
            return documents
        raise Error.required("documents")

    def send_documents(self, users, documents):
        """share documents"""
        documents_send = 0
        for user in users:
            for document in documents:
                if not DocumentUsersSerializer.verify_send_document(
                    self, user, document
                ):
                    document = DocumentsUsers(
                        user=user,
                        document=document.document,
                        is_shortcut=True,
                        type=DocumentType.SHARED,
                    )
                    document.save()
                    documents_send += 1
        return documents_send
