import PropTypes from 'prop-types'
import React from 'react'
import { ProgressBar, Step } from 'react-step-progress-bar'
import styled from 'styled-components'

import { ITheme } from '../../../theme/ThemeProvider'

const ContainerProgress = styled.div`
  padding-left: 10px;
  padding-right: 10px;
  margin-top: 50px;
`

const ContainerText = styled.div`
  margin-top: 30px;
  margin-top: 30px;
  color: ${({ theme }: { theme: ITheme }) => theme.text1};
  text-align: center;
  font-size: 16px;
`

const IndexedStep = styled.div`
  color: white;
  width: 20px;
  height: 20px;
  font-size: 12px;
  background-color: ${(_props: { accomplished: boolean; theme: ITheme }) =>
    _props.accomplished ? _props.theme.blue : 'rgba(211, 211, 211, 0.8)'};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`

type ProgressProps = {
  percent: number
  message: string | null
  steps: number[]
}
const Progress = ({ percent, message, steps }: ProgressProps) => {
  return (
    <ContainerProgress>
      <ProgressBar percent={percent} filledBackground="#66b8ff" hasStepZero={true} stepPositions={steps}>
        {Array(steps.length)
          .fill(0)
          .map((_, _index) => (
            <Step key={_index}>
              {({ accomplished }: { accomplished: boolean }) => <IndexedStep accomplished={accomplished}></IndexedStep>}
            </Step>
          ))}
      </ProgressBar>
      {message ? <ContainerText dangerouslySetInnerHTML={{ __html: message }} /> : null}
    </ContainerProgress>
  )
}

Progress.propTypes = {
  percent: PropTypes.number,
  message: PropTypes.string,
  steps: PropTypes.array,
}

export default Progress
