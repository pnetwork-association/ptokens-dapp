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
    case 'arrow-down':
      return arrowDown
    case 'arrow-down2':
      return arrowDown2
    case 'arrow-up':
      return arrowUp
    case 'cancel':
      return cancel
    case 'close':
      return close
    case 'copy':
      return copy
    case 'descendant':
      return descendant
    case 'down-arrow':
      return downArrow
    case 'metamask':
      return metamask
    case 'moon':
      return moon
    case 'sort':
      return sort
    case 'sun':
      return sun
    case 'wallet':
      return wallet
    case 'warning':
      return warning
    case 'world':
      return world
    default:
      return arrowDiagonal
  }
}

export default getIconSource
