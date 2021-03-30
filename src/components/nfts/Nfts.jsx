import React, { useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Row, Container, Col } from 'react-bootstrap'
import NftCard from './nftCard/NftCard'

const Portals = _props => {
  return (
    <Container>
      <Row>
        <Col xs={12} md={6} lg={4} xl={3}>
          <NftCard />
        </Col>
      </Row>
    </Container>
  )
}

Portals.propTypes = {
  selectedPage: PropTypes.string.isRequired,
  selectPage: PropTypes.func.isRequired
}

export default Portals
