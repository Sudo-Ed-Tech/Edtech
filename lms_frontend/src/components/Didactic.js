import React from "react";
import Header from "./Header";
import Home from "./Home";
import Footer from "./Footer";
import { Routes as Switch, Route } from "react-router-dom";

//All Courese
import AllCourses from "./AllCourses";
import PopularCourses from "./PopularCourses";
import PopularTeachers from "./PopularTeachers";
import CategoryCourses from "./CategoryCourses";
import CourseDetail from "./CourseDetail";
import Search from "./Search";
import TeacherDetail from "./TeacherDetail";

//Teacher
import TeacherDashboard from "./Teacher/TeacherDashboard";
import TeacherCourses from "./Teacher/TeacherCourses";
import TeacherProfileSetting from "./Teacher/TeacherProfileSetting";
import TeacherChnagePassword from "./Teacher/TeacherChangePassword";
import AddCourse from "./Teacher/AddCourse";
import UserList from "./Teacher/UserList";
import AddAssignment from "./Teacher/AddAssignment";
import ShowAssignment from "./Teacher/ShowAssignment";
import TeacherLogout from "./Teacher/TeacherLogout";
import AddChapter from "./Teacher/AddChapter";
import CourseChapter from "./Teacher/CourseChapter";
import EditChapter from "./Teacher/EditChapter";
import EditCourse from "./Teacher/EditCourse";
import TeacherSkillsCategory from "./TeacherSkillsCategory";
import EnrolledStudents from "./Teacher/EnrolledStudents";

//Teacher Dashboard: quiz
import AddQuiz from "./Teacher/AddQuiz";
import AllQuiz from "./Teacher/AllQuiz";
import QuizQuestions from "./Teacher/QuizQuestions";
import EditQuiz from "./Teacher/EditQuiz";
import AddQuizQuestion from "./Teacher/AddQuizQuestion";
import AssignQuiz from "./Teacher/AssignQuiz";
import AttemptedStudents from "./Teacher/AttemptedStudents";

//course study material
import StudyMaterials from "./Teacher/StudyMaterials";
import AddStudyMaterial from "./Teacher/AddStudyMaterial";

//User Dashboard Quiz
import CourseQuizLst from "./User/CourseQuizLst";
import TakeQuiz from "./User/TakeQuiz";

//Student
import Register from "./User/Register";
import Login from "./User/Login";
import Logout from "./User/Logout";
import Dashboard from "./User/Dashboard";
import MyCourses from "./User/MyCourses";
import FavoriteCourses from "./User/FavoriteCourses";
import RecommendedCourses from "./User/RecommendedCourses";
import StudentAssignments from "./User/StudentAssignments";
import ProfileSetting from "./User/ProfileSetting";
import ChnagePassword from "./User/ChangePassword";
import UserStudyMaterials from "./User/UserStudyMaterials";

//Training
import TrainingDetails from "./Teacher/TrainingDetails";
import EdEnrolledStudents from "./Teacher/EdEnrolledStudents";
import UserTrainingDetails from "./User/UserTrainingDetails";
import TrainingCourses from "./Training/TrainingCourses";
import TrainingCourseDetail from "./Training/TrainingCourseDetail";
import PlayVideo from "./Course/PlayVideo";

//Public Details
import AboutUs from "./Public/AboutUs";
import ContactUs from "./Public/ContactUs";

import TeacherRegister from './Teacher/TeacherRegister';
import TeacherLogin from './Teacher/TeacherLogin';

