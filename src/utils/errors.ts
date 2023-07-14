const parseError = (_err: object) => {
  // NOTE: metamask
  if ('code' in _err && _err.code && 'message' in _err) {
    const { code } = _err
    if (code === 4001) {
      return {
        showModal: false,
        message: _err.message,
      }
    }
  }

  // NOTE: eosConnect
  if (_err.toString().includes('User canceled request')) {
    return {
      showModal: false,
      message: _err,
    }
  }

  return {
    showModal: true,
    message: 'message' in _err ? _err.message : _err,
  }
}

export { parseError }
