import React from "react";
import { Link } from "react-router-dom";
import TrainerSidebar from "./TrainerSidebar";
import { useParams } from "react-router-dom";
import {useEffect, useState} from 'react'
import axios from "axios";
import Swal from 'sweetalert2';
const baseUrl='http://127.0.0.1:8000/api';

function CourseChapter() {
    const [chapterData, setchapterData]=useState([]);
    const [totalResult, settotalResult]=useState([0]);
    const {course_id}=useParams();
    const {chapter_id}=useParams();
    
    // console.log(teacherId);
  
    useEffect(()=>{
      try{
        axios.get(baseUrl+'/course-chapters/'+course_id).then((res)=>{
          setchapterData(res.data);
          settotalResult(res.data.length);
        });
      }catch(error){
        console.log(error)
      }
    },[])
    
    const handleDelete =()=>{
        Swal.fire({
            title:'Confirm',
            text: 'Are your sure you want to delete this chapter',
            icon: 'confirm',
            confirmButtonText: 'Continue',
            showCancelButton: true
        })
    }


    //Download File
    const NoteFile = ()=>{
      {chapterData.map((chapter, index)=>(
        window.location.href=chapter.note_file
      ))
      }
  }
    return(
        <div className="container-fluid main_container">
      <div className="row">
        <aside className="col-md-2">
          <TrainerSidebar />
        </aside>
          <div className="col-md-10  mt-3">
          <div className="card">
            <h5 className="card-header">All Chapters ({totalResult}) <Link  to={`/add-chapter/`+course_id} className="btn btn-success btn-sm ms-2 float-end">Add Chapter</Link></h5>
            <div className="card-body">
            <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Vidoe</th>
                    <th>Note</th>
                    <th>Remarks</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {chapterData.map((chapter, index)=>
                  <tr>
                    <td><Link to={`/edit-chapter/`}>{chapter.title}</Link></td>
                    <td>
                        <video controls width="250">
                            <source src={chapter.video} type="video/mp4" />
                            Sorry your browser dosen't support emedded video.
                        </video>

                    </td>
                    <td>
                      <button onClick={NoteFile} className="btn btn-primary">Chapter Note</button>
                    </td>
                    <td>{chapter.remarks}</td>
                    <td>
                        <Link to={`/edit-chapter/`+chapter.id} className="btn btn-info btn-sm px-4 text-white active"><i className="bi bi-pencil-square"></i></Link>
                        <button onClick={handleDelete} className="btn btn-danger btn-sm ms-2  px-4 text-white  active"><i className="bi bi-trash"></i></button>
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
export default CourseChapter;
