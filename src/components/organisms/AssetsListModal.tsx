import {
  Tag,
  TagLabel,
  TagCloseButton,
  Text,
  Image,
  Flex,
  Container,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Input,
  UseModalProps,
} from '@chakra-ui/react'
import assets/*, { AssetWithAddress, UpdatedAsset }*/ from '../../settings/swap-assets'
import AssetBox from '../molecules/AssetBox'
import { ChevronDownIcon, DragHandleIcon } from '@chakra-ui/icons'
import chainList, { BaseChain } from '../../settings/chain-list'
import ChainListMenu from './ChainsListMenu'
import { Blockchain } from 'ptokens-constants'
import ChainBox from '../molecules/ChainBox'

interface AssetListModalProps extends UseModalProps {
  setAsset: Function
  chain: BaseChain
  setChain: Function
}

const AssetListModal: React.FC<AssetListModalProps> = ({isOpen, onClose, id, setAsset, chain, setChain}) => {
  return (
    <Modal isCentered id={id} isOpen={isOpen} onClose={onClose} >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader ml='-2' mt='-1' mb='-3'>Asset search</ModalHeader>
        <ModalCloseButton mt='3' mr='2'/>
        <ModalBody ml='-3' mr='-3'>
          <Container mb='10px' color={'gray.600'} border={'1px'} padding='15px' pb='0px' rounded='lg'>
            <Flex 
              flexDirection={'column'}
            >
              <Flex
                alignContent={'center'}
                alignItems={'center'}
              >
                <Text mr='3' pb='2' color='gray.500'>
                  Chains
                </Text>
                {chainList.map((chain) => (
                  <ChainBox chain={chain} />
                ))}
              </Flex>
              {/* <Flex 
                id='filter' 
                justifyContent={'space-between'}
                alignContent={'center'}
                alignItems={'center'}
                mb='15px'
              > */}
                <Input
                  // mr='5'
                  mb='15px'
                  padding='1'
                  bg={'gray.600'}
                  color={'white'}
                  variant={'unstyled'}
                  size={'lg'}
                  placeholder={'Search by name, symbol or address'}
                />
                {/* <ChainListMenu chain={chain} bg={'gray.600'} setChain={setChain} size={'35px'} hoverEffect={{color: 'blue.400'}} /> */}
              {/* </Flex> */}
            </Flex>
          </Container>
          <Flex flexDirection='column'>
          {assets.map((asset) => (
              <AssetBox key={asset.id} setAsset={setAsset} asset={asset} close={onClose} />
          ))}
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default AssetListModal