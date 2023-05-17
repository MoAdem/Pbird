"""Error module definition"""
# DJANGO FILES
from rest_framework.serializers import ValidationError
from rest_framework.response import Response
from rest_framework import status


class Error:
    """Error class definition"""

    REQUIRED = "required fields"
    EMPTY = "empty fields"
    NOT_VALID = "not valid"
    INVALID = "invalid"
    EXISTS = "already exists"
    NOT_EXISITS = "does not exists"
    NOT_MATCH = "does not match"
    NOT_WORK = "is not working"
    NOT_DEFINE = "not defined"
    READ_ONLY = "read only"
    HAVE = "you already have"
    NOT_SELECTED = "not selected"

    def required(name):
        """Required message Error"""
        return ValidationError({"error": Error.REQUIRED + " " + name})

    def empty(name):
        """empty message Error"""
        return ValidationError({"error": Error.EMPTY + " " + name})

    def not_valid(name):
        """not_valid message Error"""
        return ValidationError({"error": name + " " + Error.NOT_VALID})

    def invalid(name):
        """invalid message Error"""
        return ValidationError({"error": Error.INVALID + " " + name})

    def exists(name):
        """exists message Error"""
        return ValidationError({"error": name + " " + Error.EXISTS})

    def not_exists(name):
        """not_exists message Error"""
        return ValidationError({"error": name + " " + Error.NOT_EXISITS})

    def not_match(name):
        """not_match message Error"""
        return ValidationError({"error": name + " " + Error.NOT_MATCH})

    def not_work(name):
        """not_work message Error"""
        return ValidationError({"error": name + " " + Error.NOT_WORK})

    def err_length_least(name, size):
        """length_least message Error"""
        return ValidationError(
            {"error": name + " mast containt at least " + str(size) + " caracters"}
        )

    def password_is_false():
        """password is false message Error"""
        return ValidationError({"Authorization": "PASSWORD IS FALSE"})

    def not_define(name):
        """not_define message Error"""
        return ValidationError({"error": name + " " + Error.NOT_DEFINE})

    def not_company():
        """not_company message Error"""
        return ValidationError({"error": "you must be a company to upload signature"})

    def send_to_your_self(name):
        """send_to_your_self message Error"""
        return ValidationError({"error": "you can't send the " + name + " to yourself"})

    def read_only(name):
        """read_only message Error"""
        return ValidationError({"permission": Error.READ_ONLY + " " + name})

    def already_shared(name):
        """already_shared message Error"""
        return ValidationError({"error": "document is already shared to " + str(name)})

    def already_shared_folder(name):
        """already shared folder message Error"""
        return ValidationError({"error": "folder is already shared to " + str(name)})

    def is_shortcut():
        """is_shortcut message Error"""
        return ValidationError({"permission": "this file is shortcut"})

    def is_shortcut_or_read_only(name):
        """is shortcut or read only message Error"""
        return ValidationError(
            {"permission": "(" + str(name) + ") is shortcut or read only"}
        )

    def have(name):
        """have message Error"""
        return ValidationError({"error": Error.HAVE + " " + name})


class Message:
    """Message class definition"""

    VALIDATED = "already validated"
    IS_SEND = "is send"

    def validated(name):
        """validated message"""
        return Response({"validation": name + " " + Message.VALIDATED})

    def send(message, name):
        """send message"""
        return Response(
            {message: name + " " + Message.IS_SEND}, status=status.HTTP_200_OK
        )
