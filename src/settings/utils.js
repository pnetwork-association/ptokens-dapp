const generateSettings = (settings) => {
  const settingsObj = {}

  for (const key in settings) {
    const item = settings[key]
    const label = key.charAt(0).toUpperCase() + key.slice(1) + ' API Key'
    const value = item.endpoint || item

    settingsObj[key] = {
      label,
      value,
    }

    for (const field in item) {
      settingsObj[key][field] = item[field]
    }
  }

  return settingsObj
}

export default generateSettings
