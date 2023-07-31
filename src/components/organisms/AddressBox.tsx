import {
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react'
import { CheckIcon } from '@chakra-ui/icons'

const AddressBox: React.FC = () => {
  return(
      <InputGroup mt='4px'>
        <Input 
          borderColor={'gray.600'} 
          placeholder='Destination Address' 
          _placeholder={{ color: 'gray.600' }}
          size='md' 
          color='white' />
        <InputRightElement>
          <CheckIcon color='green.500' />
        </InputRightElement>
      </InputGroup>
  )
}

export default AddressBox