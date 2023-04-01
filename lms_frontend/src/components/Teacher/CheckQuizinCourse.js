import React from "react";
import { Link, useParams } from "react-router-dom";
import TrainerSidebar from "./TrainerSidebar";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from 'sweetalert2';

const baseUrl = "http://127.0.0.1:8000/api/elearning";

function CheckQuizinCourse(props) {
  const [quizData, setquizData] = useState([]);
  const teacherId = localStorage.getItem("teacherId");

  useEffect(() => {
    try {
      axios.get(`${baseUrl}/fetch-quiz-assign-status/${props.quiz}/${props.course}`).then((res) => {
        setquizData(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  },[]);


  //assign quiz to course
    const assignQuiz=(quiz_id)=>{
    const _FormData = new FormData();
    _FormData.append("teacher", teacherId);
    _FormData.append("course", props.course);
    _FormData.append("quiz",props.quiz);

    try {
      axios
        .post(baseUrl + "/quiz-assign-course/", _FormData, {
          headers: {
            "content-type": "multipart/form-data",

          },
        }).then((res) => {
          if(res.status===200 || res.status===201){
            window.location.reload();
          }
          
        });
    } catch (error) {
      console.log(error);
    }
  };

  return(
    <td>
        {quizData.bool==false &&
        <button onClick={()=>assignQuiz(props.quiz)} className='btn btn-success btn-sm ms-2'>Assign Quiz</button>
        }

        {quizData.bool==true &&
        <span className="text-success">Assigned</span>
        }
    </td>
  );
}

export default CheckQuizinCourse;
