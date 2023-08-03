import {
  Image,
  MenuItem,
  Text,
  // useColorMode,
  // useDisclosure,
  // useColorModeValue,
} from '@chakra-ui/react'
import { BaseChain } from '../../settings/chain-list'
import { Blockchain } from 'ptokens-constants'
import { useEffect, useState } from 'react'

interface ChainBoxProps {
  chain: BaseChain
  selChain: BaseChain
  setChain: Function
}

const ChainItem: React.FC<ChainBoxProps> = ({selChain, chain, setChain}) => {
  const [selTheme, setSelTheme] = useState('white')
  
  useEffect(() => {
    if (selChain == chain)
      setSelTheme('blue.400')
    else
      setSelTheme('white')
  }, [selChain])

  return (
    <MenuItem onClick={() => setChain(chain)} >
      <Image
        boxSize='25px' 
        src={chain ? '/assets/svg/' + chain.image : '/assets/svg/blockchain.svg'}
      />
      <Text ml='2' color={selTheme} >
        {Blockchain[chain.blockchain]}
      </Text>
    </MenuItem>
  )
}

export default ChainItem