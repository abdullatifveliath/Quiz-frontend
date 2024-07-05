import React from 'react'

import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';

function Footer() {
    return (
        <div>

            <MDBFooter className='text-center text-lg-start text-muted' style={{backgroundColor:"#8755F4"}}>
                <section className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom'>
                    <div className='me-5 d-none d-lg-block text-white'>
                        <span>Get connected with us on social networks:</span>
                    </div>

                    <div className='text-white'>
                        <a href='/' className='me-4 text-reset'>
                            <MDBIcon fab icon="facebook-f" />
                        </a>
                        <a href='/' className='me-4 text-reset'>
                            <MDBIcon fab icon="twitter" />
                        </a>
                        <a href='/' className='me-4 text-reset'>
                            <MDBIcon fab icon="google" />
                        </a>
                        <a href='/' className='me-4 text-reset'>
                            <MDBIcon fab icon="instagram" />
                        </a>
                        <a href='/' className='me-4 text-reset'>
                            <MDBIcon fab icon="linkedin" />
                        </a>
                        <a href='/' className='me-4 text-reset'>
                            <MDBIcon fab icon="github" />
                        </a>
                    </div>
                </section>

                <section className='text-white'>
                    <MDBContainer className='text-center text-md-start mt-5'>
                        <MDBRow className='mt-3'>
                            <MDBCol md="3" lg="4" xl="3" className='mx-auto mb-4'>
                                <h6 className='text-uppercase fw-bold mb-4'>
                                    <MDBIcon icon="gem" className="me-3" />
                                    Quiz Quest
                                </h6>
                                <p>
                                    Thank you for quizzing with us! Keep sharpening your mind with our diverse range of quizzes. Stay curious and continue your quest for knowledge.
                                </p>
                            </MDBCol>

                            <MDBCol md="2" lg="2" xl="2" className='mx-auto mb-4'>
                                <h6 className='text-uppercase fw-bold mb-4'>Utilities</h6>
                                <p>
                                    Teachers
                                </p>
                                <p>
                                    Students
                                </p>
                            </MDBCol>

                            <MDBCol md="4" lg="3" xl="3" className='mx-auto mb-md-0 mb-4'>
                                <h6 className='text-uppercase fw-bold mb-4'>Contact</h6>
                                <p>
                                    <MDBIcon icon="envelope" className="me-3" />
                                    abdullikes@gmail.com
                                </p>
                                <p>
                                    <MDBIcon icon="phone" className="me-3" /> + 91 6235731116
                                </p>
                                <p>
                                    <MDBIcon icon="print" className="me-3" /> + 01 234 567 89
                                </p>
                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>
                </section>

                <div className='text-center p-4 text-white' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
                    &copy; {new Date().getFullYear()} Copyright:{' '}
                    <a className='text-reset fw-bold' href='/'>
                        QuizQuest.com
                    </a>
                </div>
            </MDBFooter>

        </div>
    )
}

export default Footer