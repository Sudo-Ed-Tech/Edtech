import React from "react";
import TrainerSidebar from "./TrainerSidebar";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

const baseUrl = "http://127.0.0.1:8000/api/elearning";

function EditQuiz() {
  const [quizData, setquizData] = useState({
    title: "",
    detail: "",
  });

  const teacherId=localStorage.getItem('teacherId');
  const {quiz_id}=useParams();
  useEffect(() => {
    //fetch current quiz data
    try {
      axios.get(baseUrl + "/teacher-quiz-detail/"+quiz_id).then((res) => {
        setquizData({
          title: res.data.title,
          detail: res.data.detail,
        });
      });
    } catch (error) {
      console.log(error)
    }
  }, []);

  const handleChange = (event) => {
    setquizData({
      ...quizData,
      [event.target.name]: event.target.value,
    });
  };


  const submitForm = () => {
    const _FormData = new FormData();
    _FormData.append("teacher", teacherId);
    _FormData.append("title", quizData.title);
    _FormData.append("detail", quizData.detail);
    try {
      axios
        .put(baseUrl + "/teacher-quiz-detail/"+quiz_id, _FormData, {
          headers: {
            "content-type": "multipart/form-data",

          },
        })
        .then((res) => {
          if(res.status===200){
            Swal.fire({
                title:'Data has been updated',
                icon:'success',
                toast:true,
                timer: 3000,
                position:'top-right',
                timerProgressBar:true,
                showCancelButton:false
            });
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
        <aside className="col-md-2"> <TrainerSidebar /></aside>
        <section className="col-md-9  mt-3">
          <div className="card">
            <h5 className="card-header">Edit Quiz</h5>
            <div className="card-body">
              <div className="mb-3">
                <label for="title" className="form-label">Title</label>
                <div className="col-sm-10">
                  <input value={quizData.title} onChange={handleChange} name="title" type="text" className="form-control" id="staticEmail" />
                </div>
              </div>
              <div className="mb-3">
                <label for="description" className="form-label"> Detail </label>
                <div className="col-sm-10">
                  <textarea value={quizData.detail} onChange={handleChange} name="detail" className="form-control"></textarea>
                </div>
              </div>
              <button type="button"onClick={submitForm} className="btn btn-primary"> Update </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default EditQuiz;
