
const getCorrespondingHeaderMap = (_pTokenName, _role) => {
  switch (_pTokenName) {
    case 'pEOS': {
      return _role === 'issuer'
        ? {
            peos_amount: 'AMOUNT pEOS',
            broadcast_timestamp: 'TIMESTAMP',
            incoming_transaction_hash: 'EOS TX ID (FROM)',
            broadcast_transaction_hash: 'ETH TX HASH (TO)'
            //prooved: 'VERIFIED'
          }
        : {
            eos_amount: 'AMOUNT pEOS',
            broadcast_timestamp: 'TIMESTAMP',
            incoming_transaction_hash: 'ETH TX HASH (FROM)',
            broadcast_transaction_hash: 'EOS TX ID (TO)'
            //prooved: 'VERIFIED'
          }
    }

    case 'pBTC': {
      return _role === 'issuer'
        ? {
            eth_tx_amount: 'AMOUNT pBTC',
            broadcast_timestamp: 'TIMESTAMP',
            originating_tx_hash: 'BTC TX HASH (FROM)',
            eth_tx_hash: 'ETH TX HASH (TO)'
            //prooved: 'VERIFIED'
          }
        : {
            btc_tx_amount: 'AMOUNT pBTC',
            broadcast_timestamp: 'TIMESTAMP',
            originating_tx_hash: 'ETH TX HASH (FROM)',
            broadcast_tx_hash: 'BTC TX HASH (TO)'
            //prooved: 'VERIFIED'
          }
    }

    case 'pLTC': {
      return _role === 'issuer'
        ? {
            eth_tx_amount: 'AMOUNT pLTC',
            broadcast_timestamp: 'TIMESTAMP',
            originating_tx_hash: 'LTC TX HASH (FROM)',
            eth_tx_hash: 'ETH TX HASH (TO)'
            //prooved: 'VERIFIED'
          }
        : {
            btc_tx_amount: 'AMOUNT pLTC',
            broadcast_timestamp: 'TIMESTAMP',
            originating_tx_hash: 'ETH TX HASH (FROM)',
            broadcast_tx_hash: 'LTC TX HASH (TO)'
            //prooved: 'VERIFIED'
          }
    }

    default:
      break
  }
}

const getCorrespondingHeaders = (_pTokenName, _role) => {
  if (_pTokenName === 'pEOS' && _role === 'issuer') {
    return [
      'peos_amount',
      'broadcast_timestamp',
      'incoming_transaction_hash',
      'broadcast_transaction_hash'
      //'prooved'
    ]
  }

  if (_pTokenName === 'pEOS' && _role === 'redeemer') {
    return [
      'eos_amount',
      'broadcast_timestamp',
      'incoming_transaction_hash',
      'broadcast_transaction_hash'
      //'prooved'
    ]
  }

  if (_pTokenName === 'pBTC' && _role === 'issuer') {
    return [
      'eth_tx_amount',
      'broadcast_timestamp',
      'originating_tx_hash',
      'eth_tx_hash'
      //'prooved'
    ]
  }

  if (_pTokenName === 'pBTC' && _role === 'redeemer') {
    return [
      'btc_tx_amount',
      'broadcast_timestamp',
      'originating_tx_hash',
      'broadcast_tx_hash'
      //'prooved'
    ]
  }

  if (_pTokenName === 'pLTC' && _role === 'issuer') {
    return [
      'eth_tx_amount',
      'broadcast_timestamp',
      'originating_tx_hash',
      'eth_tx_hash'
      //'prooved'
    ]
  }

  if (_pTokenName === 'pLTC' && _role === 'redeemer') {
    return [
      'btc_tx_amount',
      'broadcast_timestamp',
      'originating_tx_hash',
      'broadcast_tx_hash'
      //'prooved'
    ]
  }  
}

export {
  getCorrespondingHeaderMap,
  getCorrespondingHeaders
}