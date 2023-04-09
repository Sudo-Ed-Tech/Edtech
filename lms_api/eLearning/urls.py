from django.urls import path
from . import views

urlpatterns = [

    path('pages/', views.FlatPageList.as_view()),
    path('page/<int:pk>/<str:page_slug>', views.FlatPageDetail.as_view()),
    
    # Teacher
    path('teacher/', views.TeacherList.as_view()),
    path('teacher/dashboard/<int:pk>', views.TeacherDashboard.as_view()),
    path('teacher/<int:pk>', views.TeacherDetail.as_view()),
    path('teacher-login', views.teacher_login),

    #Teacher Resume
    path('teacher/resumes/', views.TeacherResumeList.as_view()),
    path('teacher/resume/<int:teacher_id>', views.TeacherResume.as_view()),
    
    

    path('login/', views.AuthenticationView.as_view()),

    
    # Course Category
    path('category/', views.CategoryList.as_view()),
    path('courses/', views.CourseList.as_view()),
    path('search-courses/<str:searchstring>', views.CourseList.as_view()),
    path('course/<int:pk>', views.CourseDetailView.as_view()),
    path('course-category/<int:category_id>',views.CourseDetailView.as_view()),

    # Chapter
    path('chapter/', views.ChapterList.as_view()),
    path('chapter/<int:pk>', views.ChapterDetailView.as_view()),
    path('course-chapters/<int:course_id>', views.CourseChapterList.as_view()),
    path('course-chapters-list/<int:course_id>/<int:chapter_id>', views.course_chapter),

    # Teacher course details
    path('teacher-course/<int:teacher_id>', views.TeacherCourseList.as_view()),
    path('teacher-course-detail/<int:pk>', views.TeacherCourseDetail.as_view()),

    # student
    path('student/', views.StudentList.as_view()),
    path('student/<int:pk>', views.StudentDetail.as_view()),
    path('student/dashboard/<int:pk>', views.StudentDashboard.as_view()),
    path('student/change-password/<int:student_id>/',views.student_change_password),
    path('user-login', views.user_login),

    #Student Enrollment
    path('student-enroll-course/', views.StudentEnrollCourseList.as_view()),
    path('fetch-enroll-status/<int:student_id>/<int:course_id>', views.fetch_enroll_status),
    path('fetch-all-enrolled-students/<int:teacher_id>', views.EnrolledStudentList.as_view()),
    path('fetch-enrolled-students/<int:course_id>', views.EnrolledStudentList.as_view()),
    path('fetch-enrolled-courses/<int:student_id>', views.EnrolledStudentList.as_view()),
    
    #Favorite Course
    path('student-add-favorite-course/', views.StudentFavoriteCourseList.as_view()),
    path('student-remove-favorite-course/<int:course_id>/<int:student_id>', views.remove_favorite_status),
    path('fetch-favorite-status/<int:student_id>/<int:course_id>', views.fetch_favorite_status),
    path('fetch-favorite-courses/<int:student_id>', views.StudentFavoriteCourseList.as_view()),

    #Recommended course
    path('fetch-recommended-courses/<int:studentId>', views.CourseList.as_view()),

    #Course Rating
    path('course-rating/', views.AllReviewsList.as_view()),
    path('course-rating/<int:course_id>', views.CourseRatingList.as_view()),
    path('fetch-rating-status/<int:student_id>/<int:course_id>', views.fetch_rating_status),
    path('fetch-course-rating-status/<int:course_id>', views.fetch_course_rating_status),
    
    
    #Training 
    path('training-details/', views.TrainingDetailsList.as_view()),
    path('training-details-teacher/<int:teacher_id>', views.EdTrainingDetailsList.as_view()),

    #Training Enrollment
    path('student-enroll-training/', views.StudentTrainingEnrollmentList.as_view()),
    path('fetch-training-enroll-status/<int:student_id>/<int:course_id>', views.fetch_training_enroll_status),
    path('fetch-training-all-enrolled-students/<int:teacher_id>', views.TrainingEnrolledStudentList.as_view()),
    path('fetch-training-enrolled-students/<int:course_id>', views.TrainingEnrolledStudentList.as_view()),
    path('fetch-training-enrolled-courses/<int:student_id>', views.TrainingEnrolledStudentList.as_view()),


    #Popular Course List
    #path('popular-course/', views.PopularCourseList.as_view()),

    #Assignment
    path('student-assignment/<int:teacher_id>/<int:student_id>', views.AssignmentList.as_view()),
    path('my-assignments/<int:student_id>', views.MyAssignmentList.as_view()),
    path('update-assignments/<int:pk>', views.UpdateAssignment.as_view()),
    path('student/fetch-all-notifications/<int:student_id>',views.NotificationList.as_view()),
    path('save-notification/',views.NotificationList.as_view()),

    #quiz start
    path('quiz/', views.Quizlist.as_view()),
    path('teacher-quiz/<int:teacher_id>', views.TeacherQuizList.as_view()),
    path('teacher-quiz-detail/<int:pk>', views.TeacherQuizDetail.as_view()),
    path('quiz/<int:pk>', views.QuizDetailView.as_view()),
    path('quiz-questions/<int:quiz_id>', views.QuizQuestionList.as_view()),
    path('quiz-questions/<int:quiz_id>/<int:limit>', views.QuizQuestionList.as_view()),
    path('add-quiz-questions/<int:quiz_id>', views.QuizQuestionList.as_view()),
    path('fetch-quiz-assign-status/<int:quiz_id>/<int:course_id>', views.fetch_quiz_assign_status),
    path('quiz-assign-course/', views.CourseQuizList.as_view()),
    path('fetch-assigned-quiz/<int:course_id>', views.CourseQuizList.as_view()),
    path('attempt-quiz/', views.AttempQuizList.as_view()),
    path('quiz-questions/<int:quiz_id>/next-question/<int:question_id>', views.QuizQuestionList.as_view()),
    path('fetch-quiz-attempt-status/<int:quiz_id>/<int:student_id>', views.fetch_quiz_attempt_status),

    #study materials
    path('user/study-materials/<int:course_id>', views.StudyMaterialList.as_view()),
    path('study-materials/<int:course_id>', views.StudyMaterialList.as_view()),
    path('study-material/<int:pk>', views.StudyMaterialDetailView.as_view()),
    path('attempted-quiz/<int:quiz_id>', views.AttempQuizList.as_view()),
    path('fetch-quiz-result/<int:quiz_id>/<int:student_id>', views.fetch_quiz_result),
]
