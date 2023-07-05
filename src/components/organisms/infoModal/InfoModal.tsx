import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import { ITheme } from '../../../theme/ThemeProvider'
import Icon from '../../atoms/icon/Icon'
import Modal from '../../molecules/modal/Modal'

const Message = styled.div`
  margin-top: 30px;
  text-align: center;
  padding: 20px;
  width: 100%;
  font-size: 16px;
`

const ContainerCenter = styled.div`
  text-align: center;
  margin-top: 30px;
`

const StyledIcon = styled(Icon)`
  width: 150px;
  height: 150px;
`

const ShowMore = styled.div`
  text-decoration: underline;
  font-size: 15px;
  margin-top: 15px;
  margin-bottom: 10px;
  color: ${({ theme }: { theme: ITheme }) => theme.primary1};
  cursor: pointer;
`

const ShowMoreText = styled.div`
  padding-left: 30px;
  padding-right: 30px;
  margin-bottom: 30px;
  font-size: 13px;
`

const InfoModal = ({ show, text, showMoreText, showMoreLabel, icon, onClose }) => {
  const [showMore, setShowMore] = useState(false)

  useEffect(() => {
    return () => {
      setShowMore(false)
    }
  }, [])

  return (
    <Modal
      show={show}
      onClose={onClose}
      title={''}
      body={
        <ContainerCenter>
          {' '}
          {icon ? <StyledIcon icon={icon} /> : null}
          <Message>{text}</Message>
          {showMoreText ? <ShowMore onClick={() => setShowMore(true)}>{showMoreLabel}</ShowMore> : null}
          {showMore ? <ShowMoreText>{showMoreText}</ShowMoreText> : null}
        </ContainerCenter>
      }
    />
  )
}

InfoModal.propTypes = {
  text: PropTypes.string,
  showMoreText: PropTypes.string,
  icon: PropTypes.string,
  show: PropTypes.bool,
  onClose: PropTypes.func,
}

export default InfoModal
