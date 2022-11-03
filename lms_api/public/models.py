from django.db import models
from django.core import serializers



#About Us
class AboutUs(models.Model):
    full_name = models.CharField(max_length=100)
    designation = models.CharField(max_length=100)
    details = models.TextField(null=True, blank=True)
    profile_img = models.ImageField(null=True, blank=True)
    social_linkedin = models.URLField(max_length=200,blank=True, null=True)
    social_github = models.URLField(max_length=200, blank=True,  null=True)
    social_twitter = models.URLField(max_length=200,blank=True,  null=True)
    
    class Meta:
        verbose_name_plural = '0 About us'
    
    def __str__(self):
        return self.full_name