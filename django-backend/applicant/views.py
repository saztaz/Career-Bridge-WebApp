from applicant.serilaizers import (
    CustomRegistrationSerializer,
    ApplicantSerializer,
    ApplicationSerializer,
    GetApplicationSerializer,
)
from applicant.models import Applicant, Application
from dj_rest_auth.registration.views import RegisterView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.db.models import Q


from company.models import JobPost
from company.serializers import JobPostSerializer


# Agent Registration
class ApplicantRegistrationView(RegisterView):
    serializer_class = CustomRegistrationSerializer


class ApplicationAPI(APIView):
    serializer_class = GetApplicationSerializer
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None, *args, **kwargs):
        instance = Application.objects.filter(
            applicant=request.user.applicant, status="pending"
        )
        serialized_data = self.serializer_class(instance, many=True)
        return Response(serialized_data.data)

    def delete(self, request, applicant_id=None, format=None, *args, **kwargs):
        Application.objects.get(id=applicant_id).delete()
        return Response({"status": "Successfully deleted"})


class ProfileAPI(APIView):
    serializer_class = ApplicantSerializer
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None, *args, **kwargs):
        instance = Applicant.objects.get(applicant=request.user)
        return Response(self.serializer_class(instance).data)

    def put(self, request, format=None, *args, **kwargs):
        serialized_data = self.serializer_class(data=request.data)

        if serialized_data.is_valid(raise_exception=True):
            Applicant.objects.filter(applicant=request.user).update(
                **serialized_data.data
            )

        return Response({"status": "successful"})


class AllJobPostAPI(APIView):
    serializer_class = JobPostSerializer
    permission_classes = [IsAuthenticated]

    # list of all jobs except accepted ones
    def get(self, request, format=None, *args, **kwargs):
        instance = JobPost.objects.exclude(
            Q(job_post_application__applicant=request.user.applicant)
        ).order_by("-id")
        serialized_data = self.serializer_class(instance, many=True)
        return Response(serialized_data.data)

    # apply for job
    def post(self, request, format=None, *args, **kwargs):
        serialized_data = ApplicationSerializer(data=request.data)

        if serialized_data.is_valid(raise_exception=True):
            serialized_data = serialized_data.data.copy()
            print(serialized_data)
            Application.objects.create(
                job_post_id=serialized_data.pop("job_post"),
                **serialized_data,
                applicant=request.user.applicant,
            )
            return Response({"status": "Successful"})
