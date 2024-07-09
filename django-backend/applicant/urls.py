from django.urls import path, include
from applicant.views import (
    ApplicantRegistrationView,
    ProfileAPI,
    AllJobPostAPI,
    ApplicationAPI,
)

urlpatterns = [
    path(
        "registration/",
        ApplicantRegistrationView.as_view(),
        name="applicant_registration",
    ),
    path("profile/", ProfileAPI.as_view(), name="applicant_profile"),
    path("all-jobs/", AllJobPostAPI.as_view(), name="all_job_post"),
    path("applied-jobs/", ApplicationAPI.as_view(), name="application"),
    path("applied-jobs/<int:applicant_id>", ApplicationAPI.as_view(), name="application"),
]
