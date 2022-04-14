const slicer = _address => `${_address.slice(0, 6)}...${_address.slice(_address.length - 4, _address.length)}`

const slicerByBlockchain = (_address, _blockchain) => {
  switch (_blockchain.toUpperCase()) {
    case 'EOS': {
      return _address
    }
    case 'TELOS': {
      return _address
    }
    case 'ULTRA': {
      return _address
    }
    case 'ORE': {
      return _address
    }
    default: {
      return _address ? slicer(_address) : _address
    }
  }
}

export { slicer, slicerByBlockchain }
