import React from 'react'
import styled from 'styled-components'
import { Carousel } from 'react-responsive-carousel'
import { useSelector } from 'react-redux'
import { getNfts } from '../../../store/settings/settings.selectors'

const ContainerNft = styled.div``

const Name = styled.span`
  color: ${({ theme }) => theme.text2};
`

const SupportedNfstCarousel = () => {
  const nfts = useSelector(getNfts)
  return (
    <Carousel showIndicators={false} showThumbs={false} autoPlay={true} centerMode={true} centerSlidePercentage={50}>
      {nfts.map(({ symbol, name }) => (
        <ContainerNft key={`carousel_card_${symbol}`}>
          <img src={`./assets/png/${symbol}_carousel.png`} alt={`${symbol}_carousel.png`} />
          <Name className="legend">{name}</Name>
        </ContainerNft>
      ))}
    </Carousel>
  )
}

export default SupportedNfstCarousel
