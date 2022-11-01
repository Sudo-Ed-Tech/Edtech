import React from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import {useEffect, useState} from 'react'
import axios from "axios";
import Swal from 'sweetalert2'

const baseUrl='http://127.0.0.1:8000/api/elearning';
const siteUrl='http://127.0.0.1:8000/';


function CourseDetail() {
  const [chapterData, setchapterData]=useState([]);
  const [courseData, setcourseData]=useState([]);
  const [teacherData, setteacherData]=useState([]);
  const [relatedCourseData, setrelatedCourseData]=useState([]);
  const [techListData, settechListData]=useState([]);
  const [userLoginStatus, setuserLoginStatus]=useState();
  const [teacherLoginStatus, setteacherLoginStatus]=useState();
  const [enrollStatus, setenrollStatus]=useState();
  const [ratingStatus, setratingStatus]=useState();
  const [AvgRating, setAvgRating]=useState();
  const [favoriteStatus, setfavoriteStatus]=useState();
  let {course_id}=useParams();
  const studentId = localStorage.getItem("studentId");
  

  //Fetch Course details
  useEffect(()=>{
    try{
      axios.get(baseUrl+'/course/'+course_id).then((res)=>{
        setcourseData(res.data);
        setchapterData(res.data.course_chapter);
        setteacherData(res.data.teacher);
        setrelatedCourseData(JSON.parse(res.data.related_videos));
        settechListData(res.data.tech_list)
        if(res.data.course_rating !==''){
          setAvgRating(res.data.course_rating)
        }
      });
    }catch(error){
      console.log(error);
    }

    //Fetch enrollment status
    try{
      axios.get(baseUrl+'/fetch-enroll-status/'+studentId+'/'+course_id).then((res)=>{
        // console.log(res);
        if (res.data.bool===true){
          setenrollStatus('success')
        }
        });
      }catch(error){
        console.log(error)
      }

    
    //Fetch ratng status
    try{
      axios.get(baseUrl+'/fetch-rating-status/'+studentId+'/'+course_id).then((res)=>{
        // console.log(res);
        if (res.data.bool===true){
          setratingStatus('success')
        }
        });
      }catch(error){
        console.log(error)
      }

      try{
        axios.get(baseUrl+'/fetch-favorite-status/'+studentId+'/'+course_id).then((res)=>{
          if(res.data.bool === 'true'){
              setfavoriteStatus('success')
          }else{
            setfavoriteStatus('');
          }
        })

      }catch(e){
        console.log(e)
      }

    const studentLoginStatus=localStorage.getItem('studentLoginStatus')
    if(studentLoginStatus==='true'){
      setuserLoginStatus('success');
    }

    const teacherLoginStatus=localStorage.getItem('teacherLoginStatus')
    if(teacherLoginStatus==='true'){
      setteacherLoginStatus('success')
    }


  },[]);

  //Enroll Course
  const enrollCourse=()=>{
    // console.log('hello');
    const studentId = localStorage.getItem('studentId');
    const _FormData = new FormData();
    _FormData.append("course", course_id);
    _FormData.append("student", studentId);

    try {
      axios
        .post(baseUrl + "/student-enroll-course/", _FormData, {
          headers: {
            "content-type": "multipart/form-data",
 
          },
        }).then((res) => {
          if(res.status===200 || res.status===201){
            Swal.fire({
              title: "You are Enrolled Now",
              icon: "success",
              toast:"true",
              timer:"1500",
              position:"top-right",
              timerProgressBar:true,
              showConfirmButton:false
            });
            setenrollStatus('success')
          }  
          
        });
    } catch (error) {
      console.log(error);
    }
  };

  //Mark as Favorite
  const markAsFavorite=()=>{
    const _formData=new FormData();
    _formData.append('course', course_id);
    _formData.append('student', studentId);
    _formData.append('status',true);

    try{
      axios.get(baseUrl+'/student-add-favorite-course/',_formData,{
        headers:{
          'content-type': 'multipart/form-data'
        }
      }).then((res)=>{
        if (res.status===200 || res.status===201){
          Swal.fire({
            title:'Added to favorite',
            icon:'success',
            toast:true,
            timer:10000,
            position:"top-right",
            timerProgressBar:true,
            showCancelButton:false
          });
          setfavoriteStatus('success');
        }
      })
    }catch(e){
      console.log(e);
    }
  };

  //Remove from favorite
  const removeFavorite=(pk)=>{
    const _formData=new FormData();
    _formData.append('course', course_id);
    _formData.append('student', studentId);
    _formData.append('status',false);

    try{
      axios.get(baseUrl+'/student-remove-favorite-course/'+course_id+'/'+studentId,{
        headers:{
          'content-type': 'multipart/form-data'
        }
      }).then((res)=>{
        if (res.status===200 || res.status===201){
          Swal.fire({
            title:'Removed From favorite',
            icon:'success',
            toast:true,
            timer:10000,
            position:"top-right",
            timerProgressBar:true,
            showCancelButton:false
          });
          setfavoriteStatus('');
        }
      })
    }catch(e){
      console.log(e);
    }
  };

  
  //Add rating
  const [ratingData, setratingData]=useState({
    rating:'',
    reviews:'',
  });
  const handleRating=(event)=>{
    setratingData({
      ...ratingData,
      [event.target.name]:event.target.value
    });
  }

  const formSubmit=()=>{
    const _formData=new FormData();
    _formData.append('course', course_id);
    _formData.append('student',studentId);
    _formData.append('rating',ratingData.rating);
    _formData.append('reviews', ratingData.reviews);

    try{
      axios.post(baseUrl+'/course-rating/'+course_id, _formData).then((res)=>{
        if(res.status===200 || res.status===201){
          Swal.fire({
            title:'Thanks for review',
            icon:'success',
            timer:10000,
            confirmButtonText: 'Continue',
            showCancelButton:false
          })
          setAvgRating('success')
        }
      })
    }catch(error){
      console.log(error);
    }
  }


  return (
    <div className="container-fluid main_container mt-3 ">
      <div className="row">
        <div className="col-4">
          <img src={courseData.featured_img} className="rounded mx-auto d-block" width={300} height={300}  alt={chapterData.title} />
        </div>
        <div className="col-8">
          <h3>{courseData.title}</h3>
          <p>{courseData.description}</p>
          <p className="fw-bold">Course by: <Link to={`/teacher-detail/${teacherData.id}`}>{teacherData.full_name}</Link></p>
          <p className="fw-bold">Technologies:&nbsp;{techListData.map((tech, index)=>
              <>
                <Link to={`/category/${tech.trim()}`} className="badge badge-pill bg-warning mx-1">{tech.trim()}</Link>&nbsp;
              </>
            )}
          </p>
          <p><b>Duration:</b> 3 hours 30 Minutes</p>
          <p><b>Total Enrolled:</b> {courseData.total_enrolled_students} Student(s)</p>
          <p><b>Rating:</b> {AvgRating}/5
            
          { enrollStatus === 'success' &&  userLoginStatus === 'success' &&
            <>  
            {ratingStatus !== 'success' && enrollStatus === 'success' &&
              <button  className="btn btn-sm btn-success ms-2" data-bs-toggle="modal" data-bs-target="#RatingModal">Rate the Course</button>
            }
            {ratingStatus === 'success' &&
              <small className="badge bg-info text-dark ms-2">You already rated this course</small>
            }
            <div  className="modal fade" id="RatingModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog modal-lg">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">{courseData.title}</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body">
                  <form>
                      <div className="mb-3">
                          <label className="form-label" for="exampleInputEmail">Rating</label>
                          <select className="form-control" onChange={handleRating} name="rating">
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                          </select>
                        </div>
                        <div className="mb-3">
                          <label className="form-label" for="exampleInputPassword1">Review</label>
                          <textarea className="form-control" onChange={handleRating} name="reviews" rows={10}></textarea>
                        </div>
                        <button type="button" onClick={formSubmit} className="btn btn-primary">Submit</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            </>
          }
           
          </p>
          { enrollStatus === 'success' &&  userLoginStatus === 'success'&& 
            <p><span className="badge bg-success text-light">You are already enroll in this course</span></p>
          }
          { userLoginStatus === 'success' && enrollStatus !=='success' &&
            <p><button type="button" onClick={enrollCourse} className="btn btn-success btn-sm">Enroll in this course</button></p>
          }
          { userLoginStatus === 'success' && favoriteStatus !== 'success' &&
            <p><button type="button" onClick={markAsFavorite} className="btn btn-outline-danger"><i className="bi bi-heart-fill"></i></button></p>
          }
          { userLoginStatus === 'success' && favoriteStatus === 'success' &&
            <p><button type="button" onClick={removeFavorite} className="btn btn-danger"><i className="bi bi-heart-fill"></i></button></p>
          }
          { userLoginStatus !== 'success' && teacherLoginStatus !=='success' &&
          <p><Link to="/user-login">Please Login to Enroll</Link></p>
          }         
        </div>
        
      </div>

      {/* Course Videos */}
      <hr />
      <div className="row">
        <div className="col-2">

        </div>
        <div className="col-8">
      { enrollStatus === 'success' &&  userLoginStatus === 'success' && 
        <div className="card mt-4">
          <h5 className="card-header">In this course</h5>
          <ul className="list-group list-group-flush">
            {chapterData.map((chapter, index)=>
            <li className="list-group-item" value={chapter.id}>
              {chapter.title}
              <span className="float-end">
                <span className="me-5">1 Hour 30 Minutes</span>
                <button  className="btn btn-sm btn-danger" data-bs-toggle="modal" data-bs-target="#VideoModal"><i className="bi-youtube"></i></button>
              </span>

              {/* Video Modal start */}
              <div  className="modal fade" id="VideoModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-xl">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalLabel">{chapter.title}</h5>
                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                      <div className="ratio ratio-16x9">
                        <iframe  src={chapter.video} title="YouTube video" allowfullscreen ></iframe>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Video Modal End */}
            </li>
            )}
          </ul>
        
        </div>
      } 
    </div> 
    </div> 
      { teacherLoginStatus === 'success' && 
        <div className="card mt-4">
          <h5 className="card-header">In this course</h5>
          <ul className="list-group list-group-flush">
            {chapterData.map((chapter, index)=>
            <li className="list-group-item" value={chapter.id}>
              {chapter.title}
              <span className="float-end">
                <span className="me-5">1 Hour 30 Minutes</span>
                <button  className="btn btn-sm btn-danger" data-bs-toggle="modal" data-bs-target="#VideoModal"><i className="bi-youtube"></i></button>
              </span>

              {/* Video Modal start */}
              <div  className="modal fade" id="VideoModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-xl">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalLabel">{chapter.title}</h5>
                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                      <div className="ratio ratio-16x9">
                        <iframe  src={chapter.video} title="YouTube video" allowfullscreen ></iframe>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Video Modal End */}
            </li>
            )}
          </ul>
        </div>
      }


      <h3 className="pb-1 mb-4 mt-5">Related Course</h3>
      <div className="row mb-4">
        {relatedCourseData.map((rcourse, index)=>
          <>
          {console.log(rcourse)}
          <div className="col-md-3">
            <div className="card">
              <Link target="_blank" to={`/course-detail/${rcourse.pk}`}><img src={`${siteUrl}media/${rcourse.fields.featured_img}`} className="card-img-top" width={300} height={300} alt="Img" /></Link>
              <div className="card-body">
                <h5 className="card-title"><Link target="_blank" to={`/course-detail/${rcourse.pk}`}>{rcourse.fields.title}</Link></h5>
              </div>
            </div>
          </div>
          </>
        )}
      </div>
    </div>
  );
}

export default CourseDetail;
