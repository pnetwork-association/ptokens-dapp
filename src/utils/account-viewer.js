const slicer = _address => `${_address.slice(0, 6)}...${_address.slice(_address.length - 4, _address.length)}`

export { slicer }
