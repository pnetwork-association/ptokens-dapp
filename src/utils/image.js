const getBase64Image = url =>
  new Promise(resolve => {
    const request = new XMLHttpRequest()
    request.onload = function() {
      const file = new FileReader()
      file.onloadend = function() {
        resolve(file.result)
      }
      file.readAsDataURL(request.response)
    }
    request.open('GET', url)
    request.responseType = 'blob'
    request.send()
  })

export { getBase64Image }
