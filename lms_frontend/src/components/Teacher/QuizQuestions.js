import React from "react";
import { Link } from "react-router-dom";
import TrainerSidebar from "./TrainerSidebar";
import { useParams } from "react-router-dom";
import {useEffect, useState} from 'react'
import axios from "axios";
import Swal from 'sweetalert2';
const baseUrl='http://127.0.0.1:8000/api/elearning';

function QuizQuestions() {
    const [questionData, setquestionData]=useState([]);
    const [totalResult, settotalResult]=useState([0]);
    const {quiz_id}=useParams();
    
    // console.log(teacherId);
    useEffect(()=>{
      try{
        axios.get(baseUrl+'/quiz-questions/'+quiz_id).then((res)=>{
            
          settotalResult(res.data.length);
          setquestionData(res.data);
        });
      }catch(error){
        console.log(error)
      }
    },[])
    
    const handleDeleteClick =(question_id)=>{
        Swal.fire({
            title:'Confirm',
            text: 'Are your sure you want to delete this Data?',
            icon: 'info',
            confirmButtonText: 'Continue',
            showCancelButton: true
        }).then((result)=>{
          if(result.isConfirmed){
            try{
              axios.delete(baseUrl+'/question/'+question_id).then((res)=>{
                Swal.fire('succcess','Data has been deleted.');
                try{
                  axios.get(baseUrl+'/quiz-questions/'+quiz_id).then((res)=>{
                    setquestionData(res.data);
                    settotalResult(res.data.length);
                    
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

    return(
        <div className="container-fluid main_container">
      <div className="row">
        <aside className="col-md-2">
          <TrainerSidebar />
        </aside>
          <div className="col-md-10  mt-3">
          <div className="card">
            <h5 className="card-header">All Questions ({totalResult}) <Link  to={`/add-quiz-questions/`+quiz_id} className="btn btn-success btn-sm ms-2 float-end">Add Question</Link></h5>
            <div className="card-body">
            {/* <h3 className="fs-4">{chapterData.course.title}</h3> */}
            <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Question</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {questionData.map((row, index)=>
                  <tr>
                    <td><Link to={`/edit-question/`+row.id}>{row.questions}</Link></td>
                    <td>
                        <Link to={`/edit-question/`+row.id} className="btn btn-info btn-sm px-4 text-white active"><i className="bi bi-pencil-square"></i></Link>
                        <button onClick={()=>handleDeleteClick(row.id)} className="btn btn-danger btn-sm ms-2  px-4 text-white  active"><i className="bi bi-trash"></i></button>
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
export default QuizQuestions;
