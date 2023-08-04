import {
  Box,
  Image,
  Container,
} from '@chakra-ui/react'
import { BaseChain } from '../../settings/chain-list'

interface ChainBoxProps {
  chain: BaseChain
}

const ChainBox: React.FC<ChainBoxProps> = ({chain}) => {

  return (
    <Box
      mb='2'
      mr='1'
      // borderColor={'blue'}
      // borderWidth= {'thin'}
      // borderRadius='full'
      // shadow={'1px 1px 10px blue'}
    >
      <Image
        boxSize={'40px'}
        p='1'
        boxShadow={'1'}
        borderRadius='full'        
        _hover={{
          transform: 'scale(1.1, 1.1)',
          bg: 'blue.400',
          shadow: '1px 1px 10px blue.600'
        }}
        _active={{
          transform: 'scale(1.05, 1.05)',
          border: 'blu'
        }}
        src={chain ? '/assets/svg/' + chain.image : '/assets/svg/blockchain.svg'}
      />
    </Box>
  )
}

export default ChainBox