import React from 'react';
import {Link, useParams} from 'react-router-dom'
import TrainerSidebar from './TrainerSidebar';
import {useEffect, useState} from 'react'
import axios from 'axios';

const baseUrl = 'http://127.0.0.1:8000/api/training';

function TrainingDetails(){
        
    //Fetch training details
    const [trainingData, settrainingData] = useState([]);
    const teacherId = localStorage.getItem("teacherId");
    useEffect(() => {
        try {
        axios.get(baseUrl + "/trainer-training-details/"+teacherId).then((res) => {
            console.log(res.data)
            settrainingData(res.data);
        });
        } catch (error) {
        console.log(error);
        }
    }, []);


    //Fetch enrolled student
    const [courseData, setCourseData] = useState([]);
    useEffect(() => {
        try {
        axios.get(baseUrl + "/training-courses/" ).then((res) => {
            setCourseData(res.data);
        });
        } catch (error) {
        console.log(error);
        }
    }, []);

      //Meeting Redirection
      const RedMeeting = ()=>{
        {trainingData.map((meeting, index)=>(
          window.location.href=meeting.meeting_link
        ))
        }
    }

    return(
        <div className="container-fluid main_container">
      <div className="row">
        <aside className="col-md-2 "><TrainerSidebar /></aside>
        <div className="col-md-7 mt-5">
          <div className="card">
            <h5 className="card-header">Trainer Utilization</h5>
            <div className="card-body">
              <table className="table table-bordered">
                <thead>
                  <tr className='text-center'>
                    <th>Course</th>
                    <th>Date</th>
                    <th>From</th>
                    <th>To</th>
                  </tr>
                </thead>
                {trainingData.map((training, index) => (
                <tbody >
                    <tr>
                        <td>
                            <Link to={`/training-course-detail/`+training.training_course.id}>{training.training_course.title}</Link>
                        </td>
                        <td className='text-center'>
                            {training.date}
                            </td>
                        <td className='text-center'>
                            {training.f_time}
                        </td>
                        <td className='text-center'>
                            {training.t_time}
                        </td>
                        
                        {/* <td className='text-center'>
                        {courseData.map((course, index) => (
                            <Link to={`/edenrolled-students/`+course.id}>{course.total_enrolled_student}</Link>
                        ))}
                        </td> */}
                    </tr>
                </tbody>
                ))}  
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    )
}

export default TrainingDetails;