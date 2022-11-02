import React from 'react';
import {useEffect, useState} from 'react'
import axios from 'axios';
import Swal from 'sweetalert2'

const baseUrl='http://127.0.0.1:8000/api/teacher/';

function TeacherRegister(){
    const [teacherData, setTeacherData]=useState({
        'full_name':'',
        'email':'',
        'password':'',
        'mobile_no':'',
        'qualification':'',
        'skills':'',
        'status':'',
    });

    // Change Element Value
    const handleChange=(event)=>{
        setTeacherData({
            ...teacherData,
            [event.target.name]:event.target.value
        });
    }
    //console.log(teacherData);
    //End

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
        const teacherFormData=new FormData();
        teacherFormData.append("full_name", teacherData.full_name)
        teacherFormData.append("email", teacherData.email)
        teacherFormData.append("password", teacherData.password)
        teacherFormData.append("mobile_no", teacherData.mobile_no)
        teacherFormData.append("qualification", teacherData.qualification)
        teacherFormData.append("skills", teacherData.skills)

        try{
            axios.post(baseUrl, teacherFormData).then((response)=>{
                // console.log(response.data);
                setTeacherData({
                    'full_name':'',
                    'email':'',
                    'password':'',
                    'mobile_no':'',
                    'qualification':'',
                    'skills':'',
                    'status':'success',
                });
            });
        }catch(error){
            console.log(error);
            setTeacherData({'status':'error'})
        };
    };
    //End 

    useEffect(()=>{
        document.title='Trainer Register'
    });

    const teacherLoginStatus=localStorage.getItem('teacherLoginStatus')
    if(teacherLoginStatus==='true'){
        window.location.href='/teacher-dashboard';
    }


    return(
        <div className='container mt-4'>
            <div className='row'>
                <div className='col-6 offset-3'>
                    {teacherData.status==='success' && <p className='text-success'>Thanks for Register</p>}
                    {!teacherData.status==='error' && <p className='text-danger'>Something Went Wrong</p>}
                    <div className='card'>
                        <h5 className='card-header'>Trainer Register</h5>
                        <div className='card-body'>
                            <form > 
                                <div className='mb-3'>
                                    <label for="exampleInputEmail1" className='form-label'>Full Name</label>
                                    <input value={teacherData.full_name} onChange={handleChange} type='text' name='full_name' className='form-control' />
                                </div>
                                <div className='mb-3'>
                                    <label for="exampleInputEmail1" className='form-label'>Email</label>
                                    <input value={teacherData.email} onChange={handleChange} type='email' name="email" className='form-control' />
                                </div>
                                <div className='mb-3'>
                                    <label for="exampleInputEmail1" className='form-label'>Password</label>
                                    <input value={teacherData.password} onChange={handleChange}  type='password' name="password" className='form-control' id='exampleInputPassword1' />
                                </div>
                                <div className='mb-3'>
                                    <label for="exampleInputEmail1" className='form-label'>Phone Number</label>
                                    <input value={teacherData.mobile_no} onChange={handleChange} type='number'name="mobile_no" className='form-control' />
                                </div>
                                <div className='mb-3'>
                                    <label for="exampleInputEmail1" className='form-label'>Qualifications</label>
                                    <input value={teacherData.qualification} onChange={handleChange}type='text' name="qualification" className='form-control' />
                                </div>
                                
                                <div className='mb-3'>
                                    <label for="exampleInputEmail1" className='form-label'>Skills</label>
                                    <textarea value={teacherData.skills} onChange={handleChange} name="skills" className='form-control'></textarea>
                                    <div className='form-yext' id='emailHelp'>PHP, Python, JS, etc.</div>
                                </div>
                                <button onClick={function(event){ submitForm(); handleLogin();}} type='button' className='btn btn-primary'>Register</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TeacherRegister;
