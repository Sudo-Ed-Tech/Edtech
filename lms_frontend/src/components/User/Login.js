import React from 'react';
import {useEffect, useState} from 'react';
import axios from 'axios';

const baseUrl='http://127.0.0.1:8000/api/elearning';

function Login(){
    const [studentLoginData, setStudentLoginData] = useState({
        'email':'',
        'password':'',
    });

    const [errorMsg, seterrorMsg]=useState('');
    const handleChange=(event)=>{
        setStudentLoginData({
            ...studentLoginData,
            [event.target.name]:event.target.value
        });
    }

    const Swal = require('sweetalert2')
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
        // console.log(studentLoginData);
        const studentFormData=new FormData();
        studentFormData.append('email', studentLoginData.email)
        studentFormData.append('password', studentLoginData.password)
        try{
            axios.post(baseUrl+'/user-login', studentFormData).then((res)=>{
                if(res.data.bool===true){
                    localStorage.setItem('studentLoginStatus',true);
                    localStorage.setItem('studentId',res.data.student_id);
                    window.location.href='/user-dashboard';
                }else{
                    seterrorMsg('Invalid Email or Password')
                }
            });
        }catch(error){
            console.log(error)
        }
    }

    useEffect(()=>{
        document.title="Student Login"
    });

    const studentLoginStatus=localStorage.getItem('studentLoginStatus');
    if(studentLoginStatus==='true'){
        window.location.href='/user-dashboard';
    }

    return(
        <div className='container mt-4'>
            <div className='row'>
                <div className='col-6 offset-3'>
                    <div className='card'>
                        <h5 className='card-header'>User Login</h5>
                        <div className='card-body'>
                            {errorMsg && <p className='text-danger'>{errorMsg}</p>}
                                <div className='mb-3'>
                                    <label for="exampleInputEmail" className='form-label'>Email</label>
                                    <input value={studentLoginData.email} onChange={handleChange} name="email" type='email' className="form-control" />
                                </div>
                                <div className='mb-3'>
                                    <label for="exampleInputPassword1" className='form-label'>Password</label>
                                    <input value={studentLoginData.password} onChange={handleChange} name="password" type='password' className="form-control" id="exampleInputPassword1"/>
                                </div>
                                <button type='button'onClick={function(event){ submitForm(); handleLogin();}} className='btn btn-primary'>Login</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;