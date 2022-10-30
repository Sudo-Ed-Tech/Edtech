from django.urls import path
from . import views


urlpatterns = [
    #Creator
    path('creator/', views.CourseCreatorList.as_view()),
    path('creator/<int:pk>', views.CourseCreatorDetail.as_view()),

    #Training Courses
    path('training-courses/', views.TrainingCourseList.as_view()),
    path('training-course/<int:pk>', views.TrainingCourseDetailView.as_view()),

    #Traing Enrollment
    path('student-enroll-training/', views.StudentTrainingEnrollmentList.as_view()),
    path('fetch-training-enroll-status/<int:student_id>/<int:course_id>', views.fetch_training_enroll_status),
    path('fetch-training-all-enrolled-students/<int:creator_id>', views.TrainingEnrolledStudentList.as_view()),
    path('fetch-training-enrolled-students/<int:course_id>', views.TrainingEnrolledStudentList.as_view()),
    path('fetch-training-enrolled-courses/<int:student_id>', views.TrainingEnrolledStudentList.as_view()),

    #Training Course Rating
    path('trainig-course-rating/', views.AllTrainingReviewsList.as_view()),
    path('trainig-training-rating/<int:course_id>', views.TrainingCourseRatingList.as_view()),
    path('fetch-rating-status/<int:student_id>/<int:course_id>', views.fetch_rating_status),
    path('fetch-training-rating-status/<int:course_id>', views.fetch_training_rating_status),

    #Training Detials
    path('training-details/', views.TrainingDetailsList.as_view()),

    #Training Recording
    path('training-recordings/', views.TrainingRecordingList.as_view()),
    path('training-recording/<int:course_id>', views.TrainingCourseRecordingList.as_view()),

    #Training Session 
    path('training-sessions/', views.TrainingSessionsList.as_view()),
    path('training-session/<int:course_id>', views.TrainingCourseSessionsList.as_view()),
    

]