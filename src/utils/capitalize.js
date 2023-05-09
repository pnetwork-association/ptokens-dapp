const capitalizeFirstLetter = (_string) => _string.charAt(0).toUpperCase() + _string.slice(1)
const capitalizeAllLettersExceptFirst = (_string) => _string.charAt(0).toLowerCase() + _string.slice(1).toUpperCase()

export { capitalizeFirstLetter, capitalizeAllLettersExceptFirst }
