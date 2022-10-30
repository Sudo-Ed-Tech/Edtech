
from distutils.command.upload import upload
from unittest.util import _MAX_LENGTH
from django.db import models
from django.core.validators import MaxValueValidator
from eLearning.models import *


# Create your models here.


class CourseCreator(models.Model):
    full_name = models.CharField(max_length=100)
    details = models.TextField(null=True)
    email = models.EmailField(max_length=100, unique=True)
    password = models.CharField(max_length=100)
    mobile_no = models.CharField(max_length=20, unique=True)
    qualification = models.CharField(max_length=200)

    class Meta:
        verbose_name_plural = "0. Course Creator"

    def __str__(self):
        return self.full_name

    def skill_list(self):
        skill_list = self.skills.split(',')
        return skill_list

    # Total Courses
    def total_teacher_courses(self):
        total_courses = TrainingCourse.objects.filter(teacher=self).count()
        return total_courses


class TrainingCourse(models.Model):
    creator = models.ForeignKey(
        CourseCreator, on_delete=models.CASCADE, related_name="creator_courses")
    title = models.CharField(max_length=150)
    description = models.TextField()
    featured_img = models.ImageField(upload_to='course_img/', null=True)
    technologies = models.TextField(null=True)

    class Meta:
        verbose_name_plural = "1. Training Courses"

    def __str__(self):
        return f"{self.title} -{self.creator}"

    def training_tech_list(self):
        training_tech_list = self.technologies.split(',')
        return training_tech_list

    # Students enrolled in training
    def training_enrolled_student(self):
        training_enrolled_student = StudentTrainingEnrollment.objects.filter(
            training_course=self).count()
        return training_enrolled_student

    def course_rating(self):
        course_rating = TrainingCourseRating.objects.filter(
            training_course=self).aggregate(avg_rating=models.Avg('rating'))
        return course_rating['avg_rating']

# Student Training enrollment


class StudentTrainingEnrollment(models.Model):
    training_course = models.ForeignKey(
        TrainingCourse, on_delete=models.CASCADE, related_name="enrolled_training")
    student = models.ForeignKey(
        Student, on_delete=models.CASCADE, related_name="enrolled_training_student")
    enrolled_time = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural = "2. Student Training Enrollment"

    def __str__(self):
        return f"{self.training_course} - {self.student}"


# Training Course Rating and Reviews
class TrainingCourseRating(models.Model):
    training_course = models.ForeignKey(
        TrainingCourse, on_delete=models.CASCADE)
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    rating = models.PositiveIntegerField(
        default=0, validators=[MaxValueValidator(5)])
    reviews = models.TextField(null=True)
    review_time = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural = "3. Training Course Rating"

    def __str__(self):
        return f"{self.training_course} - {self.student} - {self.rating}"


# Training Details
class TrainingTrainingDetails(models.Model):
    training_course = models.ForeignKey(
        TrainingCourse, on_delete=models.CASCADE)
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE)
    date = models.DateField("Date")
    f_time = models.TimeField("Time")
    t_time = models.TimeField("Time", null=True)

    class Meta:
        verbose_name_plural = "4. Training Details"

    def __str__(self):
        return f"{self.teacher} - {self.training_course}"


class TrainingCourseRecording(models.Model):
    training_course = models.ForeignKey(
        TrainingCourse, on_delete=models.CASCADE)
    rec_number = models.PositiveIntegerField(default=0)
    topic = models.CharField(max_length=150)
    rec_time = models.TimeField('Time', default=None)
    rec_note = models.FileField(upload_to='training_notes/')
    rec_video = models.FileField(upload_to='training_recording/')
    rec_date = models.DateField("Date")

    class Meta:
        verbose_name_plural = '5. Training Csurse Recordings'

    def __str__(self):
        return f'{self.training_course} - {self.topic} - {self.rec_date} - {self.rec_time}'


class TrainingSessions(models.Model):
    s_number=models.PositiveIntegerField(default=0)
    s_training_course = models.ForeignKey(
        TrainingCourse, on_delete=models.CASCADE)
    s_topic = models.CharField(max_length=150)
    s_time = models.TimeField('Time')
    s_date = models.DateField("Date")
    s_meet_link = models.URLField(max_length=200, null=True)
    s_trainer = models.ForeignKey(Teacher, on_delete=models.CASCADE)


    class Meta:
        verbose_name_plural = '6. Training Session'

    def __str__(self):
        return f'{self.s_training_course} - {self.s_topic} - {self.s_date} - {self.s_time} -- {self.s_trainer}'
