import { NextApiRequest } from 'next'
import Moralis from 'moralis/types'

interface IDonationInfo {
  mail: string
  points: string
  priceInEur: string
  priceInEth: number
}
export interface PostCryptoDTO extends NextApiRequest {
  body: {
    transaction: Moralis.TransactionResult
    donationInfo: IDonationInfo
  }
}
