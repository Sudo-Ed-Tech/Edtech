import React from "react";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios';
const baseUrl='http://127.0.0.1:8000/api';

function CategoryCourses(){

    const [courseData, setCourseData]=useState([]);
    const {category_slug}=useParams();


    useEffect(()=>{
        try{
            axios.get(baseUrl+'/course/?category='+category_slug).then((res)=>{
                setCourseData(res.data)
            })
        }catch(error){
            console.log(error);
        }
    }, []);


    return(
        <div className="container-fluid main_container mt-3">
            {/* Latest Course */}
            <h3 className="pb-1 mb-4"> {category_slug}</h3>
            <div className="row mb-4">
                {courseData && courseData.map((course, index)=>
                <div className="col-md-3 mb-4">
                    <div className="card mb-4" >
                        <Link to={`/course-detail/${course.id}`}><img src={course.featured_img} className="card-img-top" width={300} height={300} alt={course.title} /></Link>
                        <div className="card-body">
                            <h5 className="card-title"><Link to={`/course-detail/${course.id}`}>{course.title}</Link></h5>
                        </div>
                    </div>
                </div>
                )}
            </div>
            {/* End Latest Courses */}
            {/* pagination Start */}
            <nav aria-label="Page navigation example mt-5">
                <ul className="pagination justify-content-center">
                    <li className="page-item"><a className="page-link" href="/#">Previous</a></li>
                    <li className="page-item"><a className="page-link" href="/#">1</a></li>
                    <li className="page-item"><a className="page-link" href="/#">2</a></li>
                    <li className="page-item"><a className="page-link" href="/#">3</a></li>
                    <li className="page-item"><a className="page-link" href="/#">Next</a></li>
                </ul>
            </nav>
            {/* pagination End */}
        </div>
    )
}

export default CategoryCourses;