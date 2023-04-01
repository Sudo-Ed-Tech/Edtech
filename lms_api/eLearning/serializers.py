from rest_framework import serializers
from . import models
from django.contrib.flatpages.models import FlatPage

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

class TeacherResumeSerializer(serializers.ModelSerializer):
    class Meta: 
        model= models.TeacherResume
        fields=['id','teacher','resume']

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
        fields = ['id', 'category', 'teacher', 'title','tag_line', 'description', 'featured_img','technologies', 'course_chapter', 'related_videos', 'tech_list','enrolled_courses','total_enrolled_students','course_rating']
        # depth = 1
    def __init__(self, *args, **kwargs):
        super(CourseSerializer, self).__init__(*args, **kwargs)
        request=self.context.get('request')
        self.Meta.depth = 0
        if request and request.method == 'GET':
            self.Meta.depth =2  


class StudentFavoriteCourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.StudentFavoriteCourse 
        fields = ['id', 'course', 'student', 'status']
        
    def __init__(self, *args, **kwargs):
        super(StudentFavoriteCourseSerializer, self).__init__(*args, **kwargs)
        request=self.context.get('request')
        self.Meta.depth = 0
        if request and request.method == 'GET':
            self.Meta.depth =2 


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
            self.Meta.depth =2

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Student
        fields = ['id', 'full_name', 'username', 'email','password', 'interests','enrolled_student','enrolled_training_student','profile_img']
        # depth =1

    def __init__(self, *args, **kwargs):
        super(StudentSerializer, self).__init__(*args, **kwargs)
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
            self.Meta.depth =2   



class StudentTrainingEnrollSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.StudentTrainingEnrollment
        fields = ['id', 'course', 'student','e_time']
        # depth=1

    def __init__(self, *args, **kwargs):
        super(StudentTrainingEnrollSerializer, self).__init__(*args, **kwargs)
        request=self.context.get('request')
        self.Meta.depth = 0
        if request and request.method == 'GET':
            self.Meta.depth =2   

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
            self.Meta.depth = 3


#Flat page serializer
class FlatPageSerializer(serializers.ModelSerializer):
    class Meta:
        model=FlatPage
        fields=['id','title','content','url']


# #popular Course Serializer
# class PopularCoursesSerializer(serializers.ModelSerializer):
#     class Meta:
#         model=models.PopularCourses
#         fields=['id','course','rating']


#Assignment Serializer
class StudentAssignmentSerializer(serializers.ModelSerializer):
    class Meta:
        model=models.StudentAssignment
        fields= ['id','teacher', 'student','title','detail','doc_file','student_status','add_time',]
    
    def __init__(self, *args, **kwargs):
        super(StudentAssignmentSerializer, self).__init__(*args, **kwargs)
        request=self.context.get('request')
        self.Meta.depth = 0
        if request and request.method == 'GET':
            self.Meta.depth = 2


class StudentDashboardSerializer(serializers.ModelSerializer):
    class Meta:
        model=models.Student
        fields=['enrolled_courses','favorites_courses','complete_assignments','pending_assignments']


class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model=models.Notification
        fields=['teacher','student','notif_subject','notif_for']

    def __init__(self, *args, **kwargs):
        super(NotificationSerializer, self).__init__(*args, **kwargs)
        request=self.context.get('request')
        self.Meta.depth = 0
        if request and request.method == 'GET':
            self.Meta.depth = 2


class QuizSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Quiz
        fields = ['id','teacher', 'title','detail','assign_status', 'add_time']
        # depth = 1
    def __init__(self, *args, **kwargs):
        super(QuizSerializer, self).__init__(*args, **kwargs)
        request=self.context.get('request')
        self.Meta.depth = 0
        if request and request.method == 'GET':
            self.Meta.depth =2  


class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.QuizQuestions
        fields = ['id', 'quiz','questions', 'ans1', 'ans2', 'ans3','ans4', 'right_ans']
        # depth=1
    def __init__(self, *args, **kwargs):
        super(QuestionSerializer, self).__init__(*args, **kwargs)
        request=self.context.get('request')
        self.Meta.depth = 0
        if request and request.method == 'GET':
            self.Meta.depth =2

class CourseQuizSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.CourseQuiz
        fields = ['id','teacher', 'course', 'quiz','add_time']
        # depth=1

    def __init__(self, *args, **kwargs):
        super(CourseQuizSerializer, self).__init__(*args, **kwargs)
        request=self.context.get('request')
        self.Meta.depth = 0
        if request and request.method == 'GET':
            self.Meta.depth =2  


class AttempQuizSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.AttempQuiz
        fields = ['id','student', 'question','right_ans','add_time']
        # depth=1

    def __init__(self, *args, **kwargs):
        super(AttempQuizSerializer, self).__init__(*args, **kwargs)
        request=self.context.get('request')
        self.Meta.depth = 0
        if request and request.method == 'GET':
            self.Meta.depth =2  