import React from 'react'
import Footer from './Footer';
import {Routes as Switch,Route} from 'react-router-dom';
import TeacherRegister from './Teacher/TeacherRegister';
import TeacherLogin from './Teacher/TeacherLogin';
import Login from './User/Login';
import Register from './User/Register';

function LogReg() {
    return (
         <div className="App">
            <Switch>
                {/* Teacher */}
                <Route path="/teacher-login" element={<TeacherLogin />} />
                <Route path="/teacher-register" element={<TeacherRegister />} />

                {/* Student */}
                <Route path="/user-login" element={<Login />} />
                <Route path="/user-register" element={<Register />} />
            </Switch>
            <Footer />
        </div>
    );
}
export default LogReg;

    