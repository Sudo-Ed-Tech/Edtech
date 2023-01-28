import React from 'react';
import {useEffect, useState} from 'react'
import axios from 'axios';
import Swal from 'sweetalert2'

const baseUrl='http://127.0.0.1:8000/api/elearning/teacher/';

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
    if(teacherLoginStatus===true){
        window.location.href='/teacher-dashboard';
    }


    return(
        <div className='container mt-4'>
            <div className='row'>
                <div className='col-4 mx-auto'>
                    {teacherData.status==='success' && <p className='text-success'>Thanks for Register</p>}
                    {!teacherData.status==='error' && <p className='text-danger'>Something Went Wrong</p>}
                    <div className='card'>
                        <div className='card-body'>
                            <p className='fs-4 text-center mt-3 mb-3'>Trainer Register</p>
                            <hr />
                            <form > 
                                <div className='mb-3 mt-5'>
                                    <input value={teacherData.full_name} onChange={handleChange} type='text' name='full_name' className='form-control' placeholder='Name' />
                                </div>
                                <div className='mb-3'>
                                    <input value={teacherData.email} onChange={handleChange} type='email' name="email" className='form-control' placeholder='Email' />
                                </div>
                                <div className='mb-3'>
                                    <input value={teacherData.password} onChange={handleChange}  type='password' name="password" className='form-control' id='exampleInputPassword1' placeholder='Password' />
                                </div>
                                <div className='mb-3'>
                                    <input value={teacherData.mobile_no} onChange={handleChange} type='text'name="mobile_no" className='form-control' placeholder='Phone'/>
                                </div>
                                <div className='mb-3'>
                                    <input value={teacherData.qualification} onChange={handleChange}type='text' name="qualification" className='form-control' placeholder='Qualification' />
                                </div>
                                
                                <div className='mb-3'>
                                    <textarea value={teacherData.skills} onChange={handleChange} name="skills" className='form-control' placeholder='Skills: Python, PHP (Enter Comma Separated values)'></textarea>
                                </div>
                                <div className='text-center mt-5 '>
                                    <button onClick={function(event){ submitForm(); handleLogin();}} type='button' className='btn btn-primary'>Register</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TeacherRegister;
