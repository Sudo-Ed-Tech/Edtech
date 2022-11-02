import React from "react";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
const baseUrl = "http://127.0.0.1:8000/api";

function Home() {
  const [courseData, setCourseData] = useState([]);
  const [teacherData, setTeacherData] = useState([]);
  
  useEffect(() => {
    try {
      axios.get(baseUrl + "/course/").then((res) => {
        setCourseData(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    try {
      axios.get(baseUrl + "/teacher/").then((res) => {
        setTeacherData(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);


  return (
    <div className="container-fluid main_container mt-3">
      {/* carosole start */}
      <div
        id="carouselExampleDark"
        className="carousel carousel-dark slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleDark"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleDark"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleDark"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>
        <div className="carousel-inner ">
          <div className="carousel-item active carouselImg" data-bs-interval="10000">
            <img src="/Assets/carousel/1.jpg" className="d-block mx-auto" width={1650} height={700}/>
            <div className="carousel-caption d-none d-md-block">
              <h5 className="text-light">First slide label</h5>
              <p className="text-light">
                Some representative placeholder content for the first slide.
              </p>
            </div>
          </div>
          <div className="carousel-item" data-bs-interval="2000">
            <img src="/Assets/carousel/2.jpg" className="d-block mx-auto" width={1650} height={700} />
            <div className="carousel-caption d-none d-md-block">
            <h5 className="text-light">First slide label</h5>
              <p className="text-light">
                Some representative placeholder content for the first slide.
              </p>
            </div>
          </div>
          <div className="carousel-item align-self-center">
            <img src="/Assets/carousel/3.jpg" className="d-block mx-auto" width={1650} height={700} />
            <div className="carousel-caption d-none d-md-block">
            <h5 className="text-light">First slide label</h5>
              <p className="text-light">
                Some representative placeholder content for the first slide.
              </p>
            </div>
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleDark"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleDark"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      {/* carosole end */}

      <div className="row mt-5">
        <div className="col-2"></div>
        <div className="col-8">
          {/* Latest Course */}
          <h3 className="pb-1 mb-4">
            Latest Courses{" "}
            <Link to="/all-courses" className="float-end">
              {" "}
              See All{" "}
            </Link>{" "}
          </h3>
          <div className="row">
            {courseData.map((course, index) => (
                <div className="col-md-3 mb-4">
                  <div className="card w-100">
                    <Link to={`/course-detail/${course.id}`}>
                      <img
                        src={course.featured_img}
                        className="card-img-top"
                        width={200}
                        height={150}
                        alt={course.title}
                      />
                    </Link>
                    <hr />
                    <div className="card-body">
                      <h5 className="card-title">
                        <Link to={`/course-detail/${course.id}`}>{course.title}</Link>
                      </h5>
                      <p><b>Detail:</b>&nbsp;&nbsp; {course.description}...<Link to={`/course-detail/${course.id}`}>learn more</Link></p>
                    </div>
                    <div className="card-footer">
                      <div className="title">
                        <span><b>Rating:&nbsp;&nbsp;{course.course_rating}/5</b></span>
                        <span className="float-end"><b>Enrolled:&nbsp;&nbsp;{course.total_enrolled_students}</b></span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
          {/* End Latest Courses */}

          {/* Popular Course */}
          <h3 className="pb-1 mb-4 mt-5">
            Popular Courses{" "}
            <Link to="/popular-courses" className="float-end">
              See All
            </Link>
          </h3>
          <div className="row">
            {courseData.map((course, index) => (
                <div className="col-md-3 mb-4">
                  <div className="card w-100">
                    <Link to={`/course-detail/${course.id}`}>
                      <img
                        src={course.featured_img}
                        className="card-img-top"
                        width={200}
                        height={150}
                        alt={course.title}
                      />
                    </Link>
                    <hr />
                    <div className="card-body">
                      <h5 className="card-title">
                        <Link to={`/course-detail/${course.id}`}>{course.title}</Link>
                      </h5>
                      <p><b>Detail:</b>&nbsp;&nbsp; {course.description}...<Link to={`/course-detail/${course.id}`}>learn more</Link></p>
                    </div>
                    <div className="card-footer">
                      <div className="title">
                        <span><b>Rating:&nbsp;&nbsp;{course.course_rating}/5</b></span>
                        <span className="float-end"><b>Enrolled:&nbsp;&nbsp;{course.total_enrolled_students}</b></span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
          {/* End popular Courses */}

          {/* Featured Teachers */}
          <h3 className="pb-1 mb-4 mt-5">
            Popular Teachers
            <Link to="/popular-teachers" className="float-end">
              See All
            </Link>
          </h3>
          <div className="row">
          {teacherData &&
              teacherData.map((teacher, index) => (
            <div className="col-md-3 mb-4">
              <div className="card">
                <Link to={`/detail/}`}>
                  <img
                    src={"logo512.png"}
                    className="card-img-top"
                    width={300}
                    height={300}
                    alt={"title"}
                  />
                </Link>
                <div className="card-body">
                  <h5 className="card-title">
                    <Link to={`/teacher-detail/`+teacher.id}>{teacher.full_name}</Link>
                  </h5>
                </div>
                <div className="card-footer">
                  <div className="title">
                    <span>Rating: 4.5/5</span>
                  </div>
                </div>
              </div>
              
            </div>
            ))}
          </div>
          {/* End Featured Teacheers */}

          {/* Student Testimonials */}
          <h3 className="pb-1 mb-4 mt-5">Student Testimonials</h3>
          <div
            id="carouselExampleIndicators"
            className="carousel slide bg-dark text-white py-5"
            data-bs-ride="carousel"
          >
            <div className="carousel-indicators">
              <button
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to="0"
                className="active"
                aria-current="true"
                aria-label="Slide 1"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to="1"
                aria-label="Slide 2"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to="2"
                aria-label="Slide 3"
              ></button>
            </div>
            <div className="carousel-inner">
              <div className="carousel-item active">
                <figure className="text-center">
                  <figure className="text-center">
                    <blockquote className="blockquote">
                      <p>
                        A well-known quote, contained in a blockquote element.
                      </p>
                    </blockquote>
                    <figcaption className="blockquote-footer">
                      Someone famous in{" "}
                      <cite title="Source Title">Source Title</cite>
                    </figcaption>
                  </figure>
                </figure>
              </div>
              <div className="carousel-item">
                <figure className="text-center">
                  <blockquote className="blockquote">
                    <p>
                      A well-known quote, contained in a blockquote element.
                    </p>
                  </blockquote>
                  <figcaption className="blockquote-footer">
                    Someone famous in{" "}
                    <cite title="Source Title">Source Title</cite>
                  </figcaption>
                </figure>
              </div>
              <div className="carousel-item">
                <figure className="text-center">
                  <blockquote className="blockquote">
                    <p>
                      A well-known quote, contained in a blockquote element.
                    </p>
                  </blockquote>
                  <figcaption className="blockquote-footer">
                    Someone famous in{" "}
                    <cite title="Source Title">Source Title</cite>
                  </figcaption>
                </figure>
              </div>
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
          {/* End Student Testimonials */}
        </div>
      </div>
    </div>
  );
}

export default Home;
