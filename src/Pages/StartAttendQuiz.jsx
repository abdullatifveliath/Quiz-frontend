import React, { useContext, useEffect, useState } from 'react'

import { useNavigate, useParams } from 'react-router-dom'

import { addUserQuizRecordAPI, singleQuizAPI } from '../Services/allAPIs';

import { userActiveContextApi } from '../ContextAPI/ContextShare';

function StartAttendQuiz() {

  const location = useNavigate()

  const { activeUserRes, setActiveUserRes } = useContext(userActiveContextApi)

  const [activeQuestion, setActiveQuestion] = useState(0)

  const [selectedAnswer, setSelectedAnswer] = useState(false)

  const [result, setResult] = useState({
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
  })

  const [quizData, setQuizData] = useState({})

  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null)

  const [showResult, setShowResult] = useState(false)

  const { qid } = useParams()

  const addLeadingZero = (number) => (number > 9 ? number : `0${number}`)

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

  const saveUserQuizRecord = async () => {
    const reqBody = new FormData()
    reqBody.append("emailId", activeUserRes.email)
    reqBody.append("quizname", quizData.title)
    reqBody.append("noofquestions", quizData.questions.length)
    reqBody.append("score", result.score)
    reqBody.append("maximumscore", (quizData.questions.length * 5))
    reqBody.append("correctanswers", result.correctAnswers)
    reqBody.append("wronganswers", result.wrongAnswers)
    const result1 = await addUserQuizRecordAPI(reqBody)
    if (result1.status == 200) {
      console.log(result1.data);
      alert('User record added successfully')
    }
    else {
      alert('User record could not be added due to unknown error')
    }
  }

  const onClickNext = () => {
    console.log("Inside onClickNext");
    setSelectedAnswerIndex(null)
    setResult((prev) =>
      selectedAnswer
        ? {
          ...prev,
          score: prev.score + 5,
          correctAnswers: prev.correctAnswers + 1,
        }
        : { ...prev, wrongAnswers: prev.wrongAnswers + 1 }
    )
    if (activeQuestion !== ((Array.isArray(quizData.questions) && quizData.questions.length) - 1)) {
      setActiveQuestion((prev) => prev + 1)
    } else {
      setActiveQuestion(0)
      setShowResult(true)
    }
  }

  const onAnswerSelected = (answer, optionId) => {
    console.log("Inside onAnswerSelected");
    setSelectedAnswerIndex(optionId)
    if (answer === quizData.questions[activeQuestion].answer) {
      setSelectedAnswer(true)
      console.log('right')
    } else {
      setSelectedAnswer(false)
      console.log('wrong')
    }
  }

  const onClickRestartQuiz = () => {
    setActiveQuestion(0)
    setSelectedAnswer(false)
    setResult({
      score: 0,
      correctAnswers: 0,
      wrongAnswers: 0,
    })
    setQuizData({})
    setSelectedAnswerIndex(null)
    setShowResult(false)
    fetchQuizData()
  }

  const onClickGoBack = () => {
    location(`/${activeUserRes.usertype}/attendquiz`)
  }

  useEffect(() => {
    fetchQuizData()
  }, [])

  useEffect(() => {
    if (showResult) {
      saveUserQuizRecord();
    }
  }, [showResult]);

  return (
    <div>
      {!showResult ? (
        <div className="d-flex align-items-center justify-content-center">
          <div className="border shadow rounded m-5 p-5">
            <div style={{ color: "#8755F4" }}>
              <span className="active-question-no">{addLeadingZero(activeQuestion + 1)}</span>
              <span className="total-question">/{addLeadingZero(Array.isArray(quizData.questions) && quizData.questions.length)}</span>
            </div>
            <h3 className='pt-2'><i>{Array.isArray(quizData.questions) && quizData.questions[activeQuestion].question}</i></h3>
            <p className='border rounded p-3 my-3' style={selectedAnswerIndex === 1 ? { backgroundColor: "#ffd6ff", border: "1px solid #800080" } : {}} onClick={() => onAnswerSelected("option1", 1)}>{Array.isArray(quizData.questions) && quizData.questions[activeQuestion].option1}</p>
            <p className='border rounded p-3 my-3' style={selectedAnswerIndex === 2 ? { backgroundColor: "#ffd6ff", border: "1px solid #800080" } : {}} onClick={() => onAnswerSelected("option2", 2)}>{Array.isArray(quizData.questions) && quizData.questions[activeQuestion].option2}</p>
            <p className='border rounded p-3 my-3' style={selectedAnswerIndex === 3 ? { backgroundColor: "#ffd6ff", border: "1px solid #800080" } : {}} onClick={() => onAnswerSelected("option3", 3)}>{Array.isArray(quizData.questions) && quizData.questions[activeQuestion].option3}</p>
            <p className='border rounded p-3 my-3' style={selectedAnswerIndex === 4 ? { backgroundColor: "#ffd6ff", border: "1px solid #800080" } : {}} onClick={() => onAnswerSelected("option4", 4)}>{Array.isArray(quizData.questions) && quizData.questions[activeQuestion].option4}</p>
            <button className='text-white btn' style={{ backgroundColor: "#8755F4" }} onClick={onClickNext}>{activeQuestion === (Array.isArray(quizData.questions) && quizData.questions.length - 1) ? 'Finish' : 'Next'}</button>
          </div>
        </div>
      ) : (
        <div className="d-flex align-items-center justify-content-center">
          <div className="border shadow rounded m-5 p-5">
            <h1 className='text-center' style={{ color: "#8755F4" }}>Result</h1>
            <br />
            <p>
              <b>Total Questions : </b><span>{Array.isArray(quizData.questions) && quizData.questions.length}</span>
            </p>
            <p>
              <b>Score : </b><span>{result.score} / {(Array.isArray(quizData.questions) && quizData.questions.length) * 5}</span>
            </p>
            <p>
              <b>Correct Answers : </b><span>{result.correctAnswers}</span>
            </p>
            <p>
              <b>Wrong Answers : </b><span>{result.wrongAnswers}</span>
            </p>
            <div className="text-center">
              <button className='text-white btn rounded-pill mt-3 me-1' style={{ backgroundColor: "#8755F4" }} onClick={() => onClickRestartQuiz()}>Restart Quiz</button>
              <button className='text-white btn rounded-pill mt-3 ms-1' style={{ backgroundColor: "#8755F4" }} onClick={() => onClickGoBack()}>Exit</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default StartAttendQuiz