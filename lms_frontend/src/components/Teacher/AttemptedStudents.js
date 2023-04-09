import React from "react";
import { useParams } from "react-router-dom";
import TrainerSidebar from "./TrainerSidebar";
import { useEffect, useState } from "react";
import axios from "axios";
import QuizResult from './QuizResult';

const baseUrl = "http://127.0.0.1:8000/api/elearning";

function AttemptedStudents() {
  const [studentData, setstudentData] = useState([]);
  const {quiz_id}=useParams();

  useEffect(() => {
    try {
      axios.get(baseUrl + "/attempted-quiz/"+quiz_id).then((res) => {
        setstudentData(res.data);
      });
    } catch (error) {
      console.log(error);
    }


    
  },[]);

  return (
    <div className="container-fluid main_container">
      <div className="row">
        <aside className="col-md-2"><TrainerSidebar /></aside>
        <div className="col-md-9 mt-3">
          <div className="card">
          <h5 className="card-header fs-4">Student List</h5>
            <div className="card-body">
              <table className="table table-bordered">
                <thead>
                  <tr className="text-center">
                    <th>Name</th>
                    <th>Email</th>
                    <th>Username</th>
                    <th>Result</th>
                  </tr>
                </thead>
                <tbody>
                  {studentData.map((row, index) =>  
                  
                    <tr>
                      <td>
                        {row.student.full_name}
                      </td>
                      <td>
                        {row.student.email}
                      </td>
                      <td>
                        {row.student.username}
                      </td>
                      <td>
                        <button type="button" class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target={`#resultModal${row.id}`}>
                            Quiz Result
                        </button>
                        <div className="modal fade" id={`resultModal${row.id}`} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                          <QuizResult quiz={row.quiz.id} student={row.student.id}/>
                        </div>
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
export default AttemptedStudents;
