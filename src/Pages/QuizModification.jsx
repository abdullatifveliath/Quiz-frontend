import React, { useEffect, useState } from 'react'

import { MDBInput, MDBRadio } from 'mdb-react-ui-kit';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { useParams } from 'react-router-dom';

import { singleQuizAPI, addQuizQuestionAPI, deleteQuizQuestionAPI, updateQuizQuestionAPI } from '../Services/allAPIs';

function QuizModification() {

    const [questionData, setQuestionData] = useState({
        question: "",
        option1: "",
        option2: "",
        option3: "",
        option4: ""
    });

    const [editQuestionData, setEditQuestionData] = useState({
        question: "",
        option1: "",
        option2: "",
        option3: "",
        option4: ""
    });

    const [quizData, setQuizData] = useState({});

    const [optionSelected, setOptionSelected] = useState("option1");

    const { qid } = useParams()

    const fetchQuizData = async () => {
        try {
            const result = await singleQuizAPI(qid)
            if (result.status == 200) {
                setQuizData(result.data)
            }
            else {
                alert("Failed to get Quiz")
            }
        }
        catch (err) {
            alert("Error getting Quiz" + err.message)
        }
    }

    const questionSaveClick = async () => {
        const reqBody = new FormData()
        reqBody.append("title", quizData.title)
        reqBody.append("question", questionData.question)
        reqBody.append("option1", questionData.option1)
        reqBody.append("option2", questionData.option2)
        reqBody.append("option3", questionData.option3)
        reqBody.append("option4", questionData.option4)
        reqBody.append("answer", optionSelected)
        const result = await addQuizQuestionAPI(quizData._id, reqBody)
        if (result.status == 200) {
            console.log(result.data);
            fetchQuizData()
            setQuestionData({
                question: "",
                option1: "",
                option2: "",
                option3: "",
                option4: ""
            })
            alert('Quiz updated successfully')
        }
        else {
            console.log(result.response.data);
        }
    }

    const questionRemoveClick = async (qid, questionId) => {
        await deleteQuizQuestionAPI(qid, questionId)
        fetchQuizData()
        alert('Quiz question removed successfully')
    }

    const questionEditClick = async (qid, questionId) => {
        const reqBody = new FormData()
        console.log(optionSelected);
        console.log(editQuestionData);
        console.log(qid, questionId);
        reqBody.append("question", editQuestionData.question)
        reqBody.append("option1", editQuestionData.option1)
        reqBody.append("option2", editQuestionData.option2)
        reqBody.append("option3", editQuestionData.option3)
        reqBody.append("option4", editQuestionData.option4)
        reqBody.append("answer", optionSelected)
        const result = await updateQuizQuestionAPI(qid, questionId, reqBody)
        if (result.status == 200) {
            fetchQuizData()
            console.log(result);
            alert('Quiz question updated successfully')
        }
        else {
            console.log(result);
            alert('Quiz question updation failed')
        }
    }

    const optionClick = (str) => {
        setOptionSelected(str);
    }

    const [show, setShow] = useState(false);
    
    const handleClose = () => {
        setShow(false);
    }

    const handleShow = (question) => {
        console.log(question);
        setEditQuestionData({
            questionId: question._id,
            question: question.question,
            option1: question.option1,
            option2: question.option2,
            option3: question.option3,
            option4: question.option4
        });
        setShow(true);
    }

    const handleUpdate = (qid) => {
        questionEditClick(qid, editQuestionData.questionId)
        setShow(false);
    }

    useEffect(() => {
        fetchQuizData()
    }, [])

    return (
        <div>
            <div className='d-flex align-items-center justify-content-center'>
                <div className="mx-5 mt-5 p-4 border shadow rounded w-75">
                    <h1 className='px-3 pb-4' style={{ color: "#8755F4" }}><i><u>Create new question</u></i></h1>
                    <div className="mb-4 mx-3">
                        <MDBInput
                            value={questionData.question}
                            onChange={e => setQuestionData({ ...questionData, question: e.target.value })}
                            label='Type the question...'
                            type='text'
                        />
                    </div>
                    <div className="d-flex align-items-center justify-content-center m-3">
                        <MDBRadio onClick={() => optionClick("option1")} className='me-2' name='flexRadioDefault' id='flexRadioDefault1' label='' defaultChecked />
                        <MDBInput
                            value={questionData.option1}
                            onChange={e => setQuestionData({ ...questionData, option1: e.target.value })}
                            label='Type option 1 answer...'
                            type='text'
                        />
                    </div>
                    <div className="d-flex align-items-center justify-content-center m-3">
                        <MDBRadio onClick={() => optionClick("option2")} className='me-2' name='flexRadioDefault' id='flexRadioDefault1' label='' />
                        <MDBInput
                            value={questionData.option2}
                            onChange={e => setQuestionData({ ...questionData, option2: e.target.value })}
                            label='Type option 2 answer...'
                            type='text'
                        />
                    </div>
                    <div className="d-flex align-items-center justify-content-center m-3">
                        <MDBRadio onClick={() => optionClick("option3")} className='me-2' name='flexRadioDefault' id='flexRadioDefault1' label='' />
                        <MDBInput
                            value={questionData.option3}
                            onChange={e => setQuestionData({ ...questionData, option3: e.target.value })}
                            label='Type option 3 answer...'
                            type='text'
                        />
                    </div>
                    <div className="d-flex align-items-center justify-content-center m-3">
                        <MDBRadio onClick={() => optionClick("option4")} className='me-2' name='flexRadioDefault' id='flexRadioDefault1' label='' />
                        <MDBInput
                            value={questionData.option4}
                            onChange={e => setQuestionData({ ...questionData, option4: e.target.value })}
                            label='Type option 4 answer...'
                            type='text'
                        />
                    </div>
                    <div className="d-flex align-items-center justify-content-between mx-3 mt-4">
                        <p className='text-danger pt-3'><i>( * Select the option for the correct answer. )</i></p>
                        <Button onClick={() => questionSaveClick()} className='text-white btn rounded-pill' style={{ backgroundColor: "#8755F4" }} variant="primary">
                            Save Question
                        </Button>
                    </div>
                </div>
            </div>
            <div className='d-flex align-items-center justify-content-center'>
                <div className="m-5 p-4 border shadow rounded w-75">
                    <h1 className='px-3 pb-2' style={{ color: "#8755F4" }}><i><u>{quizData ? quizData.title : ""}</u></i></h1>
                    <hr />
                    {
                        Array.isArray(quizData.questions) && quizData.questions.map((item, index) => (
                            <div>
                                <p className='ps-4 ms-4'><b>Question {index+1})</b> {item.question}</p>
                                <p className='ps-4 ms-4'>
                                    <b>1)</b> {item.option1}<br />
                                    <b>2)</b> {item.option2}<br />
                                    <b>3)</b> {item.option3}<br />
                                    <b>4)</b> {item.option4}
                                </p>
                                <p className='ps-4 ms-4'>
                                    <b>Answer)</b> {item.answer.charAt(0).toUpperCase() + item.answer.slice(1, 6) + " " + item.answer.slice(-1)}
                                </p>
                                <Button onClick={() => handleShow(item)} style={{ backgroundColor: "#8755F4" }} className='text-white btn ms-5 rounded-pill' variant="primary">
                                    Edit Question
                                </Button>
                                <Modal size='lg' centered show={show} onHide={handleClose}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Edit Quiz Question Info</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <div className="mb-4 mx-3">
                                            <MDBInput
                                                value={editQuestionData.question}
                                                onChange={e => setEditQuestionData({ ...editQuestionData, question: e.target.value })}
                                                label='Type the question...'
                                                type='text'
                                            />
                                        </div>
                                        <div className="d-flex align-items-center justify-content-center m-3">
                                            <MDBRadio onClick={() => optionClick("option1")} className='me-2' name='flexRadioDefault' id='flexRadioDefault1' label='' defaultChecked />
                                            <MDBInput
                                                value={editQuestionData.option1}
                                                onChange={e => setEditQuestionData({ ...editQuestionData, option1: e.target.value })}
                                                label='Type option 1 answer...'
                                                type='text'
                                            />
                                        </div>
                                        <div className="d-flex align-items-center justify-content-center m-3">
                                            <MDBRadio onClick={() => optionClick("option2")} className='me-2' name='flexRadioDefault' id='flexRadioDefault1' label='' />
                                            <MDBInput
                                                value={editQuestionData.option2}
                                                onChange={e => setEditQuestionData({ ...editQuestionData, option2: e.target.value })}
                                                label='Type option 2 answer...'
                                                type='text'
                                            />
                                        </div>
                                        <div className="d-flex align-items-center justify-content-center m-3">
                                            <MDBRadio onClick={() => optionClick("option3")} className='me-2' name='flexRadioDefault' id='flexRadioDefault1' label='' />
                                            <MDBInput
                                                value={editQuestionData.option3}
                                                onChange={e => setEditQuestionData({ ...editQuestionData, option3: e.target.value })}
                                                label='Type option 3 answer...'
                                                type='text'
                                            />
                                        </div>
                                        <div className="d-flex align-items-center justify-content-center m-3">
                                            <MDBRadio onClick={() => optionClick("option4")} className='me-2' name='flexRadioDefault' id='flexRadioDefault1' label='' />
                                            <MDBInput
                                                value={editQuestionData.option4}
                                                onChange={e => setEditQuestionData({ ...editQuestionData, option4: e.target.value })}
                                                label='Type option 4 answer...'
                                                type='text'
                                            />
                                        </div>
                                        <div className="mx-3 mt-4">
                                            <p className='text-danger'><i>( * Select the option for the correct answer. )</i></p>
                                        </div>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={handleClose}>
                                            Close
                                        </Button>
                                        <Button variant="primary" onClick={() => handleUpdate(quizData._id)}>
                                            Save Changes
                                        </Button>
                                    </Modal.Footer>
                                </Modal>
                                <Button onClick={() => questionRemoveClick(quizData._id, item._id)} style={{ backgroundColor: "#8755F4" }} className='text-white btn ms-3 rounded-pill' variant="primary">
                                    Remove Question
                                </Button>
                                <hr />
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default QuizModification