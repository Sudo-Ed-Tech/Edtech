import React from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import {useEffect, useState} from 'react'
import axios from "axios";
const baseUrl='http://127.0.0.1:8000/api/elearning';
function TeacherDetail() {

  const [courseData, setcourseData]=useState([]);
  const [teacherData, setteacherData]=useState([]);
  const [skilListData, setskilListData]=useState([]);
  let { teacher_id } = useParams();


  useEffect(()=>{
    try{
      axios.get(baseUrl+'/teacher/'+teacher_id).then((res)=>{
        setcourseData(res.data.teacher_courses);
        setteacherData(res.data);
        setskilListData(res.data.skill_list)
      });
    }catch(error){
      console.log(error)
    }
  },[])

  return (
    <div className="container mt-3 ">
      <div className="row">
        <div className="col-4">
          <img src="/logo512.png" className="img-thumbnail" alt="Teacher-Img" />
        </div>
        <div className="col-8">
          <h3>{teacherData.full_name}</h3>
          <p>{teacherData.details}
          </p>
          <p className="fw-bold">
            Skills:&nbsp;
            {skilListData.map((skill, index)=>
              <>
                <Link to={`/teacher-skill-courses/${skill.trim()}/${teacherData.id}`} className="badge badge-pill bg-warning mx-1">{skill.trim()}</Link>&nbsp;
              </>
            )}
          </p>
          <p className="fw-bold">
            Recent Course: <Link to="/teacher-detail/1">IoT Security</Link>
          </p>
          <p className="fw-bold">Rating: 4/5</p>
        </div>
      </div>
      {/* Course Videos */}
      <div className="card mt-4">
        <h5 className="card-header">Created Courses</h5>
        <div className="list-group list-group-flush">
          {courseData.map((course, index)=>
          <Link
            to={`/course-detail/${course.id}`}
            className="list-group-item list-group-item-action"
          >
            {course.title}
          </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default TeacherDetail;
