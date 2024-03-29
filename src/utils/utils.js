const sleep = (_ms) => new Promise((_resolve) => setTimeout(_resolve, _ms))

const copyToClipboard = (_value) => {
  const textField = document.createElement('textarea')
  textField.innerText = _value
  document.body.appendChild(textField)
  textField.select()
  document.execCommand('copy')
  textField.remove()
}

export { sleep, copyToClipboard }
