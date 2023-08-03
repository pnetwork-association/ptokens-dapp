import {
  Button,
  Menu,
  MenuButton,
  MenuList,
  Image,
} from '@chakra-ui/react'
import { ChevronDownIcon, DragHandleIcon } from '@chakra-ui/icons'
import chainList, { BaseChain } from '../../settings/chain-list'
import ChainItem from '../molecules/ChainItem'
import { useEffect, useState } from 'react'

interface ChainListMenuProps {
  chain: BaseChain
  setChain: Function
  id?: string
  size?: string
  hoverEffect?: object
}

const ChainListMenu: React.FC<ChainListMenuProps> = ({ id, chain, setChain, size, hoverEffect }) => {  
  const [boxSize, setBoxSize] = useState('25px')
  const [hover, setHover] = useState({
    transform: 'scale(1.05, 1.05)',
    bg: `gray.700`,
  })

  useEffect(() => {
    size ? setBoxSize(size) : null
  }, [size])

  useEffect(() => {
    hoverEffect ? setHover(hoverEffect) : null
  }, [hoverEffect])

  return (
    <Menu id={id} placement='bottom-end'>
      <MenuButton 
        as={Button}
        py={1}
        px={2}
        rounded={'md'} 
        iconSpacing='0'
        rightIcon={<ChevronDownIcon />} 
        _hover={hover}
      >
        <Image
          boxSize={boxSize}
          src={chain ? '/assets/svg/' + chain.image : '/assets/svg/blockchain.svg'}
        />
      </MenuButton>
      <MenuList minW={'fit-content'}>
        {chainList.map((_chain) => (
          <ChainItem key={_chain.id} setChain={setChain} chain={_chain} selChain={chain}/>
        ))}
      </MenuList>
      </Menu>
  )
}

export default ChainListMenu