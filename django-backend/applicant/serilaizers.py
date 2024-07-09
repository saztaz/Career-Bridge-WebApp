from dj_rest_auth.registration.serializers import RegisterSerializer
from rest_framework import serializers
from allauth.account.models import EmailAddress
from applicant.models import Applicant, Application


class CustomRegistrationSerializer(RegisterSerializer):
    applicant = serializers.PrimaryKeyRelatedField(
        read_only=True,
    )  # by default allow_null = False
    name = serializers.CharField(required=True)
    profile_img = serializers.URLField(required=True)
    university_name = serializers.CharField(required=True)
    major = serializers.CharField(required=True)
    description = serializers.CharField(required=True)

    def get_cleaned_data(self):
        data = super(CustomRegistrationSerializer, self).get_cleaned_data()
        extra_data = {
            "name": self.validated_data.get("name", ""),
            "profile_img": self.validated_data.get("profile_img", ""),
            "university_name": self.validated_data.get("university_name", ""),
            "major": self.validated_data.get("major", ""),
            "description": self.validated_data.get("description", ""),
        }
        data.update(extra_data)
        return data

    def save(self, request):
        user = super(CustomRegistrationSerializer, self).save(request)
        user.save()
        instance = Applicant(
            applicant=user,
            name=self.cleaned_data.get("name"),
            profile_img=self.cleaned_data.get("profile_img"),
            university_name=self.cleaned_data.get("university_name"),
            major=self.cleaned_data.get("major"),
            description=self.cleaned_data.get("description"),
        )
        instance.save()

        # Mark the email as verified
        # email_address = EmailAddress.objects.get(user=user, email=user.email)
        # email_address.verified = True
        # email_address.save()

        return user


class ApplicantSerializer(serializers.ModelSerializer):
    applicant = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        fields = "__all__"
        model = Applicant


class ApplicationSerializer(serializers.ModelSerializer):
    status = serializers.CharField(required=False, allow_blank=True)
    applicant = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        fields = "__all__"
        model = Application


class GetApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        fields = "__all__"
        model = Application
        depth = 2
