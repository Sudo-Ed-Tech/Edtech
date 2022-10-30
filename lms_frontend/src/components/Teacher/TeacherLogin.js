import React from 'react';
import {useEffect, useState} from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'
const baseUrl='http://127.0.0.1:8000/api/elearning';

function TeacherLogin(){
    const teacherId=localStorage.getItem("teacherId");
    const [teacherLoginData, setTeacherLoginData] = useState({
        'email':'',
        'password':'',
    });
    const [errorMsg, seterrorMsg]=useState('');
    const handleChange=(event)=>{
        setTeacherLoginData({
            ...teacherLoginData,
            [event.target.name]:event.target.value
        });
    }
    
    const handleLogin =()=>{
        Swal.fire({
            title:'Success',
            text: 'You are successfully logged in',
            icon: 'success',
            timer: 3000,
            confirmButtonText: 'Continue',
            showCancelButton:false
        })
    }
    const submitForm = ()=>{
        // console.log(teacherLoginData);
        const teacherFormData=new FormData();
        teacherFormData.append('email', teacherLoginData.email)
        teacherFormData.append('password', teacherLoginData.password)
        try{
            axios.post(baseUrl+'/teacher-login', teacherFormData).then((res)=>{
                if(res.data.bool===true){
                    localStorage.setItem('teacherLoginStatus',true);
                    localStorage.setItem('teacherId',res.data.teacher_id);
                    window.location.href='/teacher-dashboard/';
                }else{
                    seterrorMsg('Invalid Email or Password')
                }
            });
        }catch(error){
            console.log(error)
        }
    }

    const teacherLoginStatus=localStorage.getItem('teacherLoginStatus');
    if(teacherLoginStatus==='true'){
        window.location.href='/teacher-dashboard/';
    }

    

    useEffect(()=>{
        document.title="Trainer Login"
    });

    return(
        <div className='container-fluid main_container'>
            <div className='row'>
                <div className='col-5 offset-4 mt-5'>
                    <div className='card'>
                        <h5 className='card-header'>Trainer Login</h5>
                        <div className='card-body'>
                            {errorMsg && <p className='text-danger'>{errorMsg}</p>}
                            <form>
                                <div className='mb-3'>
                                    <label for="exampleInputEmail1" className='form-label'>Email</label>
                                    <input value={teacherLoginData.email} onChange={handleChange} name="email" type="email" className="form-control" />
                                </div>
                                <div className='mb-3'>
                                    <label for="exampleInputPassword1" className='form-label'>Password</label>
                                    <input value={teacherLoginData.password} onChange={handleChange} name="password" type="password" className="form-control" id="exampleInputPassword1" />
                                </div>
                                <button  type="button" onClick={function(event){ submitForm(); handleLogin();}} className='btn btn-primary'>Login</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>  
        </div>
    )
}
 
export default TeacherLogin;