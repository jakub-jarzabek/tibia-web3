import { useState } from 'react'
import axios, { AxiosError } from 'axios'
import { useWeb3Transfer } from 'react-moralis'
import Moralis from 'moralis'
import MoralisTypes from 'moralis/types'

interface IDonationInfo {
  mail: string
  points: string
  priceInEur: string
  priceInEth: number
}
export const useSendTransaction = (
  price: number,
  donationInfo: IDonationInfo
) => {
  const { fetch } = useWeb3Transfer({
    type: 'native',
    amount: Moralis.Units.ETH(price),
    receiver: process.env.NEXT_PUBLIC_WALLET_KEY,
  })

  const [error, setError] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [success, setSuccess] = useState<boolean>(false)
  const [hash, setHash] = useState<string>('')

  const transferFunds = async () => {
    const result = (await fetch()) as MoralisTypes.TransactionResult

    setHash(result.hash)
    if (result) {
      setLoading(true)
      try {
        await axios.post('/api/crypto', {
          transaction: result,
          donationInfo: donationInfo,
        })
        setSuccess(true)
      } catch (error) {
        if (error && error instanceof AxiosError) {
          setError(error.response!.data.error)
        }
      } finally {
        setLoading(false)
      }
    }
  }
  return { error, loading, success, transferFunds, hash }
}
