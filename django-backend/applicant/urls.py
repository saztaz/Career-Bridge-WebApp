from django.urls import path, include
from applicant.views import (
    ApplicantRegistrationView,
)

urlpatterns = [
    path(
        "registration/",
        ApplicantRegistrationView.as_view(),
        name="applicant_registration",
    ),
]
