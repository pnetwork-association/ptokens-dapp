import React, { ReactNode  } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import {
  Box,
  Flex,
  Button,
  useColorModeValue,
  Stack,
  HStack,
  useColorMode,
  Link,
  IconButton,
  useDisclosure,
  Text,
} from '@chakra-ui/react'
import { MoonIcon, SunIcon, ExternalLinkIcon, HamburgerIcon, CloseIcon } from '@chakra-ui/icons'
import Logo from '../atoms/Logo'

type NavObject = {
  name: ReactNode
  path: string
}

type ExtLinkObject = {
  name: ReactNode
  href: string
}

const navEntries = [
  {
    name: 'Swap',
    path: '/swap',
  },
  {
    name: 'Migration',
    path: '/swap',
  },
  {
    name: 'NFTs',
    path: '/swap',
  },
  {
    name: 'Risks',
    path: '/risks',
  },
  {
    name: 'History',
    path: '/swap',
  },
]

const extLinksEntries = [
  {
    name: 'Stats',
    href: 'https://pnetwork.watch/public-dashboards/deecb58c02ec431390c5e38905ff4777?orgId=1',
  },
  {
    name: 'Audits',
    href: 'https://skynet.certik.com/projects/pnt',
  },
  {
    name: '$PNT',
    href: 'https://coinmarketcap.com/currencies/pnetwork/',
  },
]

const NavLink = ({ children }: { children: NavObject }) => (
  <Link
    as={RouterLink}
    to={children.path}
    href={'#'}
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'gray.700'),
    }}>
    {children.name}
  </Link>
)

const ExtLink = ({ children }: { children: ExtLinkObject }) => (
  <Link
    isExternal
    href={children.href}
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'gray.700'),
    }}>
    {children.name} <ExternalLinkIcon viewBox={'0 0 30 30'} />
  </Link>
)

const Header: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
      <Flex minWidth='max-content' h={16} alignItems={'center'} justifyContent={'space-between'}>
        <IconButton
          size={'md'}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label={'Open Menu'}
          display={{ md: 'none' }}
          onClick={isOpen ? onClose : onOpen}
        />
        <Flex alignItems={'center'} justifyContent={'space-between'}>
          <Box>
            {/* <Logo display={{ base: 'none', md: 'flex' }} width={'30px'} height={'30px'} marginRight={'16px'} /> */}
            <Text marginRight={'16px'} paddingTop={1}> 
              <Logo width={'30px'} height={'30px'} marginRight={'5px'}/> 
              pNetwork 
            </Text>
          </Box>
          <HStack
            as={'nav'}
            spacing={3}
            display={{ base: 'none', md: 'flex' }}>
            {navEntries.map((entry) => (
              <NavLink key={entry.name}>{entry}</NavLink>
            ))}
            {extLinksEntries.map((entry) => (
              <ExtLink key={entry.name}>{entry}</ExtLink>
            ))}
          </HStack>
        </Flex>
        <Stack direction={'row'} spacing={7} >
          <Button onClick={toggleColorMode}>
            {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
          </Button>
        </Stack>
      </Flex>
      {isOpen ? (
        <Box pb={4} display={{ md: 'none' }}>
          <Stack as={'nav'} spacing={4}>
            {navEntries.map((entry) => (
              <NavLink key={entry.name}>{entry}</NavLink>
            ))}
            {extLinksEntries.map((entry) => (
              <ExtLink key={entry.name}>{entry}</ExtLink>
            ))}
          </Stack>
        </Box>
      ) : null}
    </Box>
  )
}

export default Header