from django.conf import settings
from django.db import models


class Applicant(models.Model):
    name = models.CharField(max_length=100)
    profile_img = models.URLField()
    university_name = models.CharField(max_length=100)
    major = models.CharField(max_length=100)
    description = models.TextField()
    applicant = models.OneToOneField(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="applicant"
    )


class Application(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    cv = models.URLField()
    STATUS = (
        ("pending", "pending"),
        ("accepted", "accepted"),
        ("rejected", "rejected"),
    )
    status = models.CharField(choices=STATUS, default="pending")
    applicant = models.ForeignKey(
        Applicant, on_delete=models.CASCADE, related_name="applicant_application"
    )
    job_post = models.ForeignKey(
        "company.JobPost",
        on_delete=models.CASCADE,
        related_name="job_post_application",
    )
