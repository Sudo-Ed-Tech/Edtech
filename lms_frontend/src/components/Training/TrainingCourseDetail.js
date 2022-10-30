import React from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const baseUrl = "http://127.0.0.1:8000/api/training";

function TrainingCourseDetail() {
  const [courseData, setcourseData] = useState([]);
  const [trainingCourseData, setTrainingCourseData] = useState([]);
  const [techListData, settechListData] = useState([]);
  const [userLoginStatus, setuserLoginStatus] = useState([]);
  const [teacherLoginStatus, setteacherLoginStatus] = useState([]);
  const [trainingEnrollStatus, settrainingEnrollStatus] = useState([]);
  const [ratingStatus, setratingStatus] = useState([]);
  const [AvgRating, setAvgRating] = useState([]);
  const [TrainingRecordingData, setTrainingRecordingData] = useState([]);
  const [TrainerSessionData, setTrainerSessionData] =useState([]);
  const [StudentSessionData, setStudentSessionData] =useState([]);
  let { course_id } = useParams();
  const studentId = localStorage.getItem("studentId");
  const teacherId = localStorage.getItem("teacherId");

  //Fetch Course details
  useEffect(() => {
    try {
      axios.get(baseUrl + "/training-course/" + course_id).then((res) => {
        setcourseData(res.data);
        settechListData(res.data.training_tech_list);
        if (res.data.course_rating !== "") {
          setAvgRating(res.data.course_rating);
        }
      });
    } catch (error) {
      console.log(error);
    }

    try{
      axios.get(baseUrl +'/training-recording/'+course_id).then((res)=>{
        setTrainingRecordingData(res.data);
      })
    }catch(e){
      console.log(e)
    }

    // try {
    //   axios.get(baseUrl + "/training-details/").then((res) => {
    //       // console.log(res)
    //       settrainingData(res.data);

    //   });
    //   } catch (error) {
    //   console.log(error);
    //   }

    //Traing Course Details

    try{
      axios.get(baseUrl+ '/trainer-training-session/'+course_id +'/'+teacherId).then((res)=>{
        setTrainerSessionData(res.data)
      })

    }catch(e){
      console.log(e)
    }
    try{
      axios.get(baseUrl+ '/training-session/'+course_id).then((res)=>{
        setStudentSessionData(res.data)
      })

    }catch(e){
      console.log(e)
    }

    try {
      axios.get(baseUrl + "/training-course/" + course_id).then((res) => {
        setTrainingCourseData(res.data);
      });
    } catch (error) {
      console.log(error);
    }

    //Fetch teaining Enrollment status
    try {
      axios.get(baseUrl +"/fetch-training-enroll-status/" +studentId +"/" +course_id).then((res) => {
          if (res.data.bool === true) {
            settrainingEnrollStatus("success");
          }
        });
    } catch (error) {
      console.log(error);
    }

    //Fetch ratng status
    try {
      axios.get(baseUrl + "/fetch-rating-status/" + studentId + "/" + course_id).then((res) => {
          if (res.data.bool === true) {
            setratingStatus("success");
          }
        });
    } catch (error) {
      console.log(error);
    }

    const studentLoginStatus = localStorage.getItem("studentLoginStatus");
    if (studentLoginStatus === "true") {
      setuserLoginStatus("success");
    }

    const teacherLoginStatus = localStorage.getItem("teacherLoginStatus");
    if (teacherLoginStatus === "true") {
      setteacherLoginStatus("success");
    }
  }, []);

  //Enroll Course
  const enrollCourse = () => {
    // console.log('hello');
    const studentId = localStorage.getItem("studentId");
    const _FormData = new FormData();
    _FormData.append("training_course", course_id);
    _FormData.append("student", studentId);

    try {
      axios
        .post(baseUrl + "/student-enroll-training/", _FormData, {
          headers: {
            "content-type": "multipart/form-data",
          },
        })
        .then((res) => {
          if (res.status === 200 || res.status === 201) {
            Swal.fire({
              title: "You are Enrolled Now",
              icon: "success",
              toast: "true",
              timer: "1500",
              position: "top-right",
              timerProgressBar: true,
              showConfirmButton: false,
            });
            settrainingEnrollStatus("success");
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  //Add rating
  const [ratingData, setratingData] = useState({
    rating: "",
    reviews: "",
  });
  const handleRating = (event) => {
    setratingData({
      ...ratingData,
      [event.target.name]: event.target.value,
    });
  };

  const formSubmit = () => {
    const _formData = new FormData();
    _formData.append("training_course", course_id);
    _formData.append("student", studentId);
    _formData.append("rating", ratingData.rating);
    _formData.append("reviews", ratingData.reviews);

    try {
      axios
        .post(baseUrl + "/trainig-training-rating/" + course_id, _formData)
        .then((res) => {
          if (res.status === 200 || res.status === 201) {
            Swal.fire({
              title: "Thanks for review",
              icon: "success",
              timer: 10000,
              confirmButtonText: "Continue",
              showCancelButton: false,
            });
            setAvgRating("success");
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  //Download File
    const RecVideo = ()=>{
      {TrainingRecordingData.map((recording, index)=>(
        window.location.href=recording.rec_video
      ))
      }
    }
    const SessionNote = ()=>{
      {TrainingRecordingData.map((recording, index)=>(
        window.location.href=recording.rec_note
      ))
      }
    }

    //Redirect to the meeting Link
    const SmeetLink = ()=>{
      {StudentSessionData.map((session, index)=>(
        window.location.href=session.s_meet_link
      ))
      }
    }
    const TmeetLink = ()=>{
      {TrainerSessionData.map((session, index)=>(
        window.location.href=session.s_meet_link
      ))
      }
    }
    

  return (
    <div className="container-fluid main_container mt-3 ">
      <div className="row">
        <div className="col-4">
          <img
            src={trainingCourseData.featured_img}
            className="rounded mx-auto d-block"
            width={300}
            height={300}
            alt={trainingCourseData.title}
          />
        </div> 
        <div className="col-8">
          <h3>{trainingCourseData.title}</h3>
          <p className="fw-bold">
            Course by: Didactic Solutions
           
          </p>

          <p className="fw-bold">
            Technologies:&nbsp;
            {techListData.map((tech, index) => (
              <>
                <Link
                  to={`/category/${tech.trim()}`}
                  className="badge badge-pill bg-warning mx-1"
                >
                  {tech.trim()}
                </Link>
                &nbsp;
              </>
            ))}
          </p>

          <p className="fw-bold">
            Total Enrolled: {courseData.training_enrolled_student} Student(s)
          </p>

          {/* <p className="fw-bold">Date: {trainingCourseData.date} </p> */}
          <p className="fw-bold">
            Rating: {AvgRating}/5
            {trainingEnrollStatus === "success" &&
              userLoginStatus === "success" && (
                <>
                  {ratingStatus !== "success" &&
                    trainingEnrollStatus === "success" && (
                      <button
                        className="btn btn-sm btn-success ms-2"
                        data-bs-toggle="modal"
                        data-bs-target="#RatingModal"
                      >
                        Rate the Course
                      </button>
                    )}
                  {ratingStatus === "success" && (
                    <small className="badge bg-info text-dark ms-2">
                      You have already rated this course
                    </small>
                  )}
                  <div
                    className="modal fade"
                    id="RatingModal"
                    tabindex="-1"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog modal-lg">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title" id="exampleModalLabel">
                            {courseData.title}
                          </h5>
                          <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></button>
                        </div>
                        <div className="modal-body">
                          <form>
                            <div className="mb-3">
                              <label
                                className="form-label"
                                for="exampleInputEmail"
                              >
                                Rating
                              </label>
                              <select
                                className="form-control"
                                onChange={handleRating}
                                name="rating"
                              >
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                                <option value={4}>4</option>
                                <option value={5}>5</option>
                              </select>
                            </div>
                            <div className="mb-3">
                              <label
                                className="form-label"
                                for="exampleInputPassword1"
                              >
                                Review
                              </label>
                              <textarea
                                className="form-control"
                                onChange={handleRating}
                                name="reviews"
                                rows={10}
                              ></textarea>
                            </div>
                            <button
                              type="button"
                              onClick={formSubmit}
                              className="btn btn-primary"
                            >
                              Submit
                            </button>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
          </p>
          {trainingEnrollStatus === "success" && userLoginStatus === "success" && (
            <p>
              <span className="badge bg-success text-light">
                You have already enroll in this course
              </span>
            </p>
          )}
          {userLoginStatus === "success" && trainingEnrollStatus !== "success" && (
            <p>
              <button
                type="button"
                onClick={enrollCourse}
                className="btn btn-success btn-sm"
              >
                Enroll in this course
              </button>
            </p>
          )}
          {userLoginStatus !== "success" && teacherLoginStatus !== "success" && (
            <p>
              <Link to="/user-login">Please Login to Enroll</Link>
            </p>
          )}
        </div>
      </div>

      <hr />
      <div className="row">
        <div className="col-7">
          <p className="fs-4">Course Description</p>
          <p>{trainingCourseData.description}</p>
        </div>
      </div>
      <hr />
      {trainingEnrollStatus === "success" && userLoginStatus === "success" && (
        <div className="row">
          {/* Session Details */}
        <div className="col-1"></div>
        <div className="col-5">
        
          <>
          <p className="fs-4">Training Session Details </p>
          <table className="table table-bordered">
            <thead className="text-center">
              <tr>
                <th>Sr. No.</th>
                <th>Topic</th>
                <th>Time</th>
                <th>Date</th>
                <th>Meet Link</th>
                <th>Trainer</th>
              </tr>
            </thead>
            <tbody>
            {StudentSessionData.map((session, index) => (
              <tr>
                <td className="text-center">{session.s_number}</td>
                <td>{session.s_topic}</td>
                <td className="text-center">{session.s_time}</td>
                <td className="text-center">{session.s_date}</td>
                <td className="text-center"><Link onClick={SmeetLink} style={{textDecoration:'none'}}>Join Meet</Link></td>
                <td><Link style={{textDecoration:'none', color:"black"}} to={`/teacher-detail/`+session.s_trainer.id}>{session.s_trainer.full_name}</Link></td>
                
              </tr>
            ))}
            </tbody>
          </table>
          </>
        
        </div>
        
        <div className="col-5">
          <p className="fs-4">Recorded Session Details </p>
          <table className="table table-bordered">
            <thead className="text-center">
              <tr>
                <th>Sr. No.</th>
                <th>Topic</th>
                <th>Time</th>
                <th>Date</th>
                <th>Note</th>
                <th>Recording</th>
              </tr>
            </thead>
            <tbody>
            {TrainingRecordingData.map((recording, index) => (
              <tr>
                <td className="text-center">{recording.rec_number}</td>
                <td>{recording.topic}</td>
                <td className="text-center">{recording.rec_time}</td>
                <td className="text-center">{recording.rec_date}</td>
                <td className="text-center"><Link onClick={SessionNote} style={{textDecoration:'none'}}>View Note</Link></td>
                <td className="text-center"><Link onClick={RecVideo} style={{textDecoration:'none'}}>Play Video</Link></td>
              </tr>
            ))}
            </tbody>
          </table>
      </div>
      </div>
      )}

    {teacherLoginStatus === "success" && (
        <div className="row">
          {/* Session Details */}
        <div className="col-1"></div>
        <div className="col-5">
        
          <>
          <p className="fs-4">Training Session Details </p>
          <table className="table table-bordered">
            <thead className="text-center">
              <tr>
                <th>Sr. No.</th>
                <th>Topic</th>
                <th>Time</th>
                <th>Date</th>
                <th>Meet Link</th>
                <th>Trainer</th>
              </tr>
            </thead>
            <tbody>
            {TrainerSessionData.map((session, index) => (
              <tr>
                <td className="text-center">{session.s_number}</td>
                <td>{session.s_topic}</td>
                <td className="text-center">{session.s_time}</td>
                <td className="text-center">{session.s_date}</td>
                <td className="text-center"><Link onClick={TmeetLink} style={{textDecoration:'none'}}>Join Meet</Link></td>
                <td><Link style={{textDecoration:'none', color:"black"}} to={`/teacher-detail/`+session.s_trainer.id}>{session.s_trainer.full_name}</Link></td>
                
              </tr>
            ))}
            </tbody>
          </table>
          </>
        
        </div>
        
        <div className="col-5">
          <p className="fs-4">Recorded Session Details </p>
          <table className="table table-bordered">
            <thead className="text-center">
              <tr>
                <th>Sr. No.</th>
                <th>Topic</th>
                <th>Time</th>
                <th>Date</th>
                <th>Note</th>
                <th>Recording</th>
              </tr>
            </thead>
            <tbody>
            {TrainingRecordingData.map((recording, index) => (
              <tr>
                <td className="text-center">{recording.rec_number}</td>
                <td>{recording.topic}</td>
                <td className="text-center">{recording.rec_time}</td>
                <td className="text-center">{recording.rec_date}</td>
                <td className="text-center"><Link onClick={SessionNote} style={{textDecoration:'none'}}>View Note</Link></td>
                <td className="text-center"><Link onClick={RecVideo} style={{textDecoration:'none'}}>Play Video</Link></td>
              </tr>
            ))}
            </tbody>
          </table>
      </div>
      </div>
      )}

</div>
);}
export default TrainingCourseDetail;
