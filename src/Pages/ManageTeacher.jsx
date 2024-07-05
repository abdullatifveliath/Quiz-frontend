import React, { useContext, useEffect, useState } from 'react'

import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';

import TeacherUserImage from "../Assets/teacherUser.png"

import { getAllUsersByTypeAPI, removeUserAPI, updateUserActiveStatusAPI } from '../Services/allAPIs';

import { userActiveContextApi } from '../ContextAPI/ContextShare';

import { useNavigate } from 'react-router-dom';

function ManageTeacher() {

  const location = useNavigate()
  
  const { activeUserRes, setActiveUserRes } = useContext(userActiveContextApi)

  const [teacherUsers, setTeacherUsers] = useState([])

  const fetchTeachers = async () => {
    try {
      const reqBody = new FormData()
      reqBody.append("usertype", "teacher")
      const result = await getAllUsersByTypeAPI(reqBody)
      console.log("result");
      console.log(result.data);
      if (result.status == 200) {
        setTeacherUsers(result.data)
      }
      else {
        alert("Failed to Users")
      }
    }
    catch (err) {
      alert("Error getting Users" + err.message)
    }
  }

  const activeStatusToggleClick = async (emailID, activeStatus) => {
    const reqBody = new FormData()
    reqBody.append("emailId", emailID)
    activeStatus == "Active" ?
      reqBody.append("active", "Inactive")
      :
      reqBody.append("active", "Active")
    const result = await updateUserActiveStatusAPI(reqBody)
    console.log(result);
    fetchTeachers()
    alert('User status updated successfully')
  }

  const removeUserClick = async (emailID) => {
    const reqBody = new FormData()
    reqBody.append("emailId", emailID)
    await removeUserAPI(reqBody)
    fetchTeachers()
    alert('User removed successfully')
  }

  const viewUserClick = async (quid) => {
    // e.preventDefault()
    location(`/${activeUserRes.usertype}/viewresult/${quid}`)
  }

  useEffect(() => {
    fetchTeachers()
  }, [])

  return (
    <div>
      <div className="d-flex align-items-center justify-content-center">
        <div className="border shadow rounded m-5 p-5">
          <h1 className='px-3 pb-4' style={{ color: "#8755F4" }}><i><u>Teachers</u></i></h1>
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
                teacherUsers.map((item) => (
                  <tr>
                    <td>
                      <div className='d-flex align-items-center'>
                        <img className='rounded-circle' src={TeacherUserImage} alt="" width={"45px"} height={"45px"} />
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
                      <MDBBtn onClick={() => viewUserClick(item._id)} className='border' color='link' rounded size='sm'>
                        View Records
                      </MDBBtn>
                      <MDBBtn onClick={() => activeStatusToggleClick(item.email, item.active)} className='border ms-2' color='link' rounded size='sm'>
                        Toggle Status
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

export default ManageTeacher