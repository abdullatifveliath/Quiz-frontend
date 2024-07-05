import React, { useContext, useEffect, useState } from 'react'

import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';

import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBInput,
} from 'mdb-react-ui-kit';

import AdminUserImage from "../Assets/adminUser.png"
import StudentUserImage from "../Assets/studentUser.png"
import TeacherUserImage from "../Assets/teacherUser.png"

import { userActiveContextApi } from '../ContextAPI/ContextShare';

import { getAllUserQuizRecordAPI, updateUserDetailsAPI } from '../Services/allAPIs';

function Dashboard({ userType }) {

  const [userData, setUserData] = useState({
    username: "",
    password: ""
  });
  
  const [basicModal, setBasicModal] = useState(false);

  const toggleOpen = () => {
    setBasicModal(!basicModal);
    if (!basicModal)
      setUserData({
        username: activeUserRes.username,
        password: activeUserRes.password
      })
    else
      setUserData({
        username: "",
        password: ""
      })
  }

  const handleUpdate = () => {
    editUserClick()
    toggleOpen()
  }

  const { activeUserRes, setActiveUserRes } = useContext(userActiveContextApi)

  const [quizData, setQuizData] = useState({})

  const fetchQuizData = async () => {
    try {
      const reqBody = new FormData()
      reqBody.append("emailId", activeUserRes.email)
      const result = await getAllUserQuizRecordAPI(reqBody)
      console.log("result");
      console.log(result.data);
      if (result.status == 200) {
        setActiveUserRes(result.data)
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

  const editUserClick = async () => {
    const { username, password } = userData
    const reqBody = new FormData()
    reqBody.append("username", username)
    reqBody.append("password", password)
    const result = await updateUserDetailsAPI(activeUserRes._id, reqBody)
    if (result.status == 200) {
      console.log(result.data);
      setActiveUserRes(result.data)
      fetchQuizData()
      alert('User updated successfully')
    }
    else
      alert('User updation unsuccessful')
  }
  
  useEffect(() => {
    fetchQuizData()
  }, [])

  return (
    <div>
      <div className="d-flex align-items-center justify-content-center">
        <div className="d-flex align-items-center justify-content-center border shadow rounded m-5 p-5">
          <div className='me-sm-4 me-2'>
            {
              userType == "admin" ?
                <img src={AdminUserImage} alt="" width={"100px"} height={"100px"} />
                :
                userType == "teacher" ?
                  <img src={TeacherUserImage} alt="" width={"100px"} height={"100px"} />
                  :
                  <img src={StudentUserImage} alt="" width={"100px"} height={"100px"} />
            }
          </div>
          <div className='ms-sm-4 ms-2'>
            <p>User name : {activeUserRes.username}</p>
            <p>Email : {activeUserRes.email}</p>
            <p>User Type : {activeUserRes.usertype.charAt(0).toUpperCase() + activeUserRes.usertype.slice(1)}</p>
            <p>Password : ******</p>
            <MDBBtn style={{ backgroundColor: "#8755F4", color: "white" }} className='mt-3 btn rounded-pill' onClick={toggleOpen}>Update Username/Password</MDBBtn>
            <MDBModal open={basicModal} onClose={() => setBasicModal(false)} tabIndex='-1'>
              <MDBModalDialog>
                <MDBModalContent>
                  <MDBModalHeader>
                    <MDBModalTitle style={{ color: "#8755F4" }}><b><i><u>Update Username/Password</u></i></b></MDBModalTitle>
                    <MDBBtn className='btn-close' color='none' onClick={toggleOpen}></MDBBtn>
                  </MDBModalHeader>
                  <MDBModalBody>
                    <MDBInput
                      value={userData.username}
                      onChange={(e) => setUserData({ ...userData, username: e.target.value })}
                      label='Username'
                      type='text'
                    />
                    <MDBInput
                      className='mt-3'
                      value={userData.password}
                      onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                      label='Password'
                      type='password'
                    />
                  </MDBModalBody>
                  <MDBModalFooter>
                    <MDBBtn color='secondary' onClick={toggleOpen}>
                      Close
                    </MDBBtn>
                    <MDBBtn onClick={() => handleUpdate()}>Save changes</MDBBtn>
                  </MDBModalFooter>
                </MDBModalContent>
              </MDBModalDialog>
            </MDBModal>
          </div>
        </div>
        <div className="border shadow rounded m-5 p-5">
          <h1 className='px-3 pb-4' style={{ color: "#8755F4" }}><i><u>Quiz Results</u></i></h1>
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
                            <p className='fw-normal mb-1 text-center'>{item.noofquestions}</p>
                          </td>
                          <td>
                            <p className='fw-normal mb-1 text-center'>{item.score}</p>
                          </td>
                          <td>
                            <p className='fw-normal mb-1 text-center'>{item.maximumscore}</p>
                          </td>
                          <td>
                            <p className='fw-normal mb-1 text-center'>{item.correctanswers}</p>
                          </td>
                          <td>
                            <p className='fw-normal mb-1 text-center'>{item.wronganswers}</p>
                          </td>
                        </tr>
                      ))
                    }
                  </MDBTableBody>
                </MDBTable>
              </>
              :
              <>
                <p className='text-center'>- No quizzes attempted -</p>
              </>
          }
        </div>
      </div>
    </div>
  )
}

export default Dashboard