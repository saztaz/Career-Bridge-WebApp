from django.urls import path, include
from company.views import CompanyRegistrationView, JobPostAPI, ProfileAPI, applicantsAPI

urlpatterns = [
    path(
        "registration/",
        CompanyRegistrationView.as_view(),
        name="company_registration",
    ),
    path("profile/", ProfileAPI.as_view(), name="company_profile"),
    path("job-post/", JobPostAPI.as_view(), name="job_post"),
    path("job-post/<int:post_id>", JobPostAPI.as_view(), name="job_post"),
    path("applicants/", applicantsAPI.as_view(), name="application"),
    path(
        "applicants/<int:applicant_id>/<str:status>",
        applicantsAPI.as_view(),
        name="application",
    ),
]
