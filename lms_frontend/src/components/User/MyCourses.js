import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UserSidebar from "./UserSidebar";
import axios from "axios";

const baseUrl = 'http://127.0.0.1:8000/api/elearning'


function MyCourses() {
  const [courseData, setcourseData]=useState([]);
  const studentId= localStorage.getItem('studentId')
  

  useEffect(() => {
    try {
      axios.get(baseUrl + "/fetch-enrolled-courses/"+studentId).then((res) => {
        setcourseData(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className="container-fluid main_container">
      <div className="row">
        <aside className="col-md-3"><UserSidebar /></aside>
        <div className="col-md-7 mt-3">
        <h5 className="pb-1 mb-4 fs-4">My Courses</h5>
          <div className='row'>
            {courseData.map((row,index)=>
            <div className='col-4 mb-4'>
            <div className="card">
              <Link to={`/course-detail`}>
                <img src={row.course.featured_img} className="card-img-top" width={200} height={150} alt={row.course.title} />
              </Link>
              <hr/>
              <div className="card-body">
                <h5 className="card-title">
                <p><Link to={`/course-detail/`+row.course.id}>{row.course.title}</Link></p>
                </h5>
                <p><b>Course By:&nbsp;&nbsp; </b><Link to={`/teacher-detail/`+row.course.teacher.id}>{row.course.teacher.full_name}</Link></p>
                <p><b>Description:&nbsp;&nbsp; </b>{row.course.description}<Link to={`/course-detail/`+row.course.id}>..more</Link></p>
                <p><b>Course Quiz: </b><Link to={`/course-quiz/`+row.course.id} className="btn btn-sm btn-warning" >Quiz List</Link></p>
                <p><b>Study Material: </b><Link className="btn btn-primary ms-2 btn-sm active " to={`/user/study-materials/` + row.course.id}>Study Material</Link></p>
                <hr/>
                <button className='btn btn-success' ><Link to={`/course-detail/`+row.course.id} style={{ textDecoration: 'none' ,color:"white"}}>Start</Link></button>
                <button className='btn btn-danger ms-5 ' >Remove</button>
              </div>
            </div>
          </div>
          )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default MyCourses;
