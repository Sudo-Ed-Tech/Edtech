from dataclasses import fields
from pyexpat import model
from urllib import request
from rest_framework import serializers
from . import models


class TeacherSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Teacher
        fields = ['id', 'full_name', 'details', 'email', 'password','qualification', 'mobile_no', 'skills', 'teacher_courses', 'skill_list']
        # depth = 1
    def __init__(self, *args, **kwargs):
        super(TeacherSerializer, self).__init__(*args, **kwargs)
        request=self.context.get('request')
        self.Meta.depth = 0
        if request and request.method == 'GET':
            self.Meta.depth =1  

class TeacherDashboardSerializer(serializers.ModelSerializer):
    class Meta:
        model=models.Teacher
        fields=['total_teacher_courses','total_teacher_chapters','total_teacher_students']

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.CourseCategory
        fields = ['id', 'title', 'description']


class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Course
        fields = ['id', 'category', 'teacher', 'title', 'description', 'featured_img','technologies', 'course_chapter', 'related_videos', 'tech_list','enrolled_courses','total_enrolled_students','course_rating']
        # depth = 1
    def __init__(self, *args, **kwargs):
        super(CourseSerializer, self).__init__(*args, **kwargs)
        request=self.context.get('request')
        self.Meta.depth = 0
        if request and request.method == 'GET':
            self.Meta.depth =1  

class ChapterSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Chapter
        fields = ['id', 'course', 'title', 'description', 'video','note_file', 'remarks']
        # depth=1
    def __init__(self, *args, **kwargs):
        super(ChapterSerializer, self).__init__(*args, **kwargs)
        request=self.context.get('request')
        self.Meta.depth = 0
        if request and request.method == 'GET':
            self.Meta.depth =1  

class StudnetSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Student
        fields = ['id', 'full_name', 'username', 'email','password', 'qualification', 'interests','enrolled_student']
        # depth =1

    def __init__(self, *args, **kwargs):
        super(StudnetSerializer, self).__init__(*args, **kwargs)
        request=self.context.get('request')
        self.Meta.depth = 0
        if request and request.method == 'GET':
            self.Meta.depth =1  

class StudentCourseEnrollSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.StudentCourseEnrollment
        fields = ['id', 'course', 'student','enrolled_time']
        # depth=1

    def __init__(self, *args, **kwargs):
        super(StudentCourseEnrollSerializer, self).__init__(*args, **kwargs)
        request=self.context.get('request')
        self.Meta.depth = 0
        if request and request.method == 'GET':
            self.Meta.depth =1   

class CourseRatingSerializer(serializers.ModelSerializer):
    class Meta:
        model=models.CourseRating
        fields=['id', 'course','student','rating','reviews','review_time']

    def __init__(self, *args, **kwargs):
        super(CourseRatingSerializer, self).__init__(*args, **kwargs)
        request=self.context.get('request')
        self.Meta.depth = 0
        if request and request.method == 'GET':
            self.Meta.depth = 1

class TrainingDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model=models.TrainingDetails
        fields= ['id', 'course','teacher','date','f_time','t_time','meeting_link']
    
    def __init__(self, *args, **kwargs):
        super(TrainingDetailsSerializer, self).__init__(*args, **kwargs)
        request=self.context.get('request')
        self.Meta.depth = 0
        if request and request.method == 'GET':
            self.Meta.depth = 1