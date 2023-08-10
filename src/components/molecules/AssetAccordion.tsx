import {
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Box,
  Flex,
  Image,
  Text,
} from '@chakra-ui/react'
import assets/*, { AssetWithAddress, UpdatedAsset }*/ from '../../settings/swap-assets'
import { AccordionIcon } from '@chakra-ui/react'
import { BaseAsset } from '../../settings/swap-assets'
import AssetBox from './AssetBox'

interface AssetAccordionProps {
  asset: BaseAsset
  setAsset: Function
  close: Function
  setChain: Function
}

const AssetAccordion: React.FC<AssetAccordionProps> = ({asset, setAsset, close, setChain}) => {
  return (
    <AccordionItem mt='2'>
      <h2>
        <AccordionButton bg='gray.800' rounded={'md'} px='2' py='1'>
          <Box as="span" flex='1' textAlign='left'>
            <Flex alignContent={'center'} alignItems={'center'}>
              <Image mr='3'
                boxSize='50px' 
                src={asset ? '/assets/svg/' + asset.image : '/assets/svg/blockchain.svg'}
              />
              <Text as='b' fontSize={'lg'}>
                {asset ? asset.nativeSymbol : null}
              </Text>
            </Flex>
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel mt='2'>
        {assets.filter(currAsset => currAsset.nativeSymbol === asset.nativeSymbol).map((currAsset) => (
          <AssetBox key={currAsset.id} setAsset={setAsset} asset={currAsset} close={close} setChain={setChain}/>
        ))}
      </AccordionPanel>
    </AccordionItem>
  )
}

export default AssetAccordion