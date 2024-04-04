import React from 'react'
import { Carousel } from 'react-responsive-carousel'
import styled from 'styled-components'

import settings from '../../../settings'

const ContainerNft = styled.div``

const Name = styled.span`
  color: ${({ theme }) => theme.text2};
`

const SupportedNfstCarousel = () => {
  return (
    <Carousel showIndicators={false} showThumbs={false} autoPlay={true} centerMode={true} centerSlidePercentage={50}>
      {settings.supportedNfts.map(({ symbol, name }) => (
        <ContainerNft key={`carousel_card_${symbol}`}>
          <img src={`./assets/png/${symbol}_carousel.png`} alt={`${symbol}_carousel.png`} />
          <Name className="legend">{name}</Name>
        </ContainerNft>
      ))}
    </Carousel>
  )
}

export default SupportedNfstCarousel
