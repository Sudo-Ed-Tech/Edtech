import React from "react";
import { Link } from "react-router-dom";
import TrainerSidebar from "./TrainerSidebar";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from 'sweetalert2';

const baseUrl = "http://127.0.0.1:8000/api/elearning";

function AllQuiz() {
  const [quizData, setquizData] = useState([]);
  const teacherId = localStorage.getItem("teacherId");
  const [totalResult, settotalResult]=useState([0]);

  useEffect(() => {
    try {
      axios.get(baseUrl + "/teacher-quiz/" + teacherId).then((res) => {
        setquizData(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  //console.log(courseData)

  const handleDeleteClick =(quiz_id)=>{
    Swal.fire({
        title:'Confirm',
        text: 'Are your sure you want to delete this Data?',
        icon: 'info',
        confirmButtonText: 'Continue',
        showCancelButton: true
    }).then((result)=>{
      if(result.isConfirmed){
        try{
          axios.delete(baseUrl+'/quiz/'+quiz_id).then((res)=>{
            Swal.fire('succcess','Data has been deleted.');
            try{
              axios.get(baseUrl+'/teacher-quiz/'+teacherId).then((res)=>{
                settotalResult(res.data.length);
                setquizData(res.data);
              });
            }catch(error){
              console.log(error);
            }
          });
        }catch(error){
          Swal.fire('error','Data has not been deleted!!');
        }
      }else{
        Swal.fire('error','Data has not been deleted!!');
      }
    });
}

  return (
    <div className="container-fluid main_container">
      <div className="row">
        <aside className="col-md-2"><TrainerSidebar /></aside>
        <div className="col-md-9 mt-3">
          <div className="card">
          <h5 className="card-header fs-4">All Quiz </h5>
            <div className="card-body">
              <table className="table table-bordered">
                <thead>
                  <tr className="text-center">
                    <th>Name</th> <th>Total Questions</th> <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {quizData.map((row, index) => (
                    <tr>
                      <td>
                        <Link to={`/all-questions/`+row.id}><b>{row.title}</b></Link>
                        <hr />
                      </td>
                      <td className="text-center">
                        <Link to="#">123</Link>
                      </td>
                      <td className="text-center" >
                        <Link className="btn btn-info text-white px-4  btn-sm active " to={`/edit-quiz/`+row.id}> <i className="bi bi-pencil-square">Edit</i></Link>
                        <Link className="btn btn-success ms-2 btn-sm active " to={`/add-quiz-questions/` + row.id}>Add Questions</Link>
                        <button onClick={()=>handleDeleteClick(row.id)} className="btn btn-danger btn-sm ms-2 px-4  active"><i className="bi bi-trash">Delete</i></button>
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
export default AllQuiz;
