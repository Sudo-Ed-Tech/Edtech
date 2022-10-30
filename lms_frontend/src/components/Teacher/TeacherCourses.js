import React from "react";
import { Link } from "react-router-dom";
import TrainerSidebar from "./TrainerSidebar";
import { useEffect, useState } from "react";
import axios from "axios";

const baseUrl = "http://127.0.0.1:8000/api/training";

function TeacherCourses() {
  const [courseData, setCourseData] = useState([]);
  const teacherId = localStorage.getItem("teacherId");
  const [totalResult, settotalResult]=useState([0]);
  // console.log(teacherId);

  useEffect(() => {
    try {
      axios.get(baseUrl + "/teacher-course/" + teacherId).then((res) => {
        setCourseData(res.data);
        settotalResult(res.data.length);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  //console.log(courseData)

  return (
    <div className="container-fluid main_container">
      <div className="row">
        <aside className="col-md-2"><TrainerSidebar /></aside>
        <div className="col-md-9 mt-3">
          <div className="card">
          <h5 className="card-header fs-4">All Courses ({totalResult}) <Link  to={`/add-course`} className="btn btn-success btn-sm ms-2 float-end fs-5">Add Course</Link></h5>
            <div className="card-body">
              <table className="table table-bordered">
                <thead>
                  <tr className="text-center">
                    <th>Name</th> <th>Image</th><th>Enrolled</th> <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {courseData.map((course, index) => (
                    <tr>
                      <td>
                        <Link to={`/all-chapters/` + course.id}><b>{course.title}</b></Link>
                        <hr />
                        {course.course_rating &&
                        <span >Rating: {course.course_rating}/5</span>
                        }
                        {!course.course_rating &&
                        <span>Rating: 0/5</span>
                        }
                        
                      </td>
                      <td className="text-center">
                        <img src={course.featured_img} width={150} height={80} alt={course.title}/>
                      </td>
                      <td className="text-center">
                        <Link to={`/enrolled-students/` + course.id}>{course.total_enrolled_students}</Link>
                      </td>
                      <td className="text-center" >
                        <Link className="btn btn-info text-white px-4  btn-sm active " to={`/edit-course/` + course.id}> <i className="bi bi-pencil-square"></i></Link>
                        <Link className="btn btn-success ms-2 btn-sm active " to={`/add-chapter/` + course.id}>Add Chapter</Link>
                        <button className="btn btn-danger btn-sm ms-2 px-4  active"><i className="bi bi-trash"></i></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default TeacherCourses;
