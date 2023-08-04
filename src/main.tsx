import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraBaseProvider, extendBaseTheme } from '@chakra-ui/react'
import chakraTheme from '@chakra-ui/theme'
import App from './App.tsx'
import { buttonTheme } from './theme/Button.tsx'

const { 
  Badge,
  Divider,
  NumberInput,
  Input,
  Slider,
  Tooltip,
  Container,
  Modal,
  Menu,
  Tag,
} = chakraTheme.components

const theme = extendBaseTheme({
  components: {
    Badge,
    Button: buttonTheme,
    Container,
    Divider,
    NumberInput,
    Slider,
    Tooltip,
    Input,
    Modal,
    Menu,
    Tag,
  },
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraBaseProvider theme={theme}>
      <App />
    </ChakraBaseProvider>
  </React.StrictMode>
)
