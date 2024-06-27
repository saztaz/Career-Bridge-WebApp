from applicant.serilaizers import CustomRegistrationSerializer
from dj_rest_auth.registration.views import RegisterView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated


# Agent Registration
class ApplicantRegistrationView(RegisterView):
    serializer_class = CustomRegistrationSerializer


class ApplicationAPI(APIView):
    serializer_class = ...
    permission_classes = [IsAuthenticated]

    def post(self, request, format=None, *args, **kwargs): ...
