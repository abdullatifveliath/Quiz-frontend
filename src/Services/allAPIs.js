// All API calls
import { baseUrl } from "./baseUrl";
import { commonAPI } from "./commonAPI";

//get single user API call
export const getSingleUserAPI = async (userID) => {
    return await commonAPI("get", `${baseUrl}/user/${userID}`, "")
}

//Register API call
export const registerAPI = async (user) => {
    return await commonAPI("post", `${baseUrl}/register`, user, "")
}

//Login API call
export const loginAPI = async (user) => {
    return await commonAPI("post", `${baseUrl}/login`, user, "")
}

//Add user quiz record API call
export const addUserQuizRecordAPI = async (reqBody) => {
    return await commonAPI("post", `${baseUrl}/add-user-record`, reqBody)
}

//get all user quiz record API call
export const getAllUserQuizRecordAPI = async (reqBody) => {
    return await commonAPI("post", `${baseUrl}/get-all-user-record`, reqBody)
}

//get all users by type API call
export const getAllUsersByTypeAPI = async (reqBody) => {
    return await commonAPI("post", `${baseUrl}/get-all-users-by-type`, reqBody)
}

//update user active status
export const updateUserActiveStatusAPI = async (reqBody) => {
    return await commonAPI("put", `${baseUrl}/toggle-user-active`, reqBody)
}

//remove user
export const removeUserAPI = async (reqBody) => {
    return await commonAPI("delete", `${baseUrl}/remove-user`, reqBody)
}

//Add quiz API call
export const addQuizAPI = async (reqBody) => {
    return await commonAPI("post", `${baseUrl}/quiz/add`, reqBody)
}

//get all quiz API call
export const allQuizAPI = async () => {
    return await commonAPI("get", `${baseUrl}/quiz/all-quiz`, "")
}

//get single quiz API call
export const singleQuizAPI = async (quizId) => {
    return await commonAPI("get", `${baseUrl}/quiz/single-quiz/${quizId}`, "")
}

//delete quiz api call
export const deleteQuizAPI = async (quizId) => {
    return await commonAPI("delete", `${baseUrl}/quiz/delete-quiz/${quizId}`, {})
}

//update quiz api call
export const updateQuizAPI = async (quizId, reqBody) => {
    return await commonAPI("put", `${baseUrl}/quiz/update-quiz/${quizId}`, reqBody)
}

//Add quiz question API call
export const addQuizQuestionAPI = async (quizId, reqBody) => {
    return await commonAPI("post", `${baseUrl}/quiz/add-question/${quizId}`, reqBody)
}

//delete quiz question api call
export const deleteQuizQuestionAPI = async (quizId, questionId) => {
    return await commonAPI("delete", `${baseUrl}/quiz/delete-quiz-question/${quizId}/${questionId}`, {})
}

//update quiz question api call
export const updateQuizQuestionAPI = async (quizId, questionId, reqBody) => {
    return await commonAPI("put", `${baseUrl}/quiz/update-quiz-question/${quizId}/${questionId}`, reqBody)
}

//update user details api call
export const updateUserDetailsAPI = async (userID, reqBody) => {
    return await commonAPI("put", `${baseUrl}/update-user/${userID}`, reqBody)
}