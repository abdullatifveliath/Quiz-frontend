import React, { useContext } from 'react'

import Img1 from '../Assets/img1.jpg';

import { userActiveContextApi } from '../ContextAPI/ContextShare';

function Home() {

  const { activeUserRes, setActiveUserRes } = useContext(userActiveContextApi)

  console.log(activeUserRes);

  return (
    <div>

      <div className='row align-items-center justify-content-center m-5'>
        <div className='col-sm-6'>
          <h2>Hey there!<br />Welcome to <span style={{ color: "#8A56F8" }}><b>Quiz Quest.</b></span></h2>
          <p style={{ textAlign: "justify" }}>Welcome to <span style={{ color: "#8A56F8" }}>Quiz Quest</span>
            , where knowledge meets excitement! Whether you're a trivia enthusiast, a quiz aficionado, or simply looking to challenge your intellect, you've come to the right place. Dive into a world of diverse topics, from history to pop culture, science to literature, and everything in between. Our platform offers a stimulating and engaging experience for individuals of all ages and interests. Get ready to test your wits, compete with friends, and embark on an unforgettable journey of discovery. Join us as we explore the realms of curiosity and fun, one question at a time. Welcome aboard, let the quizzing begin!</p>
        </div>
        <div className='col-sm-6 text-center'>
          <img src={Img1} width={'90%'} style={{ borderRadius: '25px' }} alt="" />
        </div>
      </div>

    </div>
  )
}

export default Home