const map = {
  pegin: 0.1,
  pegout: 0.25
}

const getFee = (_from, _to) => {
  if (_from.isNative) return map.pegin
  else if (!_from.isNative && !_to.isNative) return map.pegin
  else return map.pegout
}

export { getFee }
