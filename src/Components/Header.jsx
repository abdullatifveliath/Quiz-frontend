import React, { useContext, useEffect, useState } from 'react'

import {
    MDBContainer,
    MDBNavbar,
    MDBNavbarBrand,
    MDBNavbarToggler,
    MDBIcon,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBNavbarLink,
    MDBCollapse,
} from 'mdb-react-ui-kit';

import { Link, useNavigate } from 'react-router-dom';

import { userActiveContextApi } from '../ContextAPI/ContextShare';

function Header() {

    const location = useNavigate()

    const { activeUserRes, setActiveUserRes } = useContext(userActiveContextApi)

    const [openBasic, setOpenBasic] = useState(false);

    const logOutClick = async (e) => {
        e.preventDefault()
        setActiveUserRes("")
        sessionStorage.setItem("existingUser", "")
        location('/')
    }

    const activeLogInClick = async (e) => {
        e.preventDefault()
        location(`/${activeUserRes.usertype}/dashboard`)
    }

    useEffect(() => {
        if (sessionStorage.getItem('existingUser'))
            if (sessionStorage.getItem('existingUser') != "") {
                // console.log(sessionStorage.getItem('existingUser'));
                setActiveUserRes(JSON.parse(sessionStorage.getItem('existingUser')));
            }
    }, [])

    return (
        <div>

            <MDBNavbar expand='lg' style={{ backgroundColor: "#8755F4" }}>
                <MDBContainer fluid>
                    <Link to="/" className='me-4'>
                        <MDBNavbarBrand className='text-white'>
                            <i className="fa-solid fa-lightbulb fs-1 me-2" style={{ color: "#FFD43B" }}></i>
                            Quiz Quest
                        </MDBNavbarBrand>
                    </Link>

                    <MDBNavbarToggler
                        aria-controls='navbarSupportedContent'
                        aria-expanded='false'
                        aria-label='Toggle navigation'
                        onClick={() => setOpenBasic(!openBasic)}
                    >
                        <MDBIcon icon='bars' fas />
                    </MDBNavbarToggler>

                    <MDBCollapse navbar open={openBasic}>
                        <MDBNavbarNav className='mr-auto mb-2 mb-lg-0'>
                            <Link to="/">
                                <MDBNavbarItem>
                                    <MDBNavbarLink className='text-white' active aria-current='page'>
                                        Home
                                    </MDBNavbarLink>
                                </MDBNavbarItem>
                            </Link>

                            <Link to="/login">
                                <MDBNavbarItem>
                                    <MDBNavbarLink className='text-white' active aria-current='page'>
                                        Login
                                    </MDBNavbarLink>
                                </MDBNavbarItem>
                            </Link>

                            <Link to="/register">
                                <MDBNavbarItem>
                                    <MDBNavbarLink className='text-white' active aria-current='page'>
                                        Register
                                    </MDBNavbarLink>
                                </MDBNavbarItem>
                            </Link>

                            {
                                activeUserRes != "" ?
                                    <MDBNavbarNav className='justify-content-end mb-2 mb-lg-0'>
                                        <MDBNavbarItem>
                                            <MDBNavbarLink className='text-white' active aria-current='page'>
                                                <i className="fa-solid fs-5 fa-user" onClick={activeLogInClick} style={{ color: "#FFD43B" }}></i>
                                                <span className='ms-2 me-4' onClick={activeLogInClick}>{activeUserRes.username}</span>
                                                <span className='border rounded p-1' onClick={e => logOutClick(e)}>Log Out</span>
                                            </MDBNavbarLink>
                                        </MDBNavbarItem>
                                    </MDBNavbarNav>
                                    :
                                    <></>
                            }
                            
                        </MDBNavbarNav>
                    </MDBCollapse>
                </MDBContainer>
            </MDBNavbar>

        </div >
    )
}

export default Header