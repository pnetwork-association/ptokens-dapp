const sleep = ms => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

const copyToClipboard = _value => {
  const textField = document.createElement('textarea')
  textField.innerText = _value
  document.body.appendChild(textField)
  textField.select()
  document.execCommand('copy')
  textField.remove()
}

export { sleep, copyToClipboard }
