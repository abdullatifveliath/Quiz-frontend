import React, { useContext, useState } from 'react';

import {
    MDBContainer,
    MDBNavbar,
    MDBNavbarBrand,
    MDBNavbarToggler,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBNavbarLink,
    MDBCollapse,
    MDBIcon
} from 'mdb-react-ui-kit';

import { Link, useNavigate } from 'react-router-dom';

import { userActiveContextApi } from '../ContextAPI/ContextShare';

function SubLoginHeader() {

    const location = useNavigate()

    const { activeUserRes, setActiveUserRes } = useContext(userActiveContextApi)

    const [openNav, setOpenNav] = useState(false);

    const dashboardClick = async (e) => {
        e.preventDefault()
        location(`/${activeUserRes.usertype}/dashboard`)
    }

    const manageQuizzesClick = async (e) => {
        e.preventDefault()
        location(`/${activeUserRes.usertype}/managequiz`)
    }

    const attendQuizClick = async (e) => {
        e.preventDefault()
        location(`/${activeUserRes.usertype}/attendquiz`)
    }

    const manageStudentClick = async (e) => {
        e.preventDefault()
        location(`/${activeUserRes.usertype}/managestudent`)
    }

    const manageTeacherClick = async (e) => {
        e.preventDefault()
        location(`/${activeUserRes.usertype}/manageteacher`)
    }

    return (
        <div>
            <MDBNavbar className='py-4' expand='lg' style={{ backgroundColor: "#a47ef5" }}>
                <MDBContainer fluid>

                    <MDBNavbarToggler
                        type='button'
                        aria-expanded='false'
                        aria-label='Toggle navigation'
                        onClick={() => setOpenNav(!openNav)}
                    >
                        <MDBIcon icon='bars' fas />
                    </MDBNavbarToggler>
                    <MDBCollapse navbar open={openNav}>
                        <MDBNavbarNav>

                            <MDBNavbarItem>
                                <MDBNavbarLink className='text-white me-2'>
                                    <span onClick={dashboardClick}>Dashboard</span>
                                </MDBNavbarLink>
                            </MDBNavbarItem>

                            {
                                activeUserRes.usertype == "admin" ?
                                    <MDBNavbarItem>
                                        <MDBNavbarLink className='text-white me-2'>
                                            <span onClick={manageTeacherClick}>Manage Teachers</span>
                                        </MDBNavbarLink>
                                    </MDBNavbarItem>
                                    :
                                    <></>
                            }

                            {
                                activeUserRes.usertype == "admin" || activeUserRes.usertype == "teacher" ?
                                    <MDBNavbarItem>
                                        <MDBNavbarLink className='text-white me-2'>
                                            <span onClick={manageStudentClick}>Manage Students</span>
                                        </MDBNavbarLink>
                                    </MDBNavbarItem>
                                    :
                                    <></>
                            }

                            {
                                activeUserRes.usertype == "admin" || activeUserRes.usertype == "teacher" ?
                                    <MDBNavbarItem>
                                        <MDBNavbarLink className='text-white me-2'>
                                            <span onClick={manageQuizzesClick}>Manage Quiz</span>
                                        </MDBNavbarLink>
                                    </MDBNavbarItem>
                                    :
                                    <></>
                            }

                            <MDBNavbarItem>
                                <MDBNavbarLink className='text-white me-2'>
                                    <span onClick={attendQuizClick}>Attend Quiz</span>
                                </MDBNavbarLink>
                            </MDBNavbarItem>

                        </MDBNavbarNav>
                    </MDBCollapse>
                </MDBContainer>
            </MDBNavbar>
        </div>
    )
}

export default SubLoginHeader