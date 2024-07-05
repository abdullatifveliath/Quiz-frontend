import React, { useEffect, useState } from 'react'

import { useParams } from 'react-router-dom'

import { getSingleUserAPI } from '../Services/allAPIs'

import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';

function ViewResult() {

    const { quid } = useParams()

    const [userName, setUserName] = useState("")

    const [quizData, setQuizData] = useState({})

    const fetchQuizData = async () => {
        try {
            console.log(quid);
            const result = await getSingleUserAPI(quid)
            console.log("result");
            console.log(result.data);
            if (result.status == 200) {
                setUserName(result.data.username)
                setQuizData(result.data.results)
            }
            else {
                alert("Failed to get Quiz")
            }
        }
        catch (err) {
            alert("Error getting Quiz" + err.message)
        }
    }
    console.log(quizData);

    useEffect(() => {
        fetchQuizData()
    }, [])

    return (
        <div>
            <div className="border shadow rounded m-5 p-5">
                <h1 className='px-3 pb-4' style={{ color: "#8755F4" }}><i><u>User {userName} Quiz Results</u></i></h1>
                {
                    quizData.length > 0 ?
                        <>
                            <MDBTable align='middle'>
                                <MDBTableHead>
                                    <tr>
                                        <th scope='col' className='fw-bold'>Quiz Name</th>
                                        <th scope='col' className='fw-bold'>Total Questions</th>
                                        <th scope='col' className='fw-bold'>Score</th>
                                        <th scope='col' className='fw-bold'>Out Of</th>
                                        <th scope='col' className='fw-bold'>Correct Answers</th>
                                        <th scope='col' className='fw-bold'>Wrong Answers</th>
                                    </tr>
                                </MDBTableHead>
                                <MDBTableBody>
                                    {
                                        quizData.map((item) => (
                                            <tr>
                                                <td>
                                                    <div className='d-flex align-items-center'>
                                                        <p className='mb-1'><i>{item.quizname}</i></p>
                                                    </div>
                                                </td>
                                                <td>
                                                    <p className='fw-normal mb-1'>{item.noofquestions}</p>
                                                </td>
                                                <td>
                                                    <p className='fw-normal mb-1'>{item.score}</p>
                                                </td>
                                                <td>
                                                    <p className='fw-normal mb-1'>{item.maximumscore}</p>
                                                </td>
                                                <td>
                                                    <p className='fw-normal mb-1'>{item.correctanswers}</p>
                                                </td>
                                                <td>
                                                    <p className='fw-normal mb-1'>{item.wronganswers}</p>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </MDBTableBody>
                            </MDBTable>
                        </>
                        :
                        <>
                            <h3 className='text-center mt-3'>- No quizzes attempted -</h3>
                        </>
                }
            </div>
        </div>
    )
}

export default ViewResult