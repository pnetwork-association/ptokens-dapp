import {
  Accordion,
  Text,
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
import AssetAccordion from '../molecules/AssetAccordion'
import chainList, { BaseChain } from '../../settings/chain-list'
import ChainBox from '../molecules/ChainBox'

interface AssetListModalProps extends UseModalProps {
  setAsset: Function
  chain: BaseChain
  setChain: Function
}

const AssetListModal: React.FC<AssetListModalProps> = ({isOpen, onClose, id, setAsset, setChain}) => {
  return (
    <Modal isCentered id={id} isOpen={isOpen} onClose={onClose} >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader ml='-2' mt='-1' mb='-3'>Asset search</ModalHeader>
        <ModalCloseButton mt='3' mr='2'/>
        <ModalBody ml='-3' mr='-3' mt=''>
          <Container mb='10px' color={'gray.600'} border={'1px'} p='15px' pt='10px' pb='0px' rounded='lg'>
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
                  <ChainBox key={chain.id} chain={chain} />
                ))}
              </Flex>
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
            </Flex>
          </Container>
          <Accordion allowMultiple>
            {assets.filter(asset => asset.isNative === true).map((asset) => (
                <AssetAccordion key={asset.id} setAsset={setAsset} asset={asset} close={onClose} setChain={setChain}/>
            ))}
          </Accordion>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default AssetListModal