import './App.css';

import Footer from './Components/Footer';
import Header from './Components/Header';
import SubLoginHeader from './Components/SubLoginHeader'

import Home from './Pages/Home';
import Login from './Pages/Login';
import LoginSelection from './Pages/LoginSelection';
import PageNotFound from './Pages/PageNotFound';
import Register from './Pages/Register';
import ManageQuizzes from './Pages/ManageQuizzes';
import StartAttendQuiz from './Pages/StartAttendQuiz'

import { Route, Routes } from 'react-router-dom';
import RegisterSelection from './Pages/RegisterSelection';
import Dashboard from './Pages/Dashboard';

import { userActiveContextApi } from './ContextAPI/ContextShare';

import { useContext } from 'react';
import QuizModification from './Pages/QuizModification';
import AttendQuiz from './Pages/AttendQuiz';
import ManageStudent from './Pages/ManageStudent';
import ManageTeacher from './Pages/ManageTeacher';
import ViewResult from './Pages/ViewResult';

function App() {

  const { activeUserRes, setActiveUserRes } = useContext(userActiveContextApi)

  return (
    <div className="App">
      <Header />
      {
        activeUserRes != "" ?
          <SubLoginHeader />
          :
          <></>
      }
      <Routes>
        <Route path='/' element={<Home />} />

        <Route path='/login' element={<LoginSelection />} />
        <Route path='/register' element={<RegisterSelection />} />

        <Route path='/login/teacher' element={<Login userType="teacher" />} />
        <Route path='/login/student' element={<Login userType="student" />} />
        <Route path='/login/admin' element={<Login userType="admin" />} />

        {/* <Route path='/register/admin' element={<Register userType="admin" />} /> */}
        <Route path='/register/teacher' element={<Register userType="teacher" />} />
        <Route path='/register/student' element={<Register userType="student" />} />

        {
          activeUserRes != "" ?
            <>
              <Route path='/admin/dashboard' element={<Dashboard userType="admin" />} />
              <Route path='/teacher/dashboard' element={<Dashboard userType="teacher" />} />
              <Route path='/student/dashboard' element={<Dashboard userType="student" />} />

              <Route path='/admin/managequiz' element={<ManageQuizzes userType="admin" />} />
              <Route path='/teacher/managequiz' element={<ManageQuizzes userType="teacher" />} />

              <Route path='/admin/managequiz/:qid' element={<QuizModification />} />
              <Route path='/teacher/managequiz/:qid' element={<QuizModification />} />

              <Route path='/admin/viewresult/:quid' element={<ViewResult />} />
              <Route path='/teacher/viewresult/:quid' element={<ViewResult />} />

              <Route path='/admin/attendquiz' element={<AttendQuiz />} />
              <Route path='/teacher/attendquiz' element={<AttendQuiz />} />
              <Route path='/student/attendquiz' element={<AttendQuiz />} />

              <Route path='/admin/attendquiz/:qid' element={<StartAttendQuiz />} />
              <Route path='/teacher/attendquiz/:qid' element={<StartAttendQuiz />} />
              <Route path='/student/attendquiz/:qid' element={<StartAttendQuiz />} />

              <Route path='/admin/managestudent' element={<ManageStudent />} />
              <Route path='/teacher/managestudent' element={<ManageStudent />} />
              {/* <Route path='/student/managestudent' element={<ManageStudent />} /> */}

              <Route path='/admin/manageteacher' element={<ManageTeacher />} />
              {/* <Route path='/teacher/manageteacher' element={<ManageTeacher />} /> */}
              {/* <Route path='/student/manageteacher' element={<ManageTeacher />} /> */}
            </>
            :
            <></>
        }

        <Route path='*' element={<PageNotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
