from django.shortcuts import render
from rest_framework import generics
from rest_framework import permissions
from . import models
from statistics import mode
from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import (CourseCreatorSerializer, TrainingCourseSerializer, StudentTrainingEnrollmentSerializer, 
TrainingCourseRatingSerializer,TrainingDetailsSerializer, TrainingRecordingListSerializer, TrainingSessionsSerializer)
# Create your views here.


#Training Teacher List
class CourseCreatorList(generics.ListCreateAPIView):
    queryset = models.CourseCreator.objects.all()
    serializer_class = CourseCreatorSerializer
    # permission_classes=[permissions.IsAuthenticated]


#Training Teacher Details
class CourseCreatorDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.CourseCreator.objects.all()
    serializer_class = CourseCreatorSerializer
    # permission_classes=[permissions.IsAuthenticated]


#Training Course
class TrainingCourseList(generics.ListCreateAPIView):
    queryset = models.TrainingCourse.objects.all()
    serializer_class = TrainingCourseSerializer


#Training Course detail view
class TrainingCourseDetailView(generics.RetrieveAPIView):
    queryset = models.TrainingCourse.objects.all()
    serializer_class = TrainingCourseSerializer


#Trainigng Enrollment 
class StudentTrainingEnrollmentList(generics.ListCreateAPIView):
    queryset = models.StudentTrainingEnrollment.objects.all()
    serializer_class = StudentTrainingEnrollmentSerializer


#Traing Enroll Status
def fetch_training_enroll_status(request, student_id, course_id):
    student = models.Student.objects.filter(id=student_id).first()
    training_course = models.TrainingCourse.objects.filter(id=course_id).first()
    enrollStatus = models.StudentTrainingEnrollment.objects.filter(training_course=training_course, student=student).count()

    if enrollStatus:
        return JsonResponse({'bool': True})
    else:
        return JsonResponse({'bool': False})


# Training Enrolled Student List
class TrainingEnrolledStudentList(generics.ListAPIView):
    queryset = models.StudentTrainingEnrollment.objects.all()
    serializer_class = StudentTrainingEnrollmentSerializer

    def get_queryset(self):
        if 'course_id' in self.kwargs:
            course_id = self.kwargs['course_id']
            training_course = models.TrainingCourse.objects.get(pk=course_id)
            return models.StudentTrainingEnrollment.objects.filter(training_course=training_course)
        
        elif 'creator_id' in self.kwargs:
            creator_id = self.kwargs['creator_id']
            creator = models.CourseCreator.objects.get(pk=creator_id)
            return models.StudentTrainingEnrollment.objects.filter(training__creator=creator).distinct()

        elif 'student_id' in self.kwargs:
            student_id = self.kwargs['student_id']
            student = models.Student.objects.get(pk=student_id)
            return models.StudentTrainingEnrollment.objects.filter(student=student).distinct()



#Traing Course Review list
class AllTrainingReviewsList(generics.ListAPIView):
    queryset = models.TrainingCourseRating.objects.all()
    serializer_class = TrainingCourseRatingSerializer


#Training Course Rating List

class TrainingCourseRatingList(generics.ListCreateAPIView):
    queryset = models.TrainingCourseRating.objects.all()
    serializer_class = TrainingCourseRatingSerializer

    def get_queryset(self):
        course_id = self.kwargs['course_id']
        training_course = models.TrainingCourse.objects.get(pk=course_id)
        return models.TrainingCourseRating.objects.filter(training_course=training_course)

#Training Rating Status [studnet rated a specific training course]
def fetch_rating_status(request, student_id, course_id):
    student = models.Student.objects.filter(id=student_id).first()
    training_course = models.TrainingCourse.objects.filter(id=course_id).first()
    ratingStatus = models.TrainingCourseRating.objects.filter(training_course=training_course, student=student).count()
    if ratingStatus:
        return JsonResponse({'bool': True})
    else:
        return JsonResponse({'bool': False})

#Rating status coursewise
def fetch_training_rating_status(request,course_id):
    training_course = models.TrainingCourse.objects.filter(id=course_id).first()
    ratingStatus = models.TrainingCourseRating.objects.filter(training_course=training_course).count()
    if ratingStatus:
        return JsonResponse({'bool': True})
    else:
        return JsonResponse({'bool': False})



# Training Details list
class TrainingDetailsList(generics.ListAPIView):
    queryset = models.TrainingTrainingDetails.objects.all()
    serializer_class = TrainingDetailsSerializer




#Training Recording List
class TrainingRecordingList(generics.ListAPIView):
    queryset=models.TrainingCourseRecording.objects.all()
    serializer_class = TrainingRecordingListSerializer

#Training Recording List coursewise
class TrainingCourseRecordingList(generics.ListCreateAPIView):
    queryset=models.TrainingCourseRecording.objects.all()
    serializer_class = TrainingRecordingListSerializer

    def get_queryset(self):
        course_id = self.kwargs['course_id']
        training_course = models.TrainingCourse.objects.get(pk=course_id)
        return models.TrainingCourseRecording.objects.filter(training_course=training_course)




#Training Session View
class TrainingSessionsList(generics.ListAPIView):
    queryset=models.TrainingSessions.objects.all()
    serializer_class = TrainingSessionsSerializer


#Training Session View Coursewise
class TrainingCourseSessionsList(generics.ListCreateAPIView):
    queryset=models.TrainingSessions.objects.all()
    serializer_class = TrainingSessionsSerializer

    def get_queryset(self):
        course_id = self.kwargs['course_id']
        training_course = models.TrainingCourse.objects.get(pk=course_id)
        return models.TrainingSessions.objects.filter(s_training_course=training_course)
