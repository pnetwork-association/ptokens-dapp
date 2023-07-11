const generateRpcSettings = (settings) =>
  Object.assign(
    {},
    Object.fromEntries(
      Object.entries(settings).map(([key, val]) => {
        return [key, { label: val.label, value: val.endpoint }]
      })
    )
  )

export default generateRpcSettings
