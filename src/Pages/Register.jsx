import React, { useState } from 'react'

import { Link } from 'react-router-dom'

import { registerAPI } from '../Services/allAPIs'

function Register({ userType }) {

    const [userData, setUserData] = useState({
        username: "",
        email: "",
        password: "",
        usertype: userType,
        active: userType == "student" ? "Active" : "Inactive"
    })

    const registerData = async (e) => {
        e.preventDefault()
        setUserData({ ...userData, usertype: userType })
        const { username, email, password } = userData;
        if (!username || !email || !password) {
            alert(`Please fill the form`)
        }
        else {
            const result = await registerAPI(userData)
            console.log(result);
            if (result.status == 200) {
                alert(result.data)
                // location('/login')
            }
            else {
                alert(result.response.data)
            }
        }
        console.log(userData);
    }

    return (
        <div>
            <div className='d-flex align-items-center justify-content-center'>
                <div className='border rounded shadow m-5 p-3'>
                    <h1 className='text-center mt-4' style={{ color: "#8755F4" }}>
                        {userType == "admin" ? 'Admin' : userType == "teacher" ? 'Teacher' : 'Student'} Registration
                    </h1>
                    <form className='p-4'>
                        <input value={userData.username} onChange={e => setUserData({ ...userData, username: e.target.value })} type="text" placeholder='Username' className='form-control mb-3' />
                        <input value={userData.email} onChange={e => setUserData({ ...userData, email: e.target.value })} type="text" placeholder='Email' className='form-control mb-3' />
                        <input value={userData.password} onChange={e => setUserData({ ...userData, password: e.target.value })} type="password" placeholder='Password' className='form-control mb-3' />
                        <div className="text-center m-4">
                            <button onClick={e => registerData(e)} className='btn mt-3' style={{ backgroundColor: "#BA9FF5" }}>Register</button>
                            {
                                userType == "admin" ?
                                    <Link to={`/login/admin`}>
                                        <p className='mt-3' style={{ textDecoration: 'none', color: 'blue' }}>Already registered? Please login from here...</p>
                                    </Link>
                                    :
                                    userType == "teacher" ?
                                        <Link to={`/login/teacher`}>
                                            <p className='mt-3' style={{ textDecoration: 'none', color: 'blue' }}>Already registered? Please login from here...</p>
                                        </Link>
                                        :
                                        <Link to={`/login/student`}>
                                            <p className='mt-3' style={{ textDecoration: 'none', color: 'blue' }}>Already registered? Please login from here...</p>
                                        </Link>
                            }
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register