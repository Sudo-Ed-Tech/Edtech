import React from "react";
import TrainerSidebar from "./TrainerSidebar";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Swal from 'sweetalert2';
const baseUrl = "http://127.0.0.1:8000/api/elearning";

function AddStudyMaterial() {

  const [studyData, setstudyData] = useState({
    title: "",
    discription:"",
    upload: "",
    remarks: "",
  });

  const handleChange = (event) => {
    setstudyData({
      ...studyData,
      [event.target.name]: event.target.value,
    });
  };

  const handleFileChange = (event) => {
    window.URL = window.URL || window.webkitURL;
    var upload = document.createElement('upload');
    upload.src = URL.createObjectURL(event.target.files[0]);

    setstudyData({
      ...studyData,
      [event.target.name]: event.target.files[0],
    });
  };
  const { course_id } = useParams();
  const submitForm = () => {
    const _FormData = new FormData();
    _FormData.append("course", course_id);
    _FormData.append("title", studyData.title);
    _FormData.append("description", studyData.description);
    _FormData.append("upload", studyData.upload,studyData.upload.name);
    _FormData.append("remarks", studyData.remarks);

    try {
      axios.post(baseUrl + "/study-materials/"+course_id, _FormData, {
          headers: {
            "content-type": "multipart/form-data",
          },
        })
        .then((res) => {
            if(res.status===200 || res.status===201){
                Swal.fire({
                    title:'Data has been added',
                    icon:'success',
                    toast:true,
                    timer: 3000,
                    position:'top-right',
                    timerProgressBar:true,
                    showCancelButton:false
                });
                window.location.reload();
              }
            });
        } catch (error) {
          console.log(error);
        }
      };
 

  return (
    <div className="container-fluid main_container">
      <div className="row">
        <aside className="col-md-2">
          <TrainerSidebar />
        </aside>
        <section className="col-md-9 mt-3">
          <div className="card">
            <h5 className="card-header">Add Study Material</h5>
            <div className="card-body">
              <div className="mb-3">
                <label for="title" className="form-label">Title</label>
                <input onChange={handleChange}name="title"type="text"id="title"className="form-control" />
              </div>
              <div className="mb-3">
                <label for="description" className="form-label"> Description</label>
                <div className="col-sm-10">
                  <textarea onChange={handleChange} name="description"className="form-control" id="description"></textarea>
                </div>
              </div>
              <div className="mb-3">
                <label for="upload" className="form-label">Upload</label>
                <input onChange={handleFileChange}name="upload"type="file"className="form-control" id="upload"/>
                <div className="col-sm-10"></div>
              </div>
              <div className="mb-3">
                <label for="remark" className="form-label">Remarks</label>
                <input  onChange={handleChange} name="remarks"type="text"id="remark" className="form-control"/>
              </div>
              <button type="button" onClick={submitForm}className="btn btn-primary">Add</button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default AddStudyMaterial;
