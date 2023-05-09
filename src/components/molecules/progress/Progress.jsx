import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { ProgressBar, Step } from 'react-step-progress-bar'

const ContainerProgress = styled.div`
  padding-left: 10px;
  padding-right: 10px;
  margin-top: 50px;
`

const ContainerText = styled.div`
  margin-top: 30px;
  margin-top: 30px;
  color: ${({ theme }) => theme.text1};
  text-align: center;
  font-size: 16px;
`

const IndexedStep = styled.div`
  color: white;
  width: 20px;
  height: 20px;
  font-size: 12px;
  background-color: ${({ accomplished, theme }) => (accomplished ? theme.blue : 'rgba(211, 211, 211, 0.8)')};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Progress = ({ percent, message, steps }) => {
  return (
    <ContainerProgress>
      <ProgressBar percent={percent} filledBackground="#66b8ff" hasStepZero={true} stepPositions={steps}>
        {Array(steps.length)
          .fill(0)
          .map((_, _index) => (
            <Step key={_index}>{({ accomplished }) => <IndexedStep accomplished={accomplished}></IndexedStep>}</Step>
          ))}
      </ProgressBar>
      <ContainerText dangerouslySetInnerHTML={{ __html: message }} />
    </ContainerProgress>
  )
}

Progress.propTypes = {
  percent: PropTypes.number,
  message: PropTypes.string,
  steps: PropTypes.array,
}

export default Progress
