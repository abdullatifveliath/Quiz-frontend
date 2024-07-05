import React from 'react'

import AdminUserImage from "../Assets/adminUser.png"
import StudentUserImage from "../Assets/studentUser.png"
import TeacherUserImage from "../Assets/teacherUser.png"

import { Link } from 'react-router-dom'

function LoginSelection() {
    return (
        <div className='m-5 p-5'>
            <h1 className='text-center mb-5' style={{ color: "#8A56F8" }}>Login</h1>
            <div className='d-sm-flex align-items-center justify-content-center text-center'>
                <Link to="/login/admin" className='mx-4'>
                    <div className='border p-4 bg-light shadow rounded'>
                        <img src={AdminUserImage} alt="" width={"100px"} height={"100px"} /><br />
                        <h5 className='pt-3'>Admin</h5>
                    </div>
                </Link>
                <Link to="/login/teacher" className='mx-4'>
                    <div className='border p-4 bg-light shadow rounded'>
                        <img src={TeacherUserImage} alt="" width={"100px"} height={"100px"} /><br />
                        <h5 className='pt-3'>Teacher</h5>
                    </div>
                </Link>
                <Link to="/login/student" className='mx-4'>
                    <div className='border p-4 bg-light shadow rounded'>
                        <img src={StudentUserImage} alt="" width={"100px"} height={"100px"} /><br />
                        <h5 className='pt-3'>Student</h5>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default LoginSelection