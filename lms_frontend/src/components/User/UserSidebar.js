import React from "react";
import { Link } from "react-router-dom";



function UserSidebar(){

    return(
        <div class="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark" style={{width:280, height:900}}>
            <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                <Link to="/user-dashboard" class="fs-4 text-white" style={{ textDecoration: 'none' }}>Dashboard</Link>
            </a>
            <hr />
            <ul class="nav nav-pills flex-column mb-auto">
                <li class="nav-item">
                    <a href="#" class="nav-link active" aria-current="page">
                        <Link to="/user-dashboard" className="bi me-2 text-light" style={{ textDecoration: 'none' }}>Dashboard</Link>
                    </a>
                </li>
                <li>
                    <a href="#" class="nav-link text-white">
                        <Link to="/user-training-details/" className="bi me-2 text-light" style={{ textDecoration: 'none' }}>Training</Link>
                    </a>
                </li>
                <li>
                    <a class="nav-link text-white">
                        <Link to="/my-courses" className="bi me-2 text-light" style={{ textDecoration: 'none' }}>My Courses</Link>
                    </a>
                </li>
                <li>
                    <a  class="nav-link text-white">
                        <Link to="/favorite-courses" className="bi me-2 text-light" style={{ textDecoration: 'none' }}>Favorite Courses</Link>
                    </a>
                </li>
                <li>
                    <a  class="nav-link text-white">
                        <Link to="/recommended-courses" className="bi me-2 text-light" style={{ textDecoration: 'none' }}>Recommended Courses</Link>
                    </a>
                </li>
                <li>
                    <a  class="nav-link text-white">
                        <Link to="/my-assignments" className="bi me-2 text-light" style={{ textDecoration: 'none' }}>Assignments</Link>
                    </a>
                </li>
            </ul>
            <hr />
            <div class="dropdown">
                <a  class="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                    <div alt="" class="rounded-circle me-2" width="32" height="32">
                    <i className="bi bi-trash"></i>
                    <strong>User</strong>
                    </div>
                </a>
                <ul class="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
                    <li><Link class="dropdown-item" href="#">Profile</Link></li>
                    <li>
                        <a class="dropdown-item" href="#">
                        <Link to="/profile-setting" className="bi me-2 text-light" style={{ textDecoration: 'none' }}>Setting</Link>
                        </a>
                    </li>
                    <li><hr class="dropdown-divider"/></li>
                    <li>
                        <a class="dropdown-item" href="#">
                            <Link to="/lg/user-logout" className="bi me-2 text-light" style={{ textDecoration: 'none' }}>Sign out</Link>
                        </a>
                    </li>
                    
                </ul>
            </div>
        </div>
    )
}

export default UserSidebar;