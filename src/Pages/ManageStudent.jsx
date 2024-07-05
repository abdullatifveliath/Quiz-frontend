import React, { useContext, useEffect, useState } from 'react'

import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';

import StudentUserImage from "../Assets/studentUser.png"

import { getAllUsersByTypeAPI, removeUserAPI, updateUserActiveStatusAPI } from '../Services/allAPIs';

import { userActiveContextApi } from '../ContextAPI/ContextShare';

import { useNavigate } from 'react-router-dom';

function ManageStudent() {

  const location = useNavigate()

  const { activeUserRes, setActiveUserRes } = useContext(userActiveContextApi)

  const [studentUsers, setStudentUsers] = useState([])

  const fetchStudents = async () => {
    try {
      const reqBody = new FormData()
      reqBody.append("usertype", "student")
      const result = await getAllUsersByTypeAPI(reqBody)
      console.log("result");
      console.log(result.data);
      if (result.status == 200) {
        setStudentUsers(result.data)
      }
      else {
        alert("Failed to get Users")
      }
    }
    catch (err) {
      alert("Error getting Users" + err.message)
    }
  }

  const viewUserClick = async (quid) => {
    // e.preventDefault()
    location(`/${activeUserRes.usertype}/viewresult/${quid}`)
  }

  const removeUserClick = async (emailID) => {
    const reqBody = new FormData()
    reqBody.append("emailId", emailID)
    await removeUserAPI(reqBody)
    fetchStudents()
    alert('User removed successfully')
  }

  useEffect(() => {
    fetchStudents()
  }, [])

  return (
    <div>
      <div className="d-flex align-items-center justify-content-center">
        <div className="border shadow rounded m-5 p-5">
          <h1 className='px-3 pb-4' style={{ color: "#8755F4" }}><i><u>Students</u></i></h1>
          <MDBTable align='middle'>
            <MDBTableHead>
              <tr>
                <th scope='col'>Name</th>
                <th scope='col'>User Type</th>
                <th scope='col'>Status</th>
                <th scope='col'>Actions</th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              {
                studentUsers.map((item) => (
                  <tr>
                    <td>
                      <div className='d-flex align-items-center'>
                        <img className='rounded-circle' src={StudentUserImage} alt="" width={"45px"} height={"45px"} />
                        <div className='ms-3'>
                          <p className='fw-bold mb-1'>{item.username}</p>
                          <p className='text-muted mb-0'>{item.email}</p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <p className='text-muted mb-0'>Teacher</p>
                    </td>
                    <td>
                      {
                        item.active == "Active" ?
                          <MDBBadge color='success' pill>
                            {item.active}
                          </MDBBadge>
                          :
                          <MDBBadge color='warning' pill>
                            {item.active}
                          </MDBBadge>
                      }
                    </td>
                    <td>
                      <MDBBtn onClick={() => viewUserClick(item._id)} className='border ms-2' color='link' rounded size='sm'>
                        View Records
                      </MDBBtn>
                      <MDBBtn onClick={() => removeUserClick(item.email)} className='border ms-2' color='link' rounded size='sm'>
                        Remove
                      </MDBBtn>
                    </td>
                  </tr>
                ))
              }
            </MDBTableBody>
          </MDBTable>
        </div>
      </div>
    </div>
  )
}

export default ManageStudent