from statistics import mode
from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework import serializers
from rest_framework.response import Response
from .serializers import (CategorySerializer, CourseRatingSerializer, TeacherSerializer, CourseSerializer,
                          ChapterSerializer, StudnetSerializer, StudentCourseEnrollSerializer, TeacherDashboardSerializer, TrainingDetailsSerializer,
                          StudentFavoriteCourseSerializer, StudentTrainingEnrollSerializer)
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
    serializer_class = TeacherDashboardSerializer


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

        elif 'studentId' in self.request.GET:
            student_id = self.request.GET['studentId']
            student = models.Student.objects.get(pk='student_id')
            queries = [Q(technologies__iendswith=value)
                       for value in student.interests]
            query = queries.pop()
            for item in queries:
                query |= item
            qs = models.Course.objects.filter(query)
            return qs
        return qs


# Course detail view
class CourseDetailView(generics.RetrieveAPIView):
    queryset = models.Course.objects.all()
    serializer_class = CourseSerializer

# Favortie Courses


class StudentFavoriteCourseList(generics.ListCreateAPIView):
    queryset = models.StudentFavoriteCourse.objects.all()
    serializer_class = StudentFavoriteCourseSerializer

    def get_queryset(self):
        if 'student_id' in self.kwargs:
            student_id = self.kwargs['student_id']
            student = models.Student.objects.get(pk=student_id)
            return models.StudentFavoriteCourse.objects.filter(student=student).distinct()


class StudentFavoriteCourseDetail(generics.RetrieveDestroyAPIView):
    queryset = models.StudentFavoriteCourse.objects.all()
    serializer_class = StudentFavoriteCourseSerializer


def fetch_favorite_status(request, student_id, course_id):
    student = models.Student.objects.filter(id=student_id).first()
    course = models.Course.objects.filter(id=course_id).first()
    favoriteStatus = models.StudentFavoriteCourse.objects.filter(
        course=course, student=student).first()
    if favoriteStatus and favoriteStatus.status == True:
        return JsonResponse({'bool': True})
    else:
        return JsonResponse({'bool': False})


def remove_favorite_status(request, student_id, course_id):
    student = models.Student.objects.filter(id=student_id).first()
    course = models.Course.objects.filter(id=course_id).first()
    favoriteStatus = models.StudentFavoriteCourse.objects.filter(
        course=course, student=student).delete()
    if favoriteStatus:
        return JsonResponse({'bool': True})
    else:
        return JsonResponse({'bool': False})

# Teacher course List


class TeacherCourseList(generics.ListCreateAPIView):
    serializer_class = CourseSerializer

    def get_queryset(self):
        teacher_id = self.kwargs['teacher_id']
        teacher = models.Teacher.objects.get(pk=teacher_id)
        return models.Course.objects.filter(teacher=teacher)

# Teacher Course Details


class TeacherCourseDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Course.objects.all()
    serializer_class = CourseSerializer


# Chapter List
class ChapterList(generics.ListCreateAPIView):
    queryset = models.Chapter.objects.all()
    serializer_class = ChapterSerializer

# Course Chapter List


class CourseChapterList(generics.ListAPIView):
    queryset = models.Chapter.objects.all()
    serializer_class = ChapterSerializer

    def get_queryset(self):
        if 'course_id' in self.kwargs:
            course_id = self.kwargs['course_id']
            course = models.Course.objects.get(pk=course_id)
            return models.Chapter.objects.filter(course=course)


def course_chapter(request, course_id, chapter_id):
    course = models.Course.objects.filter(id=course_id)
    chapter = models.Chapter.objects.filter(id=chapter_id)
    course_chapter = models.CourseRating.objects.filter(
        course=course, chapter=chapter)
    return course_chapter

# Chapter Detail View


class ChapterDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Chapter.objects.all()
    serializer_class = ChapterSerializer

# Enrolled Student Course List


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


# Training Enrollment
class StudentTrainingEnrollmentList(generics.ListCreateAPIView):
    queryset = models.StudentTrainingEnrollment.objects.all()
    serializer_class = StudentTrainingEnrollSerializer


def fetch_training_enroll_status(request, student_id, course_id):
    student = models.Student.objects.filter(id=student_id).first()
    course = models.Course.objects.filter(id=course_id).first()
    enrollStatus = models.StudentTrainingEnrollment.objects.filter(
        course=course, student=student).count()

    if enrollStatus:
        return JsonResponse({'bool': True})
    else:
        return JsonResponse({'bool': False})


# Enrolled Student List
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
            student_id = self.kwargs['student_id']
            student = models.Student.objects.get(pk=student_id)
            return models.StudentCourseEnrollment.objects.filter(student=student).distinct()


# Training Enrolled Student List
class TrainingEnrolledStudentList(generics.ListAPIView):
    queryset = models.StudentTrainingEnrollment.objects.all()
    serializer_class = StudentCourseEnrollSerializer

    def get_queryset(self):
        if 'course_id' in self.kwargs:
            course_id = self.kwargs['course_id']
            course = models.Course.objects.get(pk=course_id)
            return models.StudentTrainingEnrollment.objects.filter(course=course)

        elif 'teacher_id' in self.kwargs:
            teacher_id = self.kwargs['teacher_id']
            teacher = models.Teacher.objects.get(pk=teacher_id)
            return models.StudentTrainingEnrollment.objects.filter(course__teacher=teacher).distinct()

        elif 'student_id' in self.kwargs:
            student_id = self.kwargs['student_id']
            student = models.Student.objects.get(pk=student_id)
            return models.StudentTrainingEnrollment.objects.filter(student=student).distinct()


# Review list
class AllReviewsList(generics.ListAPIView):
    queryset = models.CourseRating.objects.all()
    serializer_class = CourseRatingSerializer

# Reting Lsit


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
    ratingStatus = models.CourseRating.objects.filter(course=course, student=student).count()
    if ratingStatus:
        return JsonResponse({'bool': True})
    else:
        return JsonResponse({'bool': False})

def fetch_course_rating_status(request,course_id):
    course = models.Course.objects.filter(id=course_id).first()
    ratingStatus = models.CourseRating.objects.filter(course=course).count()
    if ratingStatus:
        return JsonResponse({'bool': True})
    else:
        return JsonResponse({'bool': False})


# Training Details list
class TrainingDetailsList(generics.ListAPIView):
    queryset = models.TrainingDetails.objects.all()
    serializer_class = TrainingDetailsSerializer

# EdTech training detail list


class EdTrainingDetailsList(generics.ListCreateAPIView):
    queryset = models.TrainingDetails.objects.all()
    serializer_class = TrainingDetailsSerializer

    def get_queryset(self):
        # Trainer Training Details
        if 'teacher_id' in self.kwargs:
            teacher_id = self.kwargs['teacher_id']
            teacher = models.Teacher.objects.get(pk=teacher_id)
            return models.TrainingDetails.objects.filter(teacher=teacher_id)

        # #Student Training Details
        # elif 'student_id' in self.kwargs:
        #     student_id = self.kwargs['student_id']
        #     student = models.Student.objects.get(pk=student_id)
        #     return models.TrainingDetails.objects.filter(student=student_id)
