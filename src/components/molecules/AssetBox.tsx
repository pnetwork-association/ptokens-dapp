import {
  Badge,
  Button,
  Flex,
  Image,
  Text,
  // useColorMode,
  // useDisclosure,
  useColorModeValue,
} from '@chakra-ui/react'
import { BaseAsset } from '../../settings/swap-assets'
import chainList from '../../settings/chain-list'
import { Blockchain } from 'ptokens-constants'

interface AssetBoxProps {
  asset: BaseAsset
  setAsset: Function
  close: Function
  setChain: Function
}

const AssetBox: React.FC<AssetBoxProps> = ({asset, setAsset, close, setChain}) => {
  console.log(asset, chainList)
  return (
    <Button
      onClick={() => setAsset(asset) || setChain(chainList.find(chain => chain.blockchain === asset.blockchain)) || close() }
      w='100%'
      mb='8px'
      px={2}
      py={1}
      rounded={'md'}
      bg='gray.700'
      _hover={{
        textDecoration: 'none',
        bg: useColorModeValue('gray.200', 'gray.600'),
      }}
    >
      <Flex
        w='100%'
        justifyContent={'space-between'}
        alignContent={'center'}
        alignItems={'center'}
      > 
        <Flex alignContent={'center'} alignItems={'center'}>
          <Image mr='3'
            boxSize='50px' 
            src={asset ? '/assets/svg/' + asset.image : '/assets/svg/blockchain.svg'}
          />
          <Flex alignContent={'center'} alignItems={'flex-start'} flexDir={'column'}>
            {asset ? asset.isNative ? (
                <Text fontSize={'sm'}> Native on 
                  <Badge ml='1' colorScheme='blue' alignContent={'right'}>
                    {Blockchain[asset.blockchain]}
                  </Badge> 
                </Text>
              ) : (
                <Text fontSize={'sm'}> pToken on 
                <Badge ml='1' colorScheme='blue' alignContent={'right'}>
                  {Blockchain[asset.blockchain]}
                </Badge> 
              </Text>
              ) : null
            }
          </Flex>
        </Flex>
        <Badge>
          -
        </Badge>
      </Flex>
    </Button>
  )
}

export default AssetBox