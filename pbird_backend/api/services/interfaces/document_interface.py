"""Document interface"""


class DocumentInterface:
    """Document interface definition"""

    def __init__(self, model):
        self.model = model
        self.manager = self.model.objects
