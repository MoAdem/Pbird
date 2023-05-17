"""Document Filter module definition"""
# DJANGO FILES
from django.db.models import Q
from django_filters.rest_framework import FilterSet, CharFilter, DateTimeFilter

# LOCAL FILES
from ..models import DocumentsUsers


class DocumentFilter(FilterSet):
    """Document Filter Class"""

    name = CharFilter(field_name="document__title", lookup_expr="icontains")
    status = CharFilter(field_name="type", lookup_expr="icontains")
    created_at = DateTimeFilter(field_name="created", lookup_expr="icontains")
    created_gt = DateTimeFilter(field_name="created", lookup_expr="gte")
    created_lt = DateTimeFilter(field_name="created", lookup_expr="lte")
    source = CharFilter(method="get_source", lookup_expr="icontains")

    class Meta:
        """Meta Class"""

        model = DocumentsUsers
        fields = ["document", "type", "created"]

    def get_source(self, queryset, name, value):
        """method filter document by user full name"""
        return queryset.filter(
            Q(document__users__first_name__icontains=value)
            | Q(document__users__last_name__icontains=value)
        )
