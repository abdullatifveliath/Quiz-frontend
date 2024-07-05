import React, { useContext, useState } from 'react'

import { Link, useNavigate } from 'react-router-dom'

import { loginAPI } from '../Services/allAPIs';

import { userActiveContextApi } from '../ContextAPI/ContextShare';

function Login({ userType }) {

    const location = useNavigate()

    const { activeUserRes, setActiveUserRes } = useContext(userActiveContextApi)

    // setActiveUserRes({})

    const [userData, setUserData] = useState({
        username: "",
        email: "",
        password: "",
        usertype: userType
    })

    const loginClick = async (e) => {
        e.preventDefault()
        setUserData({ ...userData, usertype: userType })
        const { email, password, usertype } = userData;
        if (!email || !password) {
            alert(`Please fill the form`)
        }
        else {
            const result = await loginAPI(userData)
            console.log(result);
            if (result.status == 200) {
                console.log("xxxxxxxxxx");
                console.log(result);
                if (result.data.user.active == "Active") {
                    alert("login successful")
                    sessionStorage.setItem("existingUser", JSON.stringify(result.data.user))
                    sessionStorage.setItem("token", result.data.token)
                    setActiveUserRes(result.data.user)
                    location(`/${usertype}/dashboard`)
                }
                else {
                    alert("Please wait for admin user to active your account")
                }
            }
            else {
                alert("Invalid Login")
            }
        }
        console.log(userData);
    }

    return (
        <div>
            <div className='d-flex align-items-center justify-content-center'>
                <div className='border rounded shadow m-5 p-3'>
                    <h1 className='text-center mt-4' style={{ color: "#8755F4" }}>
                        {userType == "admin" ? 'Admin' : userType == "teacher" ? 'Teacher' : 'Student'} Login
                    </h1>
                    <form className='p-4'>
                        <input value={userData.email} onChange={e => setUserData({ ...userData, email: e.target.value })} type="text" placeholder='Email' className='form-control mb-3' />
                        <input value={userData.password} onChange={e => setUserData({ ...userData, password: e.target.value })} type="password" placeholder='Password' className='form-control mb-3' />

                        <div className="text-center m-4">
                            <button onClick={e => loginClick(e)} className='btn mt-3' style={{ backgroundColor: "#BA9FF5" }}>Login</button>
                            {
                                userType == "admin" ?
                                    <></>
                                    :
                                    userType == "teacher" ?
                                        <Link to={`/register/teacher`}>
                                            <p className='mt-3' style={{ textDecoration: 'none', color: 'blue' }}>New to here? Please Register...</p>
                                        </Link>
                                        :
                                        <Link to={`/register/student`}>
                                            <p className='mt-3' style={{ textDecoration: 'none', color: 'blue' }}>New to here? Please Register...</p>
                                        </Link>
                            }
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login