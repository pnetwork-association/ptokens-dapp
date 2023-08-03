import {
  Button,
  Flex,
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
import { BaseChain } from '../../settings/chain-list'
import ChainListMenu from './ChainsListMenu'

interface AssetListModalProps extends UseModalProps {
  setAsset: Function
  chain: BaseChain
  setChain: Function
}

const AssetListModal: React.FC<AssetListModalProps> = ({isOpen, onClose, id, setAsset, chain, setChain}) => {  return (
    <Modal isCentered id={id} isOpen={isOpen} onClose={onClose} >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader ml='-2' mt='-1' mb='-3'>Asset search</ModalHeader>
        <ModalCloseButton mt='3' mr='2'/>
        <ModalBody ml='-3' mr='-3'>
          <Flex 
            id='filter' 
            justifyContent={'space-between'}
            alignContent={'center'}
            alignItems={'center'}
            mb='15px'
          >
            <Input
              size={'lg'}
              placeholder={'Search by name, symbol or address'}
            />
            <ChainListMenu chain={chain} setChain={setChain} size={'35px'} hoverEffect={{color: 'blue.400'}} />
          </Flex>
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