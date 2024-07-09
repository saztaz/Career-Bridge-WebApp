from django.conf import settings
from django.db import models


class Company(models.Model):
    name = models.CharField(max_length=100)
    image = models.URLField()
    address = models.CharField(max_length=100)
    description = models.TextField()
    company = models.OneToOneField(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="company"
    )


class JobPost(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    posted_on = models.DateTimeField(auto_now_add=True)
    company = models.ForeignKey(
        Company, on_delete=models.CASCADE, related_name="company_job_post"
    )
    job_type = models.CharField(max_length=100)
    job_duration = models.CharField(max_length=100)
