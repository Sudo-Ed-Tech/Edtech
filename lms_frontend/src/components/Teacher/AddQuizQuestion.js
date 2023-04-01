import React from "react";
import TrainerSidebar from "./TrainerSidebar";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
const baseUrl = "http://127.0.0.1:8000/api/elearning";

function AddQuizQuestion() {
  
  const [questionData, setquestionData] = useState({
    quiz: "",
    questions: "",
    ans1: "",
    ans2: "",
    ans3:"",
    ans4: "",
    right_ans:"",
  });

  const handleChange = (event) => {
    setquestionData({
      ...questionData,
      [event.target.name]: event.target.value,
    });
  };

  const { quiz_id } = useParams();
  const submitForm = () => {
    const _FormData = new FormData();
    _FormData.append("quiz", quiz_id);
    _FormData.append("questions", questionData.questions);
    _FormData.append("ans1", questionData.ans1);
    _FormData.append("ans2", questionData.ans2);
    _FormData.append('ans3',questionData.ans3);
    _FormData.append("ans4", questionData.ans4);
    _FormData.append("right_ans", questionData.right_ans);

    try {
      axios.post(baseUrl + "/quiz-questions/"+quiz_id, _FormData, {
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
  // console.log(cats)

  return (
    <div className="container-fluid main_container">
      <div className="row">
        <aside className="col-md-2">
          <TrainerSidebar />
        </aside>
        <section className="col-md-9 mt-3">
          <div className="card">
            <h5 className="card-header">Add Question</h5>
            <div className="card-body">
              {/* <div className="mb-3">
                <label for="title" className="form-label">Quiz</label>
                <input onChange={handleChange}name="quiz"type="text"className="form-control" />
              </div> */}
              <div className="mb-3">
                <label for="title" className="form-label">Questions</label>
                <input onChange={handleChange}name="questions"type="text"className="form-control" />
              </div>
              <div className="mb-3">
                <label for="title" className="form-label">Ans 1</label>
                <input onChange={handleChange}name="ans1"type="text"className="form-control" />
              </div>
              <div className="mb-3">
                <label for="title" className="form-label">Ans 2</label>
                <input onChange={handleChange}name="ans2"type="text"className="form-control" />
              </div>
              <div className="mb-3">
                <label for="title" className="form-label">Ans 3</label>
                <input onChange={handleChange}name="ans3"type="text"className="form-control" />
              </div>
              <div className="mb-3">
                <label for="title" className="form-label">Ans 4</label>
                <input onChange={handleChange}name="ans4"type="text"className="form-control" />
              </div>
              <div className="mb-3">
                <label for="title" className="form-label">Right Answer</label>
                <input onChange={handleChange}name="right_ans"type="text"className="form-control" />
              </div>
              <button type="button" onClick={submitForm}className="btn btn-primary">Add</button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default AddQuizQuestion;
