import React from "react";
import { Link } from "react-router-dom";
import TrainerSidebar from "./TrainerSidebar";
import { useParams } from "react-router-dom";
import {useEffect, useState} from 'react'
import axios from "axios";
import Swal from 'sweetalert2';
const baseUrl='http://127.0.0.1:8000/api/elearning';

function StudyMaterials() {
    const [studyData, setstudyData]=useState([]);
    const [totalResult, settotalResult]=useState([0]);
    const {course_id}=useParams();
    
    useEffect(()=>{
      try{
        axios.get(baseUrl+'/study-materials/'+course_id).then((res)=>{
            setstudyData(res.data);
          settotalResult(res.data.length);
        });
      }catch(error){
        console.log(error)
      }
    },[])

    const downloadFile=(file_url)=>{
      window.location.href=file_url;
    }
    
    const handleDeleteClick =(study_id)=>{
        Swal.fire({
            title:'Confirm',
            text: 'Are your sure you want to delete this data?',
            icon: 'info',
            confirmButtonText: 'Continue',
            showCancelButton: true
        }).then((result)=>{
            if(result.isConfirmed){
              try{
                axios.delete(baseUrl+'/study-material/'+study_id).then((res)=>{
                  Swal.fire('succcess','Data has been deleted.');
                  try{
                    axios.get(baseUrl+'/study-materials/'+course_id).then((res)=>{
                      settotalResult(res.data.length);
                      setstudyData(res.data);
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
            <h5 className="card-header">All Study Materials ({totalResult}) <Link  to={`/add-study/`+course_id} className="btn btn-success btn-sm ms-2 float-end">Add Study Material</Link></h5>
            <div className="card-body">
            <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>File</th>
                    <th>Remarks</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {studyData.map((row, index)=>
                  <tr>
                    <td>{row.title}</td>
                    <td>
                      <button className="btn btn-outline-primary" onClick={()=>downloadFile(row.upload)}>Download File</button>
                    </td>
                    <td>{row.remarks}</td>
                    <td>
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
export default StudyMaterials;
