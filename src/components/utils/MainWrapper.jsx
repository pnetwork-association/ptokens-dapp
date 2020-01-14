import React from 'react'

const MainWrapper = props => {
  return (
    <div className="main-content bg-white">
      {props.children}
    </div>
  )
}

export default MainWrapper