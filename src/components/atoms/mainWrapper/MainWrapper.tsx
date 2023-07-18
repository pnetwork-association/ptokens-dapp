import React, { ReactNode } from 'react'

type MainWrapperProps = {
  children: ReactNode
}

const MainWrapper = (props: MainWrapperProps) => {
  return <div className="main-content">{props.children}</div>
}

export default MainWrapper
