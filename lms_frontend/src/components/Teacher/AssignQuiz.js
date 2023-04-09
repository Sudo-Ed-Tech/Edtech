import React from "react";
import { Link, useParams } from "react-router-dom";
import TrainerSidebar from "./TrainerSidebar";
import { useEffect, useState } from "react";
import axios from "axios";
import CheckQuizinCourse from './CheckQuizinCourse';
import Swal from 'sweetalert2';

const baseUrl = "http://127.0.0.1:8000/api/elearning";

function AllQuiz() {
  const [quizData, setquizData] = useState([]);
  const [courseData, setcourseData] = useState([]);
  const teacherId = localStorage.getItem("teacherId");
  const {course_id}=useParams();

  useEffect(() => {
    try {
      axios.get(baseUrl + "/teacher-quiz/" + teacherId).then((res) => {
        setquizData(res.data);
      });
    } catch (error) {
      console.log(error);
    }


    try{
      axios.get(baseUrl+'/course/'+course_id).then((res)=>{
        console.log(res);
        setcourseData(res.data);
      });
    }catch(error){
      console.log(error)
    }
  },[]);

  return (
    <div className="container-fluid main_container">
      <div className="row">
        <aside className="col-md-2"><TrainerSidebar /></aside>
        <div className="col-md-9 mt-3">
          <div className="card">
          <h5 className="card-header fs-4">Assign Quiz <span className="text-primary">{courseData.title}</span></h5>
            <div className="card-body">
              <table className="table table-bordered">
                <thead>
                  <tr className="text-center">
                    <th>Name</th> <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {quizData.map((row, index) =>  
                  
                    <tr>
                      <td>
                        <Link to={`/all-questions/`+row.id}><b>{row.title}</b></Link>
                        
                      </td>
                      <td>
                        <CheckQuizinCourse quiz={row.id} course={course_id}/>
                      </td>
                    </tr>
                    
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default AllQuiz;
