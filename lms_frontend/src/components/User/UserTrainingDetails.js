import React from "react";
import { Link, useParams } from "react-router-dom";
import UserSidebar from "./UserSidebar";
import { useEffect, useState } from "react";
import axios from "axios";

const baseUrl = "http://127.0.0.1:8000/api/training";

function UserTrainingDetails() {
  //Fetch training details
  const [trainingData, settrainingData] = useState([]);
  const [totalCourse, settotalCourse] = useState([]);
  const [courseData, setcourseData] = useState([]);
  const studentId = localStorage.getItem("studentId");
  useEffect(() => {
    try {
      axios
        .get(baseUrl + "/fetch-training-enrolled-courses/" + studentId)
        .then((res) => {
          console.log(res.data)
          setcourseData(res.data);
          settotalCourse(res.data.length);
        });
    } catch (error) {
      console.log(error);
    }

    try {
      axios.get(baseUrl + "/training-details/").then((res) => {
        settrainingData(res.data);
        console.log(res.data)
      });
    } catch (error) {
      console.log(error);
    }
  }, []);


  //Meeting redirection
  const RedMeeting = () => {
    {
      trainingData.map(
        (meeting, index) => (
          window.location.href = meeting.meeting_link
        )
      );
    }
  };

  return (
    <div className="container-fluid main_container">
      <div className="row">
        <aside className="col-md-3">
          <UserSidebar />
        </aside>
        <div className="col-md-7 mt-3">
          <h5 className="pb-1 mb-4 fs-4">Training Details({totalCourse})</h5>
          <div className="row">
            {courseData.map((row, index) => (
              <div className="col-4 mb-4">
                <div className="card">
                  <Link to={`/training-course-detail/${row.training_course.id}`}>
                    <img
                      src={row.training_course.featured_img}
                      className="card-img-top"
                      width={200}
                      height={150}
                      alt={row.training_course.title}
                    />
                  </Link>
                  <hr />
                  <div className="card-body">
                    <h5 className="card-title">
                      <p>
                        <strong>Course:</strong>{" "}
                        <Link
                          to={`/training-course-detail/${row.training_course.id}`}
                        >
                          {" "}
                          {row.training_course.title}
                        </Link>
                      </p>
                    </h5>
                    <p>
                      <strong>Description:</strong>{" "}
                      {row.training_course.description}
                      <Link
                        to={`/training-course-detail/${row.training_course.id}`}
                      >
                        ...more
                      </Link>
                    </p>
                    <p>
                      <strong>Date:</strong> {trainingData.date}
                    </p>
                    <p>
                      <strong>Time:</strong> {trainingData.f_time} to{" "}
                      {trainingData.t_time}
                    </p>
                    {/* <p><strong>Trainer:</strong> <Link to={`/teacher-detail/`+teacherData.id}>{teacherData.full_name}</Link></p> */}
                    <hr />
                    <button
                      target="_blank"
                      className="btn btn-primary"
                      onClick={RedMeeting}
                    >
                      Join meeting
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserTrainingDetails;
