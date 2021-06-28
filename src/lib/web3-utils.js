import { id as keccak256 } from 'ethers/utils'
import { ethers } from 'ethers'
export const DEFAULT_LOCAL_CHAIN = 'private'

export function humanRedeableAmout(amount) {
    return parseFloat(ethers.utils.formatEther(amount)).toFixed(4);
}

function toChecksumAddress(address) {
  if (!/^(0x)?[0-9a-f]{40}$/i.test(address)) {
    throw new Error(
      'Given address "' + address + '" is not a valid Ethereum address.'
    )
  }

  address = address.toLowerCase().replace(/^0x/i, '')

  const addressHash = keccak256(address).replace(/^0x/i, '')
  let checksumAddress = '0x'

  for (let i = 0; i < address.length; i++) {
    // If ith character is 9 to f then make it uppercase
    if (parseInt(addressHash[i], 16) > 7) {
      checksumAddress += address[i].toUpperCase()
    } else {
      checksumAddress += address[i]
    }
  }

  return checksumAddress
}

// Check address equality with checksums
export function addressesEqual(first, second) {
  first = first && toChecksumAddress(first)
  second = second && toChecksumAddress(second)
  return first === second
}

export const addressPattern = '(0x)?[0-9a-fA-F]{40}'


export function shortenAddress(address, charsLength = 4) {
  const prefixLength = 2 // "0x"
  if (!address) {
    return ''
  }
  if (address.length < charsLength * 2 + prefixLength) {
    return address
  }
  return (
    address.slice(0, charsLength + prefixLength) +
    '…' +
    address.slice(-charsLength)
  )
}

//TODO: Add DN network id
export function getNetworkType(chainId) {
  chainId = String(chainId)

  if (chainId === '1') return 'main'
  if (chainId === '3') return 'ropsten'
  if (chainId === '4') return 'rinkeby'
  if (chainId === '5') return 'goerli'
  if (chainId === '42') return 'kovan'
  if (chainId === '100') return 'xDAI'
  if (chainId === 'localhost') return 'localhost'

  return DEFAULT_LOCAL_CHAIN
}


//TODO: Add DN network id
export function networkAllowed(chainId) {
  chainId = String(chainId)
  return (chainId === '100' || chainId === '1')
}

export function isMainnet(chainId) {
  chainId = String(chainId)
  return (chainId === '1')
}

//TODO: Change networtk
export function isDN(chainId) {
  chainId = String(chainId)
  return (chainId === '100')
}
