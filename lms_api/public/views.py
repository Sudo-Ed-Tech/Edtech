from django.shortcuts import render
from . import models
from .serializers import (AboutUsSerializer)
from rest_framework import generics



#About Us View
class AboutUsList(generics.ListAPIView):
    queryset=models.AboutUs.objects.all()
    serializer_class=AboutUsSerializer


