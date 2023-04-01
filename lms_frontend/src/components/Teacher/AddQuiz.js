import { React, useState } from "react";
import TrainerSidebar from "./TrainerSidebar";
import axios from "axios";

const baseUrl = "http://127.0.0.1:8000/api/elearning";

function AddQuiz() {
  
  const [quizData, setquizData] = useState({
    title: "",
    detail: "",
  });

  const handleChange = (event) => {
    setquizData({
      ...quizData,
      [event.target.name]: event.target.value,
    });
  };


  const submitForm = () => {
    const teacherId=localStorage.getItem('teacherId');
    const _FormData = new FormData();
    _FormData.append("teacher", teacherId);
    _FormData.append("title", quizData.title);
    _FormData.append("detail", quizData.detail);

    try {
      axios
        .post(baseUrl + "/quiz/", _FormData, {

        })
        .then((res) => {
          // console.log(res.data);
          window.location.href = "/add-quiz/";
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
        <section className="col-md-7 mt-3">
          <div className="card">
            <h5 className="card-header">Add Quiz</h5>
            <div className="card-body">
              {/* <div className="mb-3">
                <label for="title" className="form-label">Teacher</label>
                <select name="teacher"  className="form-control">
                  {teachers.map((teacher, index) => {return (<option key={index} value={teacher.id}>{teacher.full_name}</option>)})}
                </select>
              </div> */}
              <div className="mb-3">
                <label for="title" className="form-label">
                  Title
                </label>
                <div className="col-sm-10">
                  <input
                    onChange={handleChange}
                    name="title"
                    type="text"
                    className="form-control"
                    id="staticEmail"
                  />
                </div>
              </div>
              <div className="mb-3">
                <label for="description" className="form-label">
                  {" "}
                  Detail{" "}
                </label>
                <div className="col-sm-10">
                  <textarea
                    onChange={handleChange}
                    name="detail"
                    className="form-control"
                  ></textarea>
                </div>
              </div>
              <button
                type="button"
                onClick={submitForm}
                className="btn btn-primary"
              >
                Add
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default AddQuiz;
