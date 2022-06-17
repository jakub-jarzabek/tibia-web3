import { useMoralis } from 'react-moralis'
export const useConnectToMetaMask = () => {
  const { enableWeb3, isWeb3Enabled } = useMoralis()
  const connect = () => {
    if (!isWeb3Enabled) {
      enableWeb3()
    } else {
      console.log('authenticated')
    }
  }
  return { connect, isWeb3Enabled }
}
