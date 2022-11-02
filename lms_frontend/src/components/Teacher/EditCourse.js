import React from "react";
import TrainerSidebar from "./TrainerSidebar";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

const baseUrl = "http://127.0.0.1:8000/api";

function EditCourse() {
  
  useEffect(() => {
    document.title = "Update Course";
  });

  const teacherId = localStorage.getItem("teacherId");
  const { course_id } = useParams();
  const [cats, setCates] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [courseData, setCourseData] = useState({
    category: "",
    teacher: "",
    title: "",
    description: "",
    f_img: "",
    prev_img:"",
    technologies: "",
  });

  
  useEffect(() => {
    //Get teacher data
    try {
      axios.get(baseUrl + "/teacher/").then((tec) => {
        setTeachers(tec.data);
      });
    } catch (error) {
      console.log(error);
    }

    //Get category data
    try {
      axios.get(baseUrl + "/category/").then((res) => {
        setCates(res.data);
      });
    } catch (error) {
      console.log(error);
    }

    //Get current course details
    try {
      axios.get(baseUrl + '/teacher-course-detail/' + course_id).then((res) => {
        setCourseData({
          category: res.data.category,
          title: res.data.title,
          teacher: res.data.teacher,
          description: res.data.description,
          prev_img:res.data.featured_img,
          f_img:"",
          technologies: res.data.technologies
        });
      });
    } catch (error) {
      console.log(error)
    }
  }, []);

  const handleChange = (event) => {
    setCourseData({
      ...courseData,
      [event.target.name]: event.target.value,
    });
  };

  const handleFileChange = (event) => {
    setCourseData({
      ...courseData,
      [event.target.name]: event.target.files[0],
    });
  };

  const submitForm = () => {
    const _FormData = new FormData();
    _FormData.append("category", courseData.category);
    _FormData.append("teacher", teacherId);
    _FormData.append("title", courseData.title);
    _FormData.append("description", courseData.description);
    if (courseData.f_img !==''){
      _FormData.append("featured_img", courseData.f_img,courseData.f_img.name);
    }
    _FormData.append("technologies", courseData.technologies);

    try {
      axios
        .put(baseUrl + "/teacher-course-detail/"+course_id, _FormData, {
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
            <h5 className="card-header">Update Course</h5>
            <div className="card-body">
              <div className="mb-3">
                <label for="title" className="form-label">Category</label>
                <select name="category" value={courseData.category} onChange={handleChange} className="form-control">
                  {cats.map((category, index) => { return (<option key={index} value={category.id}>{category.title}</option>); })}
                </select>
              </div>
              <div className="mb-3">
                <label for="title" className="form-label">Teacher</label>
                <select name="teacher" value={courseData.teacher} onChange={handleChange} className="form-control">
                  {teachers.map((teacher, index) => { return (<option key={index} value={teacher.id}>{teacher.full_name}</option>); })}
                </select>
              </div>
              <div className="mb-3">
                <label for="title" className="form-label">Title</label>
                <div className="col-sm-10">
                  <input value={courseData.title} onChange={handleChange} name="title" type="text" className="form-control" id="staticEmail" />
                </div>
              </div>
              <div className="mb-3">
                <label for="description" className="form-label"> Description </label>
                <div className="col-sm-10">
                  <textarea value={courseData.description} onChange={handleChange} name="description" className="form-control"></textarea>
                </div>
              </div>
              <div className="mb-3">
                <label for="image" className="form-label">featured Image</label>
                <div className="col-sm-10">
                  <input onChange={handleFileChange}name="f_img"type="file" className="form-control" />
                  {courseData.prev_img && <p className="mt-2"><img src={courseData.prev_img} width="200"/></p> }
                </div>
              </div>
              <div className="mb-3">
                <label for="technology" className="form-label">Technologies </label>
                <textarea value={courseData.technologies} onChange={handleChange}name="technologies"className="form-control"></textarea>
              </div>
              <button type="button"onClick={submitForm} className="btn btn-primary"> Update </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default EditCourse;
