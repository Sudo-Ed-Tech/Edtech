import React from 'react';
import {useEffect, useState} from 'react'
import axios from 'axios';
import Swal from 'sweetalert2'

const baseUrl='http://127.0.0.1:8000/api/elearning/student/';

function Register(){

    const [studentData, setStudentData]=useState({
        'full_name':'',
        'username':'',
        'email':'',
        'password':'',
        'qualification':'',
        'interests':'',
        'status':''
    });

    const handleChange=(event)=>{
        setStudentData({
            ...studentData,
            [event.target.name]:event.target.value
        });
    }

    const handleLogin =()=>{
        Swal.fire({
            title:'Success',
            text: 'You are Registered Now',
            icon: 'cosuccess',
            confirmButtonText: 'Continue'
        })
    }

    //Submit Form
    const submitForm=()=>{
        const studentFormData=new FormData();
        studentFormData.append("full_name", studentData.full_name)
        studentFormData.append("username", studentData.username)
        studentFormData.append("email", studentData.email)
        studentFormData.append("password", studentData.password)
        studentFormData.append("qualification", studentData.qualification)
        studentFormData.append("interests", studentData.interests)

        try{
            axios.post(baseUrl, studentFormData).then((response)=>{
                // console.log(response.data);
                setStudentData({
                    'full_name':'',
                    'username':'',
                    'email':'',
                    'password':'',
                    'qualification':'',
                    'interests':'',
                    'status':'success',
                });
            });
        }catch(error){
            console.log(error);
            setStudentData({'status':'error'})
        };
    };
    
    useEffect(()=>{
        document.title='Student Register'
    });

    const studentLoginStatus=localStorage.getItem('studentLoginStatus')
    if(studentLoginStatus==='true'){
        window.location.href='/user-dashboard';
    }

    
    return(
        <div className='container mt-4'>
            <div className='row'>
                <div className='col-6 offset-3'>
                {studentData.status==='success' && <p className='text-success'>Thanks for Register</p>}
                    {studentData.status==='error' && <p className='text-danger'>Something Went Wrong</p>}
                    <div className='card'>
                        <h5 className='card-header'>Student Register</h5>
                        <div className='card-body'>
                                <div className='mb-3'>
                                    <label for="exampleInputEmail" className='form-label'>Full Name</label>
                                    <input type='text' onChange={handleChange} name='full_name' className='form-control' />
                                </div>
                                <div className='mb-3'>
                                    <label for="exampleInputEmail" className='form-label'>Username</label>
                                    <input type='text' onChange={handleChange} name='username' className='form-control' />
                                </div>
                                <div className='mb-3'>
                                    <label for="exampleInputEmail" className='form-label'>Email</label>
                                    <input type='email' onChange={handleChange} name='email' className='form-control' />
                                </div>
                                <div className='mb-3'>
                                    <label for="exampleInputEmail" className='form-label'>Password</label>
                                    <input type='password' onChange={handleChange} name='password' className='form-control' id='exampleInputPassword1' />
                                </div>
                                <div className='mb-3'>
                                    <label for="exampleInputEmail" className='form-label'>Qualification</label>
                                    <input type='text' onChange={handleChange} name="qualification" className='form-control' id='exampleInputPassword1' />
                                </div>
                                <div className='mb-3'>
                                    <label for="exampleInputEmail" className='form-label'>Interests</label>
                                    <textarea className='form-control' onChange={handleChange} name='interests'></textarea>
                                    <div className='form-yext' id='emailHelp'>PHP, Python, JS, etc.</div>
                                </div>
                                <button type='button' onClick={function(event){ submitForm(); handleLogin();}} className='btn btn-primary'>Register</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register;
