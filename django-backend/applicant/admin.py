from django.contrib import admin
from .models import Applicant, Application


@admin.register(Application)
class ApplicationAdmin(admin.ModelAdmin):
    list_display = ("id", "description", "cv", "status", "applicant", "job_post")
    list_filter = ("status", "applicant", "job_post")
    search_fields = ("description", "applicant__name", "job_post__title")
    ordering = ("status",)


@admin.register(Applicant)
class ApplicantAdmin(admin.ModelAdmin):
    list_display = ("name", "university_name", "major", "applicant")
    search_fields = ("name", "university_name", "major", "applicant__username")
    list_filter = ("university_name", "major")
    ordering = ("name",)

    fieldsets = (
        (
            None,
            {
                "fields": (
                    "name",
                    "profile_img",
                    "university_name",
                    "major",
                    "description",
                    "applicant",
                )
            },
        ),
    )

    def get_readonly_fields(self, request, obj=None):
        if obj:  # editing an existing object
            return ["applicant"]
        return []
