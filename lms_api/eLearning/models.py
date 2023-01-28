from django.db import models
from django.core import serializers


class Teacher(models.Model):
    full_name = models.CharField(max_length=100)
    details = models.TextField(null=True)
    email = models.EmailField(max_length=100, unique=True)
    password = models.CharField(max_length=100)
    mobile_no = models.CharField(max_length=20, unique=True)
    qualification = models.CharField(max_length=200)
    skills = models.TextField()

    class Meta:
        verbose_name_plural = "4. Teachers"

    def __str__(self):
        return self.full_name

    def skill_list(self):
        skill_list = self.skills.split(',')
        return skill_list

    # Total Courses
    def total_teacher_courses(self):
        total_courses = Course.objects.filter(teacher=self).count()
        return total_courses

    # Total Chapters
    def total_teacher_chapters(self):
        total_chapters = Chapter.objects.filter(course__teacher=self).count()
        return total_chapters

    # Total Students
    def total_teacher_students(self):
        total_students = StudentCourseEnrollment.objects.filter(
            course__teacher=self).count()
        return total_students

#Teacher resume
class TeacherResume(models.Model):
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE)
    resume=models.FileField()
    
    class Meta:
        verbose_name_plural= "44. Teacher Resume"

    def __str__(self):
        return self.teacher.full_name

    

#Course Category
class CourseCategory(models.Model):
    title = models.CharField(max_length=150)
    description = models.TextField()

    class Meta:
        verbose_name_plural = "1. Course Categories"

    def __str__(self):
        return self.title


class Course(models.Model):
    category = models.ForeignKey(CourseCategory, on_delete=models.CASCADE)
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE, related_name="teacher_courses")
    title = models.CharField(max_length=150)
    tag_line = models.CharField(max_length=300, null=True)
    description = models.TextField()
    featured_img = models.ImageField(upload_to='course_img/', null=True)
    technologies = models.TextField(null=True)

    class Meta:
        verbose_name_plural = "2. Courses"

    def __str__(self):
        return f"{self.title} -{self.teacher}"
  
    def related_videos(self):
        related_videos = Course.objects.filter(technologies__icontains=self.technologies).exclude(id=self.id)
        return serializers.serialize('json', related_videos)

    def tech_list(self):
        tech_list = self.technologies.split(',')
        return tech_list

    def total_enrolled_students(self):
        total_enrolled_students = StudentCourseEnrollment.objects.filter(course=self).count()
        return total_enrolled_students

    # Students enrolled in training
    def training_enrolled_student(self):
        training_enrolled_student = StudentTrainingEnrollment.objects.filter(course=self).count()
        return training_enrolled_student

    def course_rating(self):
        course_rating = CourseRating.objects.filter(course=self).aggregate(avg_rating=models.Avg('rating'))
        return course_rating['avg_rating']

    # Student enrolled in traiing
    def Student_enrolled_traing(self, course_id):
        Student_enrolled_traing = StudentCourseEnrollment.objects.filter(course=course_id).count()

# Chapter
class Chapter(models.Model):
    course = models.ForeignKey(
        Course, on_delete=models.CASCADE, related_name="course_chapter")
    title = models.CharField(max_length=150)
    description = models.TextField()
    video = models.FileField(upload_to='chapter_videos/', null=True)
    note_file = models.FileField(upload_to='Chapter_notes/', null=True)
    remarks = models.TextField()

    class Meta:
        verbose_name_plural = "3. Chapter"

    def __str__(self):
        return self.title


# Student
class Student(models.Model):
    full_name = models.CharField(max_length=100)
    username = models.CharField(max_length=50, unique=True, null=True)
    email = models.EmailField(max_length=100, unique=True)
    password = models.CharField(max_length=100)
    qualification = models.CharField(max_length=200)
    interests = models.TextField(null=True)

    class Meta:
        verbose_name_plural = "5. Students"

    def __str__(self):
        return self.full_name


# Favorite Course
class StudentFavoriteCourse(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    status = models.BooleanField(default=False)

    class Meta:
        verbose_name_plural = "9. Favorite Courses"

    def __str__(self):
        return f"{self.course} - {self.student}"


# Student course enrollment
class StudentCourseEnrollment(models.Model):
    course = models.ForeignKey(
        Course, on_delete=models.CASCADE, related_name="enrolled_courses")
    student = models.ForeignKey(
        Student, on_delete=models.CASCADE, related_name="enrolled_student")
    enrolled_time = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural = "6. Student Course Enrollment"

    def __str__(self):
        return f"{self.course} - {self.student}"


# Course Rating and Reviews
class CourseRating(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    rating = models.PositiveIntegerField(default=0)
    reviews = models.TextField(null=True)
    review_time = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural = "7. Course Rating"

    def __str__(self):
        return f"{self.course.title} - {self.rating}"


# Training Details
class TrainingDetails(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE)
    date = models.DateField("Date")
    f_time = models.TimeField("Time")
    t_time = models.TimeField("Time", null=True)
    meeting_link = models.URLField(max_length=200, null=True)

    class Meta:
        verbose_name_plural = "8. Training Details"

    def __str__(self):
        return f"{self.teacher} - {self.course}"

    # Students enrolled in training
    def training_enrolled_student(self):
        training_enrolled_student = StudentTrainingEnrollment.objects.filter(course=self).count()
        return training_enrolled_student

# Training Enrollment
class StudentTrainingEnrollment(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name="training_courses")
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name="training_student")
    e_time = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural = "90. Training Enrollment"

    def __str__(self):
        return f"{self.course} - {self.student}"

    def user_course_list(self):
        course_list = models.auth_user.objects.filter(username='admin')
        return course_list




# # Popular Courses
# class PopularCourses(models.Model):
#     course = models.ForeignKey(Course, on_delete=models.CASCADE)
#     rating = models.ForeignKey(CourseRating, on_delete=models.CASCADE)

#     class Meta:
#         verbose_name_plural = "900. Popular Courses"

#     def __str__(self):
#         return f"{self.course.title} - {self.rating.rating}"



# Assignment
class StudentAssignment(models.Model):
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE)
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    detail = models.TextField(null=True)
    student_status = models.BooleanField(default=False, null=True)
    add_time = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural = "55. Student Assignment"

    def __str__(self):
        return f"{self.title}"