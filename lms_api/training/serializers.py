from dataclasses import fields
from statistics import mode
from rest_framework import serializers
from . import models


class CourseCreatorSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.CourseCreator
        fields = ['id', 'full_name', 'details', 'email',
                  'password', 'qualification', 'mobile_no','creator_courses']
        # depth = 1

    def __init__(self, *args, **kwargs):
        super(CourseCreatorSerializer, self).__init__(*args, **kwargs)
        request = self.context.get('request')
        self.Meta.depth = 0
        if request and request.method == 'GET':
            self.Meta.depth = 1


class TrainingCourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.TrainingCourse
        fields = ['id', 'creator', 'title',
                  'description', 'featured_img', 'technologies','training_tech_list','enrolled_training','training_enrolled_student','course_rating']
        # depth = 1

    def __init__(self, *args, **kwargs):
        super(TrainingCourseSerializer, self).__init__(*args, **kwargs)
        request = self.context.get('request')
        self.Meta.depth = 0
        if request and request.method == 'GET':
            self.Meta.depth = 2

#Studnet Enrollment Serializer
class StudentTrainingEnrollmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.StudentTrainingEnrollment
        fields = ['id', 'training_course', 'student', 'enrolled_time']

    def __init__(self, *args, **kwargs):
        super(StudentTrainingEnrollmentSerializer,
              self).__init__(*args, **kwargs)
        request = self.context.get('request')
        self.Meta.depth = 0
        if request and request.method == 'GET':
            self.Meta.depth = 2


#Training Course Rating Serializer
class TrainingCourseRatingSerializer(serializers.ModelSerializer):
    class Meta:
        model=models.TrainingCourseRating
        fields=['id','training_course','student','rating','reviews','review_time']
    
    def __init__(self, *args, **kwargs):
        super(TrainingCourseRatingSerializer,
              self).__init__(*args, **kwargs)
        request = self.context.get('request')
        self.Meta.depth = 0
        if request and request.method == 'GET':
            self.Meta.depth = 2


#Training Details Serializer
class TrainingDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model=models.TrainingTrainingDetails
        fields= ['id', 'training_course','teacher','date','f_time','t_time']
    
    def __init__(self, *args, **kwargs):
        super(TrainingDetailsSerializer, self).__init__(*args, **kwargs)
        request=self.context.get('request')
        self.Meta.depth = 0
        if request and request.method == 'GET':
            self.Meta.depth = 3


#Training Recording Serializer
class TrainingRecordingListSerializer(serializers.ModelSerializer):
    class Meta:
        model=models.TrainingCourseRecording
        fields=['id','rec_number','training_course','topic','rec_time','rec_note','rec_video','rec_date']

    def __init__(self, *args, **kwargs):
        super(TrainingRecordingListSerializer, self).__init__(*args, **kwargs)
        request=self.context.get('request')
        self.Meta.depth = 0
        if request and request.method == 'GET':
            self.Meta.depth = 2


#Training Session Serializer
class TrainingSessionsSerializer(serializers.ModelSerializer):
    class Meta:
        model=models.TrainingSessions
        fields=['id','s_number','s_training_course','s_topic','s_time','s_date','s_meet_link','s_trainer']

    def __init__(self, *args, **kwargs):
        super(TrainingSessionsSerializer, self).__init__(*args, **kwargs)
        request=self.context.get('request')
        self.Meta.depth = 0
        if request and request.method == 'GET':
            self.Meta.depth = 2



