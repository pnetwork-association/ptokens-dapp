import { ReactNode } from 'react'
import { 
  Container,
  NumberInput,
  NumberInputField,
  Text,
  Flex,
  Button,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  Image,
  Tooltip,
} from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'

interface SwapBoxProps {
  children?: ReactNode
  bg: string
  title: string
  asset: object
  chain: string
  onTokenClick?: () => void
  onChainClick?: () => void
  mt?: string
}

const SwapBox: React.FC<SwapBoxProps> = ({children = null, bg, title, asset, chain, onTokenClick, onChainClick, mt = 0}) => {
  console.log(asset)
  return(
    <Container mt={mt} bg={bg} padding='15px' pt='5px' rounded='lg'>
      <Flex justify={'space-between'} alignItems='center'>
        <Text ml='1' fontSize='md' color={'gray.500'}>
          {title}
        </Text>
        <Tooltip label='Ethereum'>
          <Button
            onClick={onChainClick}
            py={1} 
            px={2} 
            rounded={'md'} 
            iconSpacing='0'
            rightIcon={<ChevronDownIcon />} 
            _hover={{
              transform: 'scale(1.05, 1.05)',
              bg: `gray.700`,
            }}
          >
            <Image m={'1px'} mr='0' boxSize='25' src={chain}/>
          </Button>
        </Tooltip>
      </Flex>
      <Container mt='5px' color={'gray.600'} border={'1px'} padding='15px' pb='0px' rounded='lg'>
        <Flex justify={'space-between'} alignItems={'center'}>
          <Button
            onClick={onTokenClick}
            py={2} 
            px={2} 
            rounded={'md'} 
            rightIcon={<ChevronDownIcon />}
            bg={`gray.700`}
            _hover={{
              transform: 'scale(1.05, 1.05)',
            }} 
          >
            <Image
              boxSize='40px' 
              src={'/assets/svg/' + asset.image}
            />
          </Button>
          <NumberInput color='white' marginRight={'2px'} variant='unstyled' defaultValue={'0.0'} size={'lg'} w={'220px'}>
            <NumberInputField fontSize='40px' paddingInlineEnd='0' textAlign='right' h={'50px'}/>
          </NumberInput>
        </Flex>
        <Flex mt='5px' mb='-3' justify={'space-between'} alignItems={'flex-end'}>
          <Text paddingLeft='2px' color={'gray.500'}>
            Balance: 0
          </Text>
          <Button 
            size={'xs'}
            _hover={{
              color: 'blue.600',
            }} 
          >
            Max
          </Button>
        </Flex>
        <Slider mb='1' aria-label='slider-ex-1' defaultValue={0}>
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
        </Slider>
      </Container>
      {children}
    </Container>
  )}

export default SwapBox