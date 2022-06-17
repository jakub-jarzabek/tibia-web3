import { useState, useEffect } from 'react'

export const useDetectMetaMask = () => {
  const [metaMaskInstalled, setMetaMaskInstalled] = useState(true)
  useEffect(() => {
    if (typeof window?.ethereum === 'undefined') setMetaMaskInstalled(false)
  }, [])
  return { metaMaskInstalled }
}
