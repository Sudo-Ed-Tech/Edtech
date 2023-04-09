import React from "react";
import { Link } from "react-router-dom";
import UserSidebar from "./UserSidebar";
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
        axios.get(baseUrl+'/user/study-materials/'+course_id).then((res)=>{
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
    
    return(
        <div className="container-fluid main_container">
      <div className="row">
        <aside className="col-md-2">
          <UserSidebar />
        </aside>
          <div className="col-md-10  mt-3">
          <div className="card">
            <h5 className="card-header">All Study Materials ({totalResult}) </h5>
            <div className="card-body">
            <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Detail</th>
                    <th>File</th>
                    <th>Remarks</th>
                  </tr>
                </thead>
                <tbody>
                  {studyData.map((row, index)=>
                  <tr>
                    <td>{row.title}</td>
                    <td>{row.description}</td>
                    <td>
                        <button className="btn btn-outline-primary" onClick={()=>downloadFile(row.upload)}>Download File</button>
                    </td>
                    <td>{row.remarks}</td>
                    
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
