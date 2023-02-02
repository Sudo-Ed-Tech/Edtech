import React from "react";
import UserSidebar from "./UserSidebar";
import { useState, useEffect } from "react";
import axios from 'axios';
const baseUrl='http://127.0.0.1:8000/api/elearning';

function ChangePassword() {
  const [studentData, setstudentData]=useState({
    'password':'',
  });
  const studentId=localStorage.getItem('studentId');
  
  const handleChange = (event) => {
      setstudentData({
        ...studentData,
        [event.target.name]: event.target.value,
      });
  };

  const submitForm=()=>{
      const studentFormData = new FormData();
      studentFormData.append("password", studentData.password);

      try {
        axios.post(baseUrl + "/student/change-password/"+studentId+"/", studentFormData)
          .then((response) => {
              if(response.status===200){
                window.location.href='/user-logout';
              }else{
                alert('Ooops...Some error occured');
              }
          });
      } catch (error) {
        console.log(error);
        setstudentData({'status':'error'})
      }
    };
    
    useEffect(()=>{
      document.title="Student Change Password"
    });

    const studentLoginStatus=localStorage.getItem('studentLoginStatus')
    if(studentLoginStatus!='true'){
      window.location.href='/user-login';

    }
  return (
    <div className="container-fluid main_container">
      <div className="row">
        <aside className="col-md-3">
          <UserSidebar />
        </aside>
        <section className="col-md-7 mt-3">
            <div className="card">
                <h5 className="card-header">Change Password</h5>
                <div className="card-body">        
                    <div className="mb-3 row">
                        <label for="inputPassword" className="col-sm-2 col-form-label">New Password</label>
                        <div className="col-sm-10">
                            <input type="text" name="password" value={studentData.password} onChange={handleChange} class="form-control" id="inputPassword" />
                        </div>
                    </div>
                    <hr />
                    <button className="btn btn-primary" onClick={submitForm}>Update</button>
                    
                </div>
            </div> 
        </section>
      </div>
    </div>
  );
}

export default ChangePassword;
