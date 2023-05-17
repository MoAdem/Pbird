"""Template service definition"""
# DJANGO FILES
import os
from django.conf import settings
import pdfkit as pdf

# LOCAL FILES
from ..models import Document


class TemplateService:
    """Template service class definition"""

    # by using configuration you can add path value.
    # wkhtml_path = configuration(
    #     wkhtmltopdf=r'venv_system/wkhtmltox/bin/wkhtmltopdf.exe')
    # Template varibales
    header = ""
    footer = ""
    body = ""
    path = ""

    header_style = """<div style="position: absolute; top: 3%; left: 3%; right: 3%;">"""
    body_style = """<div style="position: absolute; top: 20%; left: 3%; right: 3%;">"""
    footer_style = (
        """<div style="position: absolute; bottom:3%; left: 3%; right: 3%;">"""
    )
    div = "</div>"

    def __init__(self, header, footer, body):
        self.header = header
        self.footer = footer
        self.body = body

    def generatePath(self, _id):
        """generate document path"""
        return str("documents/" + str(_id) + ".pdf")

    def generate_header(self):
        """generate header"""
        return self.header_style + self.header + self.div

    def generate_body(self):
        """generate body"""
        return self.body_style + self.body + self.div

    def generate_footer(self):
        """generate footer"""
        return self.footer_style + self.footer + self.div

    def generate_document(self, document_id):
        """generate document"""
        TemplateService.create_folder_document(self)
        self.path = self.generatePath(document_id)
        document = (
            self.generate_header() + self.generate_body() + self.generate_footer()
        )
        pdf.from_string(document, "media/" + self.path)

    def generate_document_with_signature(self, document_id, url):
        """generate document with signature"""
        TemplateService.create_folder_document(self)
        self.path = self.generatePath(document_id)
        document = (
            self.generate_header()
            + self.generate_body()
            + self.generate_signature(url)
            + self.generate_footer()
        )
        pdf.from_string(document, "media/" + self.path)

    def generate_signature(self, url):
        """generate signature"""
        return (
            """
            <div style="position: absolute;bottom: 10%; left: 65%; right: 15%;">
                <p><img src="""
            + url
            + """ style="height:200px;" /></p>
            </div>
            """
        )

    def create_document(self, title):
        """create document"""
        document = Document(type=".pdf", title=title)
        document.save()
        return document

    def create_folder_document(self):
        """create a folder documents in media if not exist"""
        if not os.path.exists(settings.MEDIA_ROOT + "/documents"):
            os.mkdir(os.path.join(settings.MEDIA_ROOT, "documents"))
