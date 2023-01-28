import React from "react";
import { Link } from "react-router-dom";
import TrainerSidebar from "./TrainerSidebar";
import { useParams } from "react-router-dom";
import {useEffect, useState} from 'react'
import axios from "axios";
import Swal from 'sweetalert2';
const baseUrl='http://127.0.0.1:8000/api/elearning';

function ShowAssignment() {
    const [Assignment, setAssignment]=useState([]);
    const [totalResult, settotalResult]=useState([0]);

    const {student_id}=useParams();
    const {teacher_id}=useParams();
    
    // console.log(teacherId);
    useEffect(()=>{
      try{
        axios.get(baseUrl+'/student-assignment/'+teacher_id+"/"+student_id).then((res)=>{
          setAssignment(res.data);
          settotalResult(res.data.length);
          // setCourseData(res.data.course)
          console.log(res.data)
        });
      }catch(error){
        console.log(error)
      }
    },[])
    
      
    return(
        <div className="container-fluid main_container">
      <div className="row">
        <aside className="col-md-2">
          <TrainerSidebar />
        </aside>
          <div className="col-md-10  mt-3">
          <div className="card">
            <h5 className="card-header">All Assignment ({totalResult}) <Link  to={`/add-assignment/${teacher_id}/${student_id}`} className="btn btn-success btn-sm ms-2 float-end">Add Assignment</Link></h5>
            <div className="card-body">
            {/* <h3 className="fs-4">{chapterData.course.title}</h3> */}
            <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Student status</th>
                  </tr>
                </thead>
                <tbody>
                  {Assignment.map((row, index)=>
                  <tr>
                    <td>{row.title}</td>
                    <td>
                        {row.student_status==false &&
                            <span class="badge bg-warning">Pending</span>                      
                            }
                        {row.student_status==true &&
                            <span class="badge bg-success">Completed</span>
                        }
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
    )
}
export default ShowAssignment;
