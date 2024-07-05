import React, { useContext, useEffect, useState } from 'react'

import { MDBInput } from 'mdb-react-ui-kit';

import { addQuizAPI, allQuizAPI, deleteQuizAPI, updateQuizAPI } from "../Services/allAPIs"

import { allQuizzesContextApi, userActiveContextApi } from '../ContextAPI/ContextShare';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { useNavigate } from 'react-router-dom';

function ManageQuizzes() {

    const location = useNavigate()

    const { activeUserRes, setActiveUserRes } = useContext(userActiveContextApi)

    const { allQuizzesRes, setAllQuizzesRes } = useContext(allQuizzesContextApi)

    const [quizDetails, setQuizDetails] = useState({
        title: ""
    })

    // To hold token from session storage
    const [token, setToken] = useState("")

    const getAllQuizzes = async () => {
        try {
            const result = await allQuizAPI()
            if (result.status == 200) {
                setAllQuizzesRes(result.data)
                console.log(allQuizzesRes);
            }
            else {
                alert("Failed to get Quiz")
            }
        }
        catch (err) {
            alert("Error getting Quiz" + err.message)
        }
    }

    const quizAdd = async () => {
        const { title } = quizDetails
        if (!title) {
            alert('Please fill all details')
        }
        else {
            const reqBody = new FormData();
            reqBody.append("title", title);
            console.log(`Title : ${title}`);
            const result = await addQuizAPI(reqBody);
            console.log(result);
            if (result.status === 200) {
                alert('Quiz added successfully')
                console.log(result.data);
                setQuizDetails({
                    title: ""
                })
                getAllQuizzes()
            }
            else {
                console.log(result.response.data);
            }
        }
    }

    const veiwQuizClick = async (item) => {
        location(`/${activeUserRes.usertype}/managequiz/${item._id}`)
    }

    const editQuizClick = async () => {
        const { title } = quizData
        const reqBody = new FormData()
        reqBody.append("title", title)
        const result = await updateQuizAPI(quizData._id, reqBody)
        if (result.status == 200) {
            console.log(result.data);
            setQuizData(result.data)
            getAllQuizzes()
            alert('Quiz updated successfully')
        }
        else {
            console.log(result.response.data);
            setQuizData(result.response.data)
        }
    }

    const removeQuizClick = async (qid) => {
        const result = await deleteQuizAPI(qid)
        console.log(result);
        getAllQuizzes()
        alert('Quiz deleted successfully')
    }

    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
    }

    const handleShow = (item) => {
        setQuizData(item)
        setShow(true);
    }
    
    const handleUpdate = () => {
        setShow(false);
        editQuizClick()
    }

    const [quizData, setQuizData] = useState("");

    useEffect(() => {
        if (sessionStorage.getItem('token')) {
            setToken(sessionStorage.getItem('token'))
        }
        getAllQuizzes()
    }, [])

    return (
        <div>
            <div className="border shadow rounded m-5 p-4">
                <h1 className='' style={{ color: "#8755F4" }}><i><u>Create New Quiz</u></i></h1>
                <form className='my-4' action="">
                    <input value={quizDetails.title} onChange={e => setQuizDetails({ ...quizDetails, title: e.target.value })} type="text" placeholder='Enter new quiz title...' className='form-control' />
                </form>
                <a onClick={quizAdd} className='text-white btn rounded-pill' style={{ backgroundColor: "#8755F4" }}>Add Quiz</a>
            </div>
            <div className="border shadow rounded m-5 p-4">
                <h1 className='mb-4 ms-4' style={{ color: "#8755F4" }}><i><u>All Quizzes</u></i></h1>
                <Row className='mx-2 mb-2'>
                    {
                        Array.isArray(allQuizzesRes) && allQuizzesRes.map(item => (
                            <Col sm={12} md={12} lg={6} xl={4}>
                                <div className='border border-1 border-dark rounded shadow m-2 p-3' key={item._id}>
                                    <h3 className='text-center' style={{ color: "#8755F4" }}><i>" {item.title} "</i></h3>
                                    <hr />
                                    <div className="d-flex justify-content-center">
                                        <button onClick={() => veiwQuizClick(item)} className='text-white btn rounded-pill' style={{ backgroundColor: "#8755F4" }}>Open Quiz</button>
                                        <Button onClick={() => handleShow(item)} className='text-white btn mx-2 rounded-pill' style={{ backgroundColor: "#8755F4" }} variant="primary">
                                            Edit Quiz
                                        </Button>

                                        <Modal size='lg' centered show={show} onHide={handleClose}>
                                            <Modal.Header closeButton>
                                                <Modal.Title>Edit Quiz Info</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                                <MDBInput
                                                    value={quizData.title}
                                                    onChange={(e) => setQuizData({ ...quizData, title: e.target.value })}
                                                    label='Title'
                                                    type='text'
                                                />
                                            </Modal.Body>
                                            <Modal.Footer>
                                                <Button variant="secondary" onClick={handleClose}>
                                                    Close
                                                </Button>
                                                <Button variant="primary" onClick={() => handleUpdate()}>
                                                    Save Changes
                                                </Button>
                                            </Modal.Footer>
                                        </Modal>
                                        <button onClick={() => removeQuizClick(item?._id)} className='text-white btn rounded-pill' style={{ backgroundColor: "#8755F4" }}>Delete Quiz</button>
                                    </div>
                                </div>
                            </Col>
                        ))
                    }
                </Row>
            </div>
        </div>
    )
}

export default ManageQuizzes