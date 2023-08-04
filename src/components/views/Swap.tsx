import React, { useState, useEffect } from 'react'
import { 
  Container,
  VStack,
  useColorModeValue,
  Button,
  Center,
  Flex,
  Text,
  IconButton,
  useDisclosure,
} from '@chakra-ui/react'
import { SettingsIcon } from '@chakra-ui/icons'
import SwapBox from '../organisms/SwapBox'
import AddressBox from '../organisms/AddressBox'
import AssetsListModal from '../organisms/AssetsListModal'
import assets/*, { AssetWithAddress, UpdatedAsset }*/ from '../../settings/swap-assets'
import chains from '../../settings/chain-list'
// import { AssetId } from '../../constants'

const Swap: React.FC = () => {
  const bg = useColorModeValue('gray.50', 'gray.800')
  const outerBg = useColorModeValue('gray.300', 'gray.900')
  const { isOpen: isOriginListModalOpen, onOpen: onOriginChainListModalOpen, onClose: onOriginChainListModalClose } = useDisclosure()
  const { isOpen: isDestListModalOpen, onOpen: onDestChainListModalOpen, onClose: onDestChainListModalClose } = useDisclosure()
  const [originAsset, setOriginAsset] = useState(assets[2])
  const [destAsset, setDestAsset] = useState(assets[1])
  const [originChain, setOriginChain] = useState(chains.find(chain => chain.blockchain === assets[2].blockchain))
  const [destChain, setDestChain] = useState(chains.find(chain => chain.blockchain === assets[1].blockchain))

  useEffect(() => console.log(originAsset, destAsset), [originAsset, destAsset])

  return (
    <VStack>
      <Container bg={outerBg} marginTop='45px' padding='25px' paddingTop='15px' maxW={'md'} rounded='lg'>
        <Flex mb='6px' justify={'space-between'} alignItems='center'>
          <Flex ml='1'>
            <Text color='gray.500' mr='2'>
              Version:
            </Text>
            <Button pr='2' pl='2' fontSize='sm' bg='gray.800' color='gray.500' rounded='lg'>
              9fe14a89
            </Button>
          </Flex>
          <IconButton color='gray.500' mr='1' aria-label='Settings' icon={<SettingsIcon />}/>
        </Flex>
        <SwapBox 
          onTokenClick={onOriginChainListModalOpen} 
          bg={bg} 
          title={'Origin'} 
          asset={originAsset}
          chain={originChain}
          setChain={setOriginChain}
        />
        <SwapBox 
          onTokenClick={onDestChainListModalOpen} 
          mt='25px' bg={bg} 
          title={'Destination'} 
          asset={destAsset} 
          chain={destChain}
          setChain={setDestChain}
        >
          <AddressBox />
        </SwapBox>
        <Center marginTop={'20px'}>
          <Button fontSize={'lg'} width={'container.lg'} colorScheme={'red'} bg='blue.400' rounded='lg'>
            Swap
          </Button>
        </Center>
      </Container>
      <Container bg={outerBg} marginTop='15px' padding='25px' maxW={'md'} rounded='md'>

      </Container>
      <AssetsListModal 
        isOpen={isOriginListModalOpen} 
        onClose={onOriginChainListModalClose}
        setAsset={setOriginAsset}
        chain={originChain}
        setChain={setOriginChain}
       />
      <AssetsListModal 
        isOpen={isDestListModalOpen} 
        onClose={onDestChainListModalClose}
        setAsset={setDestAsset}
        chain={destChain}
        setChain={setDestChain}
      />
      
    </VStack>
  )
}

export default Swap