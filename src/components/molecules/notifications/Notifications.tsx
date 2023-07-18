import React from 'react'
import ReduxToastr from 'react-redux-toastr'

const Notifications = () => {
  return (
    <ReduxToastr
      timeOut={7000}
      newestOnTop={false}
      preventDuplicates
      position="bottom-right"
      transitionIn="fadeIn"
      transitionOut="fadeOut"
      progressBar
      closeOnToastrClick
    />
  )
}

export default Notifications
