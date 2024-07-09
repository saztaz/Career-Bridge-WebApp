from django.contrib import admin
from .models import Company

@admin.register(Company)
class CompanyAdmin(admin.ModelAdmin):
    list_display = ('name', 'address', 'company')
    search_fields = ('name', 'address', 'company__username')
    list_filter = ('address',)
    ordering = ('name',)

    fieldsets = (
        (None, {
            'fields': ('name', 'image', 'address', 'description', 'company')
        }),
    )

    def get_readonly_fields(self, request, obj=None):
        if obj:  # editing an existing object
            return ['company']
        return []

