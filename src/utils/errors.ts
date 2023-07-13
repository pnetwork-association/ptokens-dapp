const parseError = (_err: Error) => {
  // NOTE: metamask
  if ('code' in _err && _err.code && _err.message) {
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
    message: _err.message ? _err.message : _err,
  }
}

export { parseError }
