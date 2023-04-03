import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UserSidebar from "./UserSidebar";
import axios from "axios";
import Swal from "sweetalert2";
const baseUrl = 'http://127.0.0.1:8000/api/elearning'


function StudentAssignments() {
  const [AssignmentData, setAssignmentData]=useState([]);
  const [AssignmentStatus, setAssignmentStatus]=useState('');
  const studentId= localStorage.getItem('studentId')
  

  useEffect(() => {
    try {
      axios.get(baseUrl + "/my-assignments/"+studentId).then((res) => {
        setAssignmentData(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleFileChange = (event) => {
    setAssignmentData({
      ...AssignmentData,
      [event.target.name]: event.target.doc_file[0],
    });
  };

  const markAsDone=(assignment_id)=>{
    const _FormData = new FormData();
    _FormData.append("student_status", true);
    _FormData.append("title", AssignmentData.title);
    _FormData.append("detail", AssignmentData.detail);
    // _FormData.append("doc_file",AssignmentData.doc_file);
    _FormData.append("student", AssignmentData.student);
    _FormData.append("teacher", AssignmentData.teacher);

    try {
      axios.put(baseUrl + "/update-assignments/"+assignment_id, _FormData, {
          headers: {
            "content-type": "multipart/form-data",
 
          },
        }).then((res) => {
          if(res.status===200 || res.status===201){
            window.location.reload();
          }  
          
        });
    } catch (error) {
      console.log(error);
    }
  };

  

  return (
    <div className="container-fluid">
      <div className="row">
        <aside className="col-md-3"><UserSidebar /></aside>
        <section className="col-md-9">
            <div className="card">
                <h5 className="card-header">My Assignments</h5>
                <div className='card-body'>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Detail</th>
                                <th>Teacher</th>
                                {/* <th>Upload Document</th> */}
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {AssignmentData.map((row,index)=>
                            <tr>
                                <td>{row.title}</td>
                                <td>{row.detail}</td>
                                <td><Link to={`/teacher-detail/`+row.teacher.id}>{row.teacher.full_name}</Link></td>
                                {/* <td>
                                  <input onChange={handleFileChange} name="doc_file"type="file" className="form-control"/>
                                </td> */}
                                <td>
                                    {row.student_status==false &&
                                        <button onClick={()=>markAsDone(row.id,row.title,row.detail,row.doc_file,row.student.id,row.teacher.id)} className="btn btn-success btn-sm">Mark as Done</button>
                                    }
                                    {row.student_status==true &&
                                        <span class="badge bg-primary">Completed</span>
                                    }
                                </td>
                            </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
      </div>
    </div>
  );
}
export default StudentAssignments;
