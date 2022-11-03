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
                <div className='col-4 mx-auto'>
                    <div className='card'>
                        {studentData.status==='success' && <p className='text-success'>Thanks for Register</p>}
                        {studentData.status==='error' && <p className='text-danger'>Something Went Wrong</p>}
                        <div className='card-body'>
                        <p className='fs-4 text-center  mt-3 mb-3'>Student Register</p>
                        <hr/>
                            <div className='mb-3 mt-3'>
                                <input type='text' onChange={handleChange} name='full_name' className='form-control mt-3' placeholder='Name' />
                            </div>
                            <div className='mb-3'>
                                <input type='text' onChange={handleChange} name='username' className='form-control' placeholder='Username' />
                            </div>
                            <div className='mb-3'>
                                <input type='email' onChange={handleChange} name='email' className='form-control' placeholder='Email'/>
                            </div>
                            <div className='mb-3'>
                                <input type='password' onChange={handleChange} name='password' className='form-control' id='exampleInputPassword1' placeholder='Password' />
                            </div>
                            <div className='mb-3'>
                                <input type='text' onChange={handleChange} name="qualification" className='form-control' id='exampleInputPassword1' placeholder='Qualification' />
                            </div>
                            <div className='mb-3'>
                                <textarea className='form-control' onChange={handleChange} name='interests' placeholder='Interests: , Security, Python (Comma Saparated Value'></textarea>
                            </div>
                            <div className='text-center mt-3'>
                            <button type='button' onClick={function(event){ submitForm(); handleLogin();}} className='btn btn-primary'>Register</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register;
