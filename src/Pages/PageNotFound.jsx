import React from 'react'

function PageNotFound() {
  return (
    <div className='m-5 p-5'>
      <div className='d-flex flex-column justify-content-center align-items-center m-5 p-5'>
        <h1 className='mt-3 mb-3' style={{ color: "#8A56F8" }}><strong>404 : ERROR</strong></h1>
        <p><strong>Page Not Found <span style={{ fontSize: '18px' }}>&#128532;</span></strong></p>
        <p>Quiz Quest could not find the requested page.</p>
      </div>
    </div>
  )
}

export default PageNotFound