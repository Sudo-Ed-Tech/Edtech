import React from 'react';
import {Link, useParams} from 'react-router-dom'
import UserSidebar from './UserSidebar';
import {useEffect, useState} from 'react'
import axios from 'axios';

const baseUrl = 'http://127.0.0.1:8000/api';

function UserTrainingDetails(){
        
    //Fetch training details
    const [trainingData, settrainingData] = useState([]);
    const teacherId=localStorage.getItem("teacherId")
    useEffect(() => {
        try {
        axios.get(baseUrl + "/training-details-teacher/"+teacherId).then((res) => {
            // console.log(res)
            settrainingData(res.data);
        });
        } catch (error) {
        console.log(error);
        }
    }, []);


    //Meeting redirection
    const RedMeeting = ()=>{
      {trainingData.map((meeting, index)=>(
        window.location.href=meeting.meeting_link
      ))
      }
  }

    return(
      <div className="container-fluid main_container">
      <div className="row">
        <aside className="col-md-3"><UserSidebar /></aside>
        <div className="col-md-7 mt-3">
        <h5 className="pb-1 mb-4 fs-4">Training Details</h5>
          <div className='row'>
            {trainingData.map((training, index) => (
            <div className='col-4 mb-4'>
            <div className="card">
            <Link to={`/course-detail/${training.course.id}`}>
              <img src={training.course.featured_img} className="card-img-top" width={300} height={300} alt={training.course.title} />
            </Link>
            <div className="card-body">
              <h5 className="card-title">
              <p>Course: <Link to={`/course-detail/${training.course.id}`}> {training.course.title}</Link></p>
              </h5>
              <p>Date: {training.date}</p>
              <p>Time: {training.f_time} to {training.t_time}</p>
              <p>Trainer: <Link to={`/teacher-detail/`+training.teacher.id}>{training.teacher.full_name}</Link></p>
              <button target="_blank" className='btn btn-primary' onClick={RedMeeting}>Join meeting</button>
            </div>
          </div>
          </div>
          ))}
          </div>
        </div>
      </div>
    </div>
    )
}

export default UserTrainingDetails;