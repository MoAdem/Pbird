"""User interface"""


class UserInterface:
    """Document interface definition"""

    def __init__(self, model):
        self.model = model
        self.manager = self.model.objects
