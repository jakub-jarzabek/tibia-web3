import { NextApiRequest } from 'next'

interface IDonationInfo {
  mail: string
  points: string
  priceInEur: string
  priceInEth: number
}
export interface SendMailDTO extends NextApiRequest {
  body: {
    paymentSuccessful: boolean
    donationData: IDonationInfo
  }
}
