from django.contrib import admin
from . import models
# Register your models here.

admin.site.register(models.CourseCreator)
admin.site.register(models.TrainingCourse)
admin.site.register(models.StudentTrainingEnrollment)
admin.site.register(models.TrainingCourseRating)
admin.site.register(models.TrainingTrainingDetails)
admin.site.register(models.TrainingCourseRecording)
admin.site.register(models.TrainingSessions)

