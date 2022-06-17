import { SendMailDTO } from '../../../types/SendMailDTO'
const nodemailer = require('nodemailer')
const smtpTransport = require('nodemailer-smtp-transport')

const transporter = nodemailer.createTransport(
  smtpTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASSWORD,
    },
  })
)

export default function SendMail(req: SendMailDTO, res: any) {
  const { donationData, paymentSuccessful } = req.body
  const mailOptions = {
    from: process.env.MAIL_USER,
    to: donationData.mail,
    subject: paymentSuccessful
      ? 'Your payment was successful'
      : 'Yor payment was reverted',
    text: `Payment Data: \n Email: ${donationData.mail} \n Premium Points: ${
      donationData.points
    } \n Cost in EUR: ${donationData.priceInEur} \n Cost in ETH: ${
      donationData.priceInEth
    } \n Payment Status: ${paymentSuccessful ? 'Successful' : 'Reverted'}`,
  }
  transporter.sendMail(mailOptions, function (error: unknown, info: any) {
    if (error) {
      res.status(501).json({ success: false })
    } else {
      res.status(200).json({ success: true })
    }
  })
}
