import arrowDiagonal from './icons/arrow-diagonal.svg?raw'
import arrowDown from './icons/arrow-down.svg?raw'
import arrowDown2 from './icons/arrow-down2.svg?raw'
import arrowUp from './icons/arrow-up.svg?raw'
import cancel from './icons/cancel.svg?raw'
import close from './icons/close.svg?raw'
import copy from './icons/copy.svg?raw'
import descendant from './icons/descendant.svg?raw'
import downArrow from './icons/down-arrow.svg?raw'
import metamask from './icons/metamask.svg?raw'
import moon from './icons/moon.svg?raw'
import sort from './icons/sort.svg?raw'
import sun from './icons/sun.svg?raw'
import wallet from './icons/wallet.svg?raw'
import world from './icons/world.svg?raw'
import warning from './icons/warning.svg?raw'

const getIconSource = (icon) => {
  switch (icon) {
    case 'arrow-diagonal':
      return arrowDiagonal
      break
    case 'arrow-down':
      return arrowDown
      break
    case 'arrow-down2':
      return arrowDown2
      break
    case 'arrow-up':
      return arrowUp
      break
    case 'cancel':
      return cancel
      break
    case 'close':
      return close
      break
    case 'copy':
      return copy
      break
    case 'descendant':
      return descendant
      break
    case 'down-arrow':
      return downArrow
      break
    case 'metamask':
      return metamask
      break
    case 'moon':
      return moon
      break
    case 'sort':
      return sort
      break
    case 'sun':
      return sun
      break
    case 'wallet':
      return wallet
      break
    case 'warning':
      return warning
      break
    case 'world':
      return world
      break
    default:
      return arrowDiagonal
  }
}

export default getIconSource
