from django.urls import path
from . import views

urlpatterns = [
    # Teacher
    path('teacher/', views.TeacherList.as_view()),
    path('teacher/dashboard/<int:pk>', views.TeacherDashboard.as_view()),
    path('teacher/<int:pk>', views.TeacherDetail.as_view()),
    path('teacher-login', views.teacher_login),

    
    # Course Category
    path('category/', views.CategoryList.as_view()),
    path('course/', views.CourseList.as_view()),
    path('course/<int:pk>', views.CourseDetailView.as_view()),
    # path('course-category/<int:category_id>',views.CourseDetailView.as_view()),

    # Chapter
    path('chapter/', views.ChapterList.as_view()),
    path('chapter/<int:pk>', views.ChapterDetailView.as_view()),
    path('course-chapters/<int:course_id>', views.CourseChapterList.as_view()),

    # Teacher course detials
    path('teacher-course/<int:teacher_id>', views.TeacherCourseList.as_view()),
    path('teacher-course-detail/<int:pk>', views.TeacherCourseDetail.as_view()),

    # student
    path('student/', views.StudentList.as_view()),
    path('user-login', views.user_login),

    #Student Enrollment
    path('student-enroll-course/', views.StudentEnrollCourseList.as_view()),
    path('fetch-enroll-status/<int:student_id>/<int:course_id>', views.fetch_enroll_status),
    path('fetch-all-enrolled-students/<int:teacher_id>', views.EnrolledStudentList.as_view()),
    path('fetch-enrolled-students/<int:course_id>', views.EnrolledStudentList.as_view()),
    path('fetch-enrolled-courses/<int:student_id>', views.EnrolledStudentList.as_view()),

    #Course Rating
    path('course-rating/', views.AllReviewsList.as_view()),
    path('course-rating/<int:course_id>', views.CourseRatingList.as_view()),
    path('fetch-rating-status/<int:student_id>/<int:course_id>', views.fetch_rating_status),
    path('fetch-course-rating-status/<int:course_id>', views.fetch_rating_status),
    
    
    #Training 
    path('training-details/', views.TrainingDetailsList.as_view()),
    path('training-details-teacher/<int:teacher_id>', views.EdTrainingDetailsList.as_view()),
    path('training-details-student/<int:student_id>', views.EnrolledStudentList.as_view()),

]
