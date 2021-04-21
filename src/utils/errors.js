const parseError = _err => {
  // NOTE: metamask
  if (_err.code && _err.message) {
    const { code } = _err
    if (code === 4001) {
      return {
        showModal: false,
        message: _err.message
      }
    }
  }

  // NOTE: eosConnect
  if (_err.toString().includes('User canceled request')) {
    return {
      showModal: false,
      message: _err
    }
  }

  return {
    showModal: true,
    message: _err.message ? _err.message : _err
  }
}

export { parseError }
