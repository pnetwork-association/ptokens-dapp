import React from 'react'

const Spinner = props => {
  return <div className={`lds-ring lds-ring-${props.size}`}>
    {
      [0, 1, 2, 3].map(v => {
        return <div key={`spinner-${v}`} className={props.size}></div>
      })
    }
  </div>
}

export default Spinner