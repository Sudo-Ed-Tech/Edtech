import React from 'react'
import {Link} from 'react-router-dom';
import { useState } from "react";

function Header() {
  const [searchString, setsearchString] = useState({
    'search':''
  });
  const teacherLoginStatus=localStorage.getItem('teacherLoginStatus');
  const studentLoginStatus=localStorage.getItem('studentLoginStatus');

  const handleChange = (event) => {
    setsearchString({
      ...searchString,
      [event.target.name]: event.target.value,
    });
  };

  const searchCourse=()=>{
    if(searchString.search!=''){
    window.location.href="/search/"+searchString.search
    }
  }

    return (
  <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container mb-2 mt-2">
        <div>
          <Link to="/#"><img src="/logo.png" className="card-img-top" alt="Img" width="45" height="45"/></Link>
        </div> &nbsp;&nbsp;
        <Link className="navbar-brand text-dark fs-4 " to="/#" style={{Decoration:'bold'}}>Didactic Solutions</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="/#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav ms-auto">
            <form className="d-flex" role="search">
              <input name="search" onChange={handleChange} className="form-control me-2" type="search" placeholder="Search by Course Title" aria-label="Search" />
              <button onClick={searchCourse} className="btn  btn-dark" type="button">Search</button>
            </form>
            <Link className="nav-link text-dark fs-5" to="/">Home</Link>
            <Link className="nav-link text-dark fs-5" to="/">Subscribe</Link>
            <Link className="nav-link text-dark fs-5" to="/training-courses">Training</Link>
            <Link className="nav-link text-dark fs-5" to="/all-courses">Course</Link>
            <li className="nav-item- dropdown">
              <a className="nav-link dropdown-toggle text-dark fs-5" href="/#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">Trainer</a>
              <ul className='dropdown-menu' aria-labelledby="navbarDropdown">
                {teacherLoginStatus !=='true' &&
                <>
                <li><Link className="dropdown-item" to="/teacher-login">Login</Link></li>
                <li><Link className="dropdown-item" to="/teacher-register">Signup</Link></li> 
                </>
                }
                
                {teacherLoginStatus ==='true' &&
                <>
                
                <li><Link className="dropdown-item" to="/teacher-dashboard">Dashboard</Link></li>
                <li><Link className="dropdown-item" to="/teacher-logout">Logout</Link></li> 
                </>
                }
              </ul>
            </li>

            <li className="nav-item- dropdown">
              <a className="nav-link dropdown-toggle text-dark fs-5" href="/#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false"> Student </a>
              <ul className='dropdown-menu' aria-labelledby="navbarDropdown">
                {studentLoginStatus !=='true' &&
                <>
                <li><Link className="dropdown-item" to="/user-login">Login</Link></li>
                <li><Link className="dropdown-item" to="/user-register">Signup</Link></li>
                </> 
                }
                {studentLoginStatus ==='true' &&
                <>
                <li><Link className="dropdown-item" to="/user-dashboard">Dashboard</Link></li>
                <li><Link className="dropdown-item" to="/user-logout">Logout</Link></li> 
                </>
                }
              </ul>
            </li>
          </div>
        </div>
      </div>
    </nav>
    );
  }
  
  export default Header;
  
