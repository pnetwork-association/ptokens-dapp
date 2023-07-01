import { Blockchain } from 'ptokens-constants'

const slicer = (_address: string) => `${_address.slice(0, 6)}...${_address.slice(_address.length - 4, _address.length)}`

const slicerByBlockchain = (_address: string, _blockchain: Blockchain) => {
  switch (_blockchain) {
    default: {
      return _address ? slicer(_address) : _address
    }
  }
}

export { slicer, slicerByBlockchain }
