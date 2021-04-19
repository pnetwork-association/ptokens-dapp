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

  return {
    showModal: true,
    message: _err.message ? _err.message : _err
  }
}

export { parseError }
