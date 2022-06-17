const Moralis = require('moralis/node')
import { NextApiResponse } from 'next'
import { clearInterval } from 'timers'
import { PostCryptoDTO } from '../../../types/PostCryptoDTO'
import axios from 'axios'
export default function PostCrypto(req: PostCryptoDTO, res: NextApiResponse) {
  const {
    transaction: { hash },
    donationInfo,
  } = req.body
  const awaitConfirmation = async () => {
    Moralis.start({
      serverUrl: process.env.NEXT_PUBLIC_SERVER_URL,
      appId: process.env.NEXT_PUBLIC_SERVER_URL,
    })
    const checkStatusInterval = setInterval(async () => {
      const transaction = await Moralis.Web3API.native.getTransaction({
        chain: process.env.NETWORK,
        transaction_hash: hash,
      })

      if (transaction.receipt_status === '1') {
        clearInterval(checkStatusInterval)
        res.status(200).json({ success: true })
        try {
          await axios.post(`${process.env.URL}/api/mail`, {
            donationData: donationInfo,
            paymentSuccessful: true,
          })
        } catch (error) {
          console.error(error)
        }
      }
      if (transaction.receipt_status === '0') {
        clearInterval(checkStatusInterval)
        res.status(420).json({ error: 'Your transaction was reverted' })
        try {
          await axios.post('/api/mail', {
            donationData: donationInfo,
            paymentSuccessful: false,
          })
        } catch (error) {
          console.error(error)
        }
      }
    }, 2000)
  }
  awaitConfirmation()
}
