import {
  Box,
  Flex,
  Image,
} from '@chakra-ui/react'
import { BaseChain } from '../../settings/chain-list'
import { useEffect, useState } from 'react'

interface ChainBoxProps {
  chain: BaseChain
}

const ChainBox: React.FC<ChainBoxProps> = ({chain}) => {
  const [isActive, setIsActive] = useState(true)
  const [activeBg, setActiveBg] = useState('transparent')

  useEffect(() => {
    if (isActive)
      setActiveBg('blue.400')
    else setActiveBg('transparent')
  }, [isActive])

  return (
    <Box
      mb='2'
      mr='0.5'
    >
      <Flex
        alignItems={'center'}
      >
        <Image
          onClick={() => setIsActive(!isActive)}
          bg={activeBg}
          boxSize={'28px'}
          p='0.5'
          boxShadow={'1'}
          borderRadius='full'        
          _hover={{
            transform: 'scale(1.1, 1.1)',
          }}
          _active={{
            border: 'blu'
          }}
          src={chain ? '/assets/svg/' + chain.image : '/assets/svg/blockchain.svg'}
        />
      </Flex>
    </Box>
  )
}

export default ChainBox