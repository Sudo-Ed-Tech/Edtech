from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import CategorySerializer, CourseRatingSerializer, TeacherSerializer, CourseSerializer, ChapterSerializer, StudnetSerializer, StudentCourseEnrollSerializer, TeacherDashboardSerializer, TrainingDetailsSerializer
from rest_framework import generics
from rest_framework import permissions
from . import models


class TeacherList(generics.ListCreateAPIView):
    queryset = models.Teacher.objects.all()
    serializer_class = TeacherSerializer
    # permission_classes=[permissions.IsAuthenticated]


class TeacherDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Teacher.objects.all()
    serializer_class = TeacherSerializer
    # permission_classes=[permissions.IsAuthenticated]

class TeacherDashboard(generics.RetrieveAPIView):
    queryset = models.Teacher.objects.all()
    serializer_class=TeacherDashboardSerializer


@csrf_exempt
def teacher_login(request):
    email = request.POST['email']
    password = request.POST['password']
    try:
        teacherData = models.Teacher.objects.get(
            email=email, password=password)
    except models.Teacher.DoesNotExist:
        teacherData = None
    if teacherData:
        return JsonResponse({'bool': True, 'teacher_id': teacherData.id})
    else:
        return JsonResponse({'bool': False})


class StudentList(generics.ListCreateAPIView):
    queryset = models.Student.objects.all()
    serializer_class = StudnetSerializer
    # permission_classes=[permissions.IsAuthenticated]


@csrf_exempt
def user_login(request):
    email = request.POST['email']
    password = request.POST['password']
    try:
        studentData = models.Student.objects.get(
            email=email, password=password)
    except models.Student.DoesNotExist:
        studentData = None

    if studentData:
        return JsonResponse({'bool': True, 'student_id': studentData.id})
    else:
        return JsonResponse({'bool': False})


# Course Category
class CategoryList(generics.ListCreateAPIView):
    queryset = models.CourseCategory.objects.all()
    serializer_class = CategorySerializer


# Course list
class CourseList(generics.ListCreateAPIView):
    queryset = models.Course.objects.all()
    serializer_class = CourseSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        if 'result' in self.request.GET:
            limit = int(self.request.GET['result'])
            qs = models.Course.objects.all().order_by('-id')[:limit]

        if 'category' in self.request.GET:
            category = self.request.GET['category']
            qs = models.Course.objects.filter(technologies__icontains=category)

        if 'skill_name' in self.request.GET and 'teacher' in self.request.GET:
            skill_name = self.request.GET['skill_name']
            skill_name = self.request.GET['teacher']
            teacher = models.Teacher.objects.filter(id=skill_name).first()
            qs = models.Course.objects.filter(
                technologies__icontains=skill_name, teacher=teacher)

        return qs


# Course detail view
class CourseDetailView(generics.RetrieveAPIView):
    queryset = models.Course.objects.all()
    serializer_class = CourseSerializer

    # def get_queryset(self):
    #     category_id = self.kwargs['category_id']
    #     course = models.Course.objects.get(pk=category_id)
    #     return models.Chapter.objects.filter(category=category_id)
    


# teacher course
class TeacherCourseList(generics.ListCreateAPIView):
    serializer_class = CourseSerializer

    def get_queryset(self):
        teacher_id = self.kwargs['teacher_id']
        teacher = models.Teacher.objects.get(pk=teacher_id)
        return models.Course.objects.filter(teacher=teacher)


class TeacherCourseDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Course.objects.all()
    serializer_class = CourseSerializer


# Chapter List
class ChapterList(generics.ListCreateAPIView):
    queryset = models.Chapter.objects.all()
    serializer_class = ChapterSerializer


class CourseChapterList(generics.ListAPIView):
    serializer_class = ChapterSerializer

    def get_queryset(self):
        course_id = self.kwargs['course_id']
        course = models.Course.objects.get(pk=course_id)
        return models.Chapter.objects.filter(course=course)


class ChapterDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Chapter.objects.all()
    serializer_class = ChapterSerializer


class StudentEnrollCourseList(generics.ListCreateAPIView):
    queryset = models.StudentCourseEnrollment.objects.all()
    serializer_class = StudentCourseEnrollSerializer
    # permission_classes=[permissions.IsAuthenticated]


def fetch_enroll_status(request, student_id, course_id):
    student = models.Student.objects.filter(id=student_id).first()
    course = models.Course.objects.filter(id=course_id).first()
    enrollStatus = models.StudentCourseEnrollment.objects.filter(
        course=course, student=student).count()

    if enrollStatus:
        return JsonResponse({'bool': True})
    else:
        return JsonResponse({'bool': False})


class EnrolledStudentList(generics.ListAPIView):
    queryset = models.StudentCourseEnrollment.objects.all()
    serializer_class = StudentCourseEnrollSerializer

    def get_queryset(self):
        if 'course_id' in self.kwargs:
            course_id = self.kwargs['course_id']
            course = models.Course.objects.get(pk=course_id)
            return models.StudentCourseEnrollment.objects.filter(course=course)
        elif 'teacher_id' in self.kwargs:
            teacher_id = self.kwargs['teacher_id']
            teacher = models.Teacher.objects.get(pk=teacher_id)
            return models.StudentCourseEnrollment.objects.filter(course__teacher=teacher).distinct()

        elif 'student_id' in self.kwargs:
            student_id=self.kwargs['student_id']
            student=models.Student.objects.get(pk=student_id)
            return models.StudentCourseEnrollment.objects.filter(student=student).distinct()


class AllReviewsList(generics.ListAPIView):
    queryset = models.CourseRating.objects.all()
    serializer_class = CourseRatingSerializer


class CourseRatingList(generics.ListCreateAPIView):
    # queryset = models.CourseRating.objects.all()
    serializer_class = CourseRatingSerializer

    def get_queryset(self):
        course_id = self.kwargs['course_id']
        course = models.Course.objects.get(pk=course_id)
        return models.CourseRating.objects.filter(course=course)


def fetch_rating_status(request, student_id, course_id):
    student = models.Student.objects.filter(id=student_id).first()
    course = models.Course.objects.filter(id=course_id).first()
    ratingStatus = models.CourseRating.objects.filter(course=course,student=student).count()
    if ratingStatus:
        return JsonResponse({'bool': True})
    else:
        return JsonResponse({'bool': False})


class TrainingDetailsList(generics.ListAPIView):
    queryset = models.TrainingDetails.objects.all()
    serializer_class = TrainingDetailsSerializer

class EdTrainingDetailsList(generics.ListCreateAPIView):
    queryset = models.TrainingDetails.objects.all()
    serializer_class = TrainingDetailsSerializer

    
    def get_queryset(self):
        #Trainer Training Details
        if 'teacher_id' in self.kwargs:    
            teacher_id = self.kwargs['teacher_id']
            teacher = models.Teacher.objects.get(pk=teacher_id)
            return models.TrainingDetails.objects.filter(teacher=teacher_id)

        # #Student Training Details
        # elif 'student_id' in self.kwargs:
        #     student_id = self.kwargs['student_id']
        #     student = models.Student.objects.get(pk=student_id)
        #     return models.TrainingDetails.objects.filter(student=student_id)

