from rest_framework import serializers
from . import models


class AboutUsSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.AboutUs
        fields = ['id', 'full_name', 'designation', 'details',
                  'profile_img', 'social_linkedin', 'social_github','social_twitter']
