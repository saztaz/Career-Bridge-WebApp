from dj_rest_auth.registration.views import RegisterView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import redirect
from allauth.account.views import ConfirmEmailView
from allauth.account.models import EmailConfirmationHMAC, EmailConfirmation
from django.http import HttpResponse


from company.serializers import (
    CustomRegistrationSerializer,
    JobPostSerializer,
    CompanySerializer,
    ApplicationSerializer,
)
from company.models import JobPost, Company
from applicant.models import Application
from django.core.mail import send_mail


# Agent Registration
class CompanyRegistrationView(RegisterView):
    serializer_class = CustomRegistrationSerializer


class CustomConfirmEmailView(ConfirmEmailView):

    def get(self, *args, **kwargs):
        key = kwargs["key"]
        try:
            confirmation = EmailConfirmationHMAC.from_key(key)
        except EmailConfirmation.DoesNotExist:
            try:
                confirmation = EmailConfirmation.objects.get(key=key.lower())
            except EmailConfirmation.DoesNotExist:
                confirmation = None

        if confirmation:
            confirmation.confirm(self.request)
            return redirect("https://career-bridge.netlify.app/confirmation-success")
        else:
            return HttpResponse("Invalid or expired token", status=400)


class ProfileAPI(APIView):
    serializer_class = CompanySerializer
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None, *args, **kwargs):
        instance = Company.objects.get(company=request.user)
        return Response(self.serializer_class(instance).data)

    def put(self, request, format=None, *args, **kwargs):
        serialized_data = self.serializer_class(data=request.data)

        if serialized_data.is_valid(raise_exception=True):
            Company.objects.filter(company=request.user).update(**serialized_data.data)

        return Response({"status": "successful"})


class JobPostAPI(APIView):
    serializer_class = JobPostSerializer
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None, *args, **kwargs):
        instance = JobPost.objects.filter(company=request.user.company)
        serialized_data = self.serializer_class(instance, many=True)
        return Response(serialized_data.data)

    def post(self, request, format=None, *args, **kwargs):
        serialized_data = self.serializer_class(data=request.data)

        if serialized_data.is_valid(raise_exception=True):
            JobPost.objects.create(
                **serialized_data.data,
                company=request.user.company,
            )

        return Response({"status": "successfully created"})

    def put(self, request, post_id=None, format=None, *args, **kwargs):
        serialized_data = self.serializer_class(data=request.data)

        if serialized_data.is_valid(raise_exception=True):
            JobPost.objects.filter(id=post_id).update(**serialized_data.data)
        return Response({"status": "successfully updated"})

    def delete(self, request, post_id=None, format=None, *args, **kwargs):
        JobPost.objects.get(id=post_id).delete()
        return Response({"status": "successfully deleted"})


class applicantsAPI(APIView):
    serializer_class = ApplicationSerializer
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None, *args, **kwargs):
        instance = Application.objects.filter(
            job_post__company=request.user.company, status="pending"
        )
        serialized_data = self.serializer_class(instance, many=True)
        return Response(serialized_data.data)

    def post(
        self, request, applicant_id=None, status=None, format=None, *args, **kwargs
    ):
        application = Application.objects.get(id=applicant_id)
        application.status = status
        application.save()
        send_mail(
            "Your Application Update",
            f"Greetings, your application for '{application.job_post.title}' post has been {status}.",
            "noreply.service.tanimsk@gmail.com",
            [application.applicant.applicant.email],
            fail_silently=False,
        )
        return Response({"status": "Successful"})
