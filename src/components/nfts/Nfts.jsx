import React, { useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Row, Container, Col } from 'react-bootstrap'
import NftCard from './nftCard/NftCard'

const Nfts = ({ nfts }) => {
  console.log(nfts)
  return (
    <Container>
      <Row>
        {nfts.map(_nft => (
          <Col xs={12} md={6} lg={4} xl={3}>
            <NftCard nft={_nft} />
          </Col>
        ))}
      </Row>
    </Container>
  )
}

Nfts.propTypes = {
  nfts: PropTypes.array.isRequired
}

export default Nfts