function Didactic() {
  return (
    <div className="App">
      <Header />

      <Switch>
        <Route path="/" element={<Home />} />
        <Route path="/course-detail/:course_id" element={<CourseDetail />} />
        <Route path="/search/:searchstring" element={<Search />} />

        <Route path="/teacher-detail/:teacher_id" element={<TeacherDetail />} />

        {/* Teacher */}
        <Route path="/teacher-login" element={<TeacherLogin />} />
        <Route path="/teacher-register" element={<TeacherRegister />} />

        {/* Student */}
        <Route path="/user-login" element={<Login />} />
        <Route path="/user-register" element={<Register />} />


        {/*Trainer */}
        <Route path="/teacher-logout" element={<TeacherLogout />} />
        <Route path="/teacher-dashboard/" element={<TeacherDashboard />} />
        <Route path="/teacher-courses" element={<TeacherCourses />} />
        <Route path="/add-course" element={<AddCourse />} />
        <Route path="/edit-course/:course_id" element={<EditCourse />} />
        <Route path="/teacher-users" element={<UserList />} />
        <Route path="/add-assignment/:teacher_id/:student_id" element={<AddAssignment />} />
        <Route path="/show-assignment/:teacher_id/:student_id" element={<ShowAssignment />} />
        <Route path="/my-assignments/" element={<StudentAssignments />} />
        <Route path="/add-quiz" element={<AddQuiz />} />
        <Route path="/add-quiz-questions/:quiz_id" element={<AddQuizQuestion />} />
        <Route path="/assign-quiz/:course_id" element={<AssignQuiz />} />
        <Route path="/quiz" element={<AllQuiz />} />
        <Route path="/edit-quiz/:quiz_id" element={<EditQuiz />} />
        <Route path="/attempted-students/:quiz_id" element={<AttemptedStudents />} />

        <Route path="/course-quiz/:course_id" element={<CourseQuizLst />} />
        <Route path="/take-quiz/:quiz_id" element={<TakeQuiz />} />

        <Route path="/user/study-materials/:course_id" element={<UserStudyMaterials />} />
        <Route path="/study-materials/:course_id" element={<StudyMaterials />} />
        <Route path="/add-study/:course_id" element={<AddStudyMaterial />} />

        <Route path="/all-questions/:quiz_id" element={<QuizQuestions />} />
        <Route path="/add-chapter/:course_id" element={<AddChapter />} />
        <Route path="/all-chapters/:course_id" element={<CourseChapter />} />
        <Route path="/edit-chapter/:chapter_id" element={<EditChapter />} />
        <Route
          path="/teacher-profile-setting"
          element={<TeacherProfileSetting />}
        />
        <Route
          path="/teacher-change-password"
          element={<TeacherChnagePassword />}
        />
        <Route
          path="/enrolled-students/:course_id"
          element={<EnrolledStudents />}
        />

        {/*Student */}
        <Route path="/user-logout" element={<Logout />} />
        <Route path="/user-dashboard" element={<Dashboard />} />
        <Route path="/my-courses" element={<MyCourses />} />
        <Route path="/favorite-courses" element={<FavoriteCourses />} />
        <Route path="/recommended-courses" element={<RecommendedCourses />} />
        <Route path="/profile-setting" element={<ProfileSetting />} />
        <Route path="/change-password" element={<ChnagePassword />} />

        {/* All Courses */}
        <Route path="/all-courses" element={<AllCourses />} />
        <Route path="/popular-courses" element={<PopularCourses />} />
        <Route path="/popular-teachers" element={<PopularTeachers />} />
        <Route path="/category/:category_slug" element={<CategoryCourses />} />
        <Route
          path="/teacher-skill-courses/:skill_name/:teacher_id"
          element={<TeacherSkillsCategory />}
        />

        {/* Traing */}
        <Route path="/training-details/" element={<TrainingDetails />} />
        <Route
          path="/edenrolled-students/:course_id"
          element={<EdEnrolledStudents />}
        />
        <Route
          path="/user-training-details/"
          element={<UserTrainingDetails />}
        />
        <Route path="/training-courses/" element={<TrainingCourses />} />
        <Route
          path="/training-course-detail/:course_id"
          element={<TrainingCourseDetail />}
        />

        {/* Learnig Page */}
        <Route path="/learning-course/:course_id/" element={<PlayVideo />} />

        {/* Public Details */}

        <Route path="/aboutUs" element={<AboutUs />} />
        <Route path="/contactUs" element={<ContactUs />} />
      </Switch>
      <Footer />
    </div>
  );
}

export default Didactic;
