import React from "react";
import UserSidebar from "./UserSidebar";
import { Link } from "react-router-dom";
import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Swal from 'sweetalert2';
const baseUrl='http://127.0.0.1:8000/api/elearning';
function ProfileSetting(){
    const [studentData, setstudentData]=useState({
        'full_name':'',
        'email':'',
        'username':'',
        'password':'',
        'interests':'',
        'profile_img':'',
        'p_img':'',
    });
    const studentId=localStorage.getItem('studentId');
    useEffect(()=>{
        try{
            axios.get(baseUrl+'/student/'+studentId).then((res)=>{
                setstudentData({
                    full_name:res.data.full_name,
                    email:res.data.email,
                    username:res.data.username,
                    password:res.data.password,
                    interests:res.data.interests,
                    profile_img:res.data.profile_img,
                    p_img:'',
                });
            });
        }catch(error){
            console.log(error);
        }
    },[]);

    const handleChange = (event) => {
        setstudentData({
          ...studentData,
          [event.target.name]: event.target.value,
        });
    };
    
    const handleFileChange = (event) => {
        setstudentData({
          ...studentData,
          [event.target.name]: event.target.files[0],
        });
    };

    const submitForm=()=>{
        const studentFormData = new FormData();
        studentFormData.append("full_name", studentData.full_name);
        studentFormData.append("email", studentData.email);
        studentFormData.append("username", studentData.username);
        studentFormData.append("password", studentData.password);
        studentFormData.append("interests", studentData.interests);
    
        if(studentData.p_img!==''){
            studentFormData.append('profile_img',studentData.p_img,studentData.p_img.name);
        }

        try {
          axios.put(baseUrl + "/student/"+studentId, studentFormData, {
              headers: {
                "content-type": "multipart/form-data",
              },
            })
            .then((response) => {
                if(response.status===200){
                   Swal.fire({
                      title: "Data has been Updated",
                      icon: "Success",
                      toast:"true",
                      timer: 3000,
                      position:'top-right',
                      timerProgressBar:true,
                      showConfirmButton: false
                   });
                }
            });
        } catch (error) {
          console.log(error);
          setstudentData({'status':'error'})
        }
      };
      
      useEffect(()=>{
        document.title="My Profile"
      });

      const studentLoginStatus=localStorage.getItem('studentLoginStatus')
      if(studentLoginStatus!='true'){
        window.location.href='/user-login';

      }

  return (
    <div className="container-fluid main_container">
      <div className="row">
        <aside className="col-md-2">
          <UserSidebar />
        </aside>
        <section className="col-md-9 mt-5">
            <div className="card">
                <h5 className="card-header">Profile Setting</h5>
                <div className="card-body">
                <div className="mb-3 row">
                        <label for="staticEmail" className="col-sm-2 col-form-label">Full Name</label>
                        <div className="col-sm-10">
                            <input value={studentData.full_name} onChange={handleChange} name="full_name" type="text" id="staticEmail" className="form-control"/>
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label for="staticEmail" className="col-sm-2 col-form-label">Email</label>
                        <div className="col-sm-10">
                            <input value={studentData.email} onChange={handleChange} name="email" type="email" id="staticEmail" className="form-control"/>                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label for="video" className="col-sm-2 col-form-label">Profile Image</label>
                        <div className="col-sm-10">
                            <input onChange={handleFileChange} name="p_img" type="file" id="video" className="form-control"/>
                            {studentData.profile_img && 
                                <p className="mt-2"><img src={studentData.profile_img} width="300" alt={studentData.full_name}/></p>
                            }               
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label for="inputPassword" className="col-sm-2 col-form-label">Password</label>
                        <div className="col-sm-10">
                        <input value={studentData.password} onChange={handleChange} name="password" type="text" id="staticEmail" className="form-control"/>                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label for="staticEmail" className="col-sm-2 col-form-label">Username</label>
                        <div className="col-sm-10">
                        <input value={studentData.username} onChange={handleChange} name="username" type="text" id="staticEmail" className="form-control"/>                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label for="staticEmail" name="interests" className="col-sm-2 col-form-label">Interests</label>
                        <div className="col-sm-10">
                        <textarea className="form-control" name="interests" value={studentData.interests} onChange={handleChange}></textarea>
                        <div id="emailHelp" class="form-text">Php, Python, JavaScript</div>                       </div>
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

export default ProfileSetting;
