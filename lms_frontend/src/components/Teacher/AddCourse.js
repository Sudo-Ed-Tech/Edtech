import { React, useEffect, useState } from "react";
import TrainerSidebar from "./TrainerSidebar";
import axios from "axios";

const baseUrl = "http://127.0.0.1:8000/api/elearning";

function AddCourse() {
  useEffect(() => {
    document.title = "Add Course";
  });

  const [cats, setCates] = useState([]);
  const teacherId = localStorage.getItem("teacherId");

  const [courseData, setCourseData] = useState({
    category: "",
    teacher: "",
    title: "",
    description: "",
    featured_img: "",
    technologies: "",
  });

  useEffect(() => {
    try {
      axios.get(baseUrl + "/category/").then((res) => {
        setCates(res.data);
      });
    } catch (error) {
      console.log(error);
    }

    // try {
    //   axios.get(baseUrl + "/teacher/").then((tec) => {
    //     setTeachers(tec.data);
    //   });
    // } catch (error) {
    //   console.log(error);
    // }
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
    _FormData.append("featured_img", courseData.featured_img);
    _FormData.append("technologies", courseData.technologies);

    try {
      axios
        .post(baseUrl + "/course/", _FormData, {
          headers: {
            "content-type": "multipart/form-data application/mp4",
 
          },
        })
        .then((res) => {
          // console.log(res.data);
          window.location.href = "/teacher-courses/";
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
            <h5 className="card-header">Add Course</h5>
            <div className="card-body">
              <div className="mb-3">
                <label for="title" className="form-label"> Category</label>
                <select name="category" onChange={handleChange} className="form-control">
                  {cats.map((category, index) => {return ( <option key={index} value={category.id}>{category.title}</option>)})}
                </select>
              </div>
              {/* <div className="mb-3">
                <label for="title" className="form-label">Teacher</label>
                <select name="teacher"  className="form-control">
                  {teachers.map((teacher, index) => {return (<option key={index} value={teacher.id}>{teacher.full_name}</option>)})}
                </select>
              </div> */}
              <div className="mb-3">
                <label for="title" className="form-label">Title</label>
                <div className="col-sm-10">
                  <input onChange={handleChange} name="title" type="text" className="form-control" id="staticEmail" />
                </div>
              </div>
              <div className="mb-3">
                <label for="description" className="form-label">  Description </label>
                <div className="col-sm-10">
                  <textarea  onChange={handleChange}  name="description" className="form-control"></textarea>
                </div>
              </div>
              <div className="mb-3">
                <label for="image" className="form-label"> featured Image </label>
                <div className="col-sm-10">
                  <input  onChange={handleFileChange} name="featured_img" type="file"  className="form-control" id="inputPassword" />
                </div>
              </div>
              <div className="mb-3">
                <label for="technology" className="form-label"> Technologies </label>
                <textarea onChange={handleChange} name="technologies" className="form-control"></textarea>
              </div>
              <button type="button" onClick={submitForm} className="btn btn-primary">Add</button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default AddCourse;
