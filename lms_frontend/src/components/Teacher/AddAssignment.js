import React from "react";
import TrainerSidebar from "./TrainerSidebar";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Swal from 'sweetalert2'
const baseUrl = "http://127.0.0.1:8000/api/elearning";

function AddAssignment() {
  

  useEffect(() => {
    document.title = "Add Assignment";
  });

  const [Assignment, setAssignment] = useState({
      title: "",
      detail:"",
  });

  const handleChange = (event) => {
    setAssignment({
      ...Assignment,
      [event.target.name]: event.target.value,
    });
  };

  const handleFileChange = (event) => {
   setAssignment({
      ...Assignment,
      [event.target.name]: event.target.files[0],
    });
  };

  const {student_id}=useParams();
  const {teacher_id}=useParams();

  const submitForm = () => {
    const _FormData = new FormData();
    _FormData.append("teacher", teacher_id);
    _FormData.append("student", student_id);
    _FormData.append("title", Assignment.title);
    _FormData.append("detail", Assignment.detail);

    try {
      axios.post(baseUrl + "/student-assignment/"+teacher_id+"/"+student_id, _FormData, {
          headers: {
            "content-type": "multipart/form-data",
          },
        })
        .then((res) => {
            if(res.status==200 || res.status==201){
               Swal.fire({
                  title: "Assignment has been Added",
                  icon: "Success",
                  toast:"true",
                  timer: 3000,
                  position:'top-right',
                  timerProgressBar:true,
                  showConfirmButton: false
               });
            window.location.reload();
            }
        });
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(cats)

  return (
    <div className="container-fluid main_container">
      <div className="row">
        <aside className="col-md-3">
          <TrainerSidebar />
        </aside>
        <section className="col-md-9 mt-3">
          <div className="card">
            <h5 className="card-header">Add Assignment</h5>
            <div className="card-body">
              <div className="mb-3">
                <label for="title" className="form-label">Title</label>
                <input onChange={handleChange}name="title"type="text"id="title"className="form-control" />
              </div>
              <div className="mb-3">
                <label for="detail" className="form-label">Description</label>
                <div className="col-sm-10">
                  <textarea onChange={handleChange}name="detail"className="form-control"></textarea>
                </div>
              </div>
              <button type="button" onClick={submitForm}className="btn btn-primary">Add</button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default AddAssignment;
