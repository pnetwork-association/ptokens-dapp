import { Blockchain } from '../constants'

const slicer = (_address) => `${_address.slice(0, 6)}...${_address.slice(_address.length - 4, _address.length)}`

const slicerByBlockchain = (_address, _blockchain) => {
  switch (_blockchain) {
    case Blockchain.EOS:
    case Blockchain.Telos:
    case Blockchain.Libre:
    case Blockchain.Ultra:
    case Blockchain.Ore:
      return _address
    default:
      return _address ? slicer(_address) : _address
  }
}

export { slicer, slicerByBlockchain }
