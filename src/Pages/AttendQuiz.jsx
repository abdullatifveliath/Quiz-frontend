import React, { useContext, useEffect, useState } from 'react';

import { allQuizAPI } from "../Services/allAPIs";

import { allQuizzesContextApi, userActiveContextApi } from '../ContextAPI/ContextShare';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { useNavigate } from 'react-router-dom';

function AttendQuiz() {

    const location = useNavigate()

    // To hold token from session storage
    const [token, setToken] = useState("")

    const { activeUserRes, setActiveUserRes } = useContext(userActiveContextApi)

    const { allQuizzesRes, setAllQuizzesRes } = useContext(allQuizzesContextApi)

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

    const attendQuizClick = async (qid) => {
        location(`/${activeUserRes.usertype}/attendquiz/${qid}`)
    }

    useEffect(() => {
        if (sessionStorage.getItem('token')) {
            setToken(sessionStorage.getItem('token'))
        }
        getAllQuizzes()
    }, [])

    return (
        <div>
            <div className="border shadow rounded m-5 p-4">
                <h1 className='mb-4 ms-4' style={{ color: "#8755F4" }}><i><u>All Quizzes</u></i></h1>
                <Row className='mx-2 mb-2'>
                    {
                        Array.isArray(allQuizzesRes) && allQuizzesRes.map(item => (
                            item.questions.length > 0 ?
                                <Col sm={12} md={12} lg={6} xl={4}>
                                    <div className='border border-1 border-dark rounded shadow m-2 p-3' key={item._id}>
                                        <h3 className='text-center' style={{ color: "#8755F4" }}><i>" {item.title} "</i></h3>
                                        <hr />
                                        <div className="d-flex justify-content-center">
                                            <button onClick={() => attendQuizClick(item._id)} className='text-white btn rounded-pill' style={{ backgroundColor: "#8755F4" }}>Attend Quiz</button>
                                        </div>
                                    </div>
                                </Col>
                                :
                                <></>
                        ))
                    }
                </Row>
            </div>
        </div>
    )
}

export default AttendQuiz