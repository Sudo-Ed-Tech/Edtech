import React from 'react';
import {useEffect, useState} from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'
const baseUrl='http://127.0.0.1:8000/api/elearning';

function TeacherLogin(){
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
                <div className='col-3 mx-auto mt-5'>
                    <div className='card mt-5'>
                        <div className='card-body'>
                            <p className='fs-3 text-center mt-3'>Trainer Login</p>
                            
                            {errorMsg && <p className='text-danger text-center'>{errorMsg}</p>}
                            <hr  />
                            <form className='mb-5'>
                                <div className='mb-3 mt-5' style={{decoration:'none'}}>
                                    
                                    <input value={teacherLoginData.email} onChange={handleChange} name="email" type="email" className="form-control  text-center" placeholder='Email' />
                                </div>
                                <div className='mb-5 '>
                                    <input value={teacherLoginData.password} onChange={handleChange} name="password" type="password" className="form-control text-center " id="exampleInputPassword1" placeholder='Password' />
                                </div>
                                <div className='text-center m-5 '>
                                    <button  type="button" onClick={function(event){ submitForm(); handleLogin();}} className='btn btn-primary px-5'>Login</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>  
        </div>
    )
}
 
export default TeacherLogin;