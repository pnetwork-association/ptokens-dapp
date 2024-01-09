import { driver } from "driver.js"

export const tour = driver({
  showProgress: true,
  steps: [
    { 
      element: '#mainButton', 
      popover: { 
        title: 'Connect your wallet', 
        description: 'Connect your wallet in order to be able to swap assets.', 
        side: 'right', 
        align: 'center' 
      }
    },
    { 
      element: '#originBtnId', 
      popover: { 
        title: 'Select your asset', 
        description: 'Select the asset you want to swap.', 
        side: 'left', 
        align: 'start' 
      }
    },
    { 
      element: '#originInputId', 
      popover: { 
        title: 'Set the amount', 
        description: 'Set the amount to swap.', 
        side: 'bottom', 
        align: 'end' 
      }
    },
    { 
      element: '#destinationBtnId', 
      popover: { 
        title: 'Set the asset to receive', 
        description: 'Set the asset to receive on the destination chain.', 
        side: 'bottom', 
        align: 'start' 
      }
    },
    { 
      element: '#destinationChainId', 
      popover: { 
        title: 'Quick chain swap', 
        description: 'Use this button to keep the asset and change just the destination chain.', 
        side: 'top', 
        align: 'start' 
      }
    },
    { 
      element: '#destinationInputId', 
      popover: { 
        title: 'Check the received amount', 
        description: 'Here is the amount actually received considering protocol fees.', 
        side: 'bottom', 
        align: 'end' 
      }
    },
    { 
      element: '#destinationAddress', 
      popover: { 
        title: 'Choose a destination account', 
        description: 'Insert here the address of the account on which you want to receive the destination asset. It must be an account on the destination chain!', 
        side: 'right', 
        align: 'end' 
      }
    },
    { 
      element: '#mainButton', 
      popover: { 
        title: 'Start the swap', 
        description: 'Once everything is set start the swap from the main button.', 
        side: 'right', 
        align: 'center' 
      }
    },
    { 
      popover: { 
        title: 'Enjoy decentralization!', 
        description: 'That\'s all! Feedbacks are welcome at hello@p.network' 
      }
    }
  ]
})