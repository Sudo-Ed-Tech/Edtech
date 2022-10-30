import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UserSidebar from "./UserSidebar";
import axios from "axios";

const baseUrl = 'http://127.0.0.1:8000/api/elearning'

function RecommendedCourses() {
  const [courseData, setcourseData]=useState([]);
  const studentId =localStorage.getItem('studentId');

  //Fetching courses enrolled by student
  useEffect(()=>{
    try{
      axios.get(baseUrl+'/fetch-enrolled-courses/'+studentId).then((res)=>{
        setcourseData(res.data);
      })
    }catch(e){
      console.log(e);
    }
  })

  return (
    <div className="container-fluid main_container">
      <div className="row">
        <aside className="col-md-3 ms-"><UserSidebar /></aside>
        <div className="col-md-7 mt-3">
        <h5 className="pb-1 mb-4">Recommended Courses</h5>
        <div className="row">
            {courseData.map((row, index) => (
                <div className="col-4 mb-4">
                  <div className="card">
                    <Link to={`/course-detail/${row.course.id}`}>
                      <img
                        src={row.course.featured_img}
                        className="card-img-top"
                        width={200}
                        height={150}
                        alt={row.course.title}
                      />
                    </Link>
                    <hr />
                    <div className="card-body">
                      <h5 className="card-title">
                        <Link to={`/course-detail/${row.course.id}`}>{row.course.title}</Link>
                      </h5>
                      <p>Description:&nbsp;&nbsp;{row.course.description}</p>
                    </div>
                    <div className="card-footer">
                      <div className="title">
                        <span>Rating: {row.course.course_rating}</span>
                        <span className="float-end">Enrolled:&nbsp;&nbsp;{row.course.total_enrolled_students}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
export default RecommendedCourses;
