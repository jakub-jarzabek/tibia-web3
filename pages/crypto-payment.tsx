import { Box, Alert } from '@mui/material'
import {
  StyledBox,
  StyledBackground,
  StyledWrapper,
  StyledModal,
  StyledModalText,
  StyledLinearProgress,
  StyledErrorText,
  StyledSuccessText,
  StyledImage,
  StyledButton,
  StyledLoadingBox,
  StyledHash,
} from '../styles/crypto-payment.styles'
import {
  useConnectToMetaMask,
  useDetectMetaMask,
  useGetPriceRates,
  useSendTransaction,
} from '../utils'
import { UserInfo } from '../components'
import { EthExchange } from '../components/EthExchange'
import { useRouter } from 'next/router'
import Link from 'next/link'

interface IQuery {
  amount: string
  mail: string
  accountId: string
  points: string
}

const CryptoPayment = () => {
  const scanServiceCoreUrl =
    process.env.NETWORK === 'eth'
      ? 'https://etherscan.io/address/'
      : `https://${process.env.NEXT_PUBLIC_NETWORK}.etherscan.io/address/`
  const r: any = useRouter()
  const query = r.query as IQuery
  const { euroToEth } = useGetPriceRates()
  const { connect, isWeb3Enabled } = useConnectToMetaMask()
  const { success, loading, error, transferFunds, hash } = useSendTransaction(
    euroToEth,
    {
      priceInEur: query?.amount,
      mail: query?.mail,
      points: query?.points,
      priceInEth: euroToEth * Number(query?.amount),
    }
  )
  const { metaMaskInstalled } = useDetectMetaMask()

  return (
    <StyledWrapper>
      <StyledBackground src="/BackgroundTibia.jpg" layout="fill" />
      {!metaMaskInstalled && (
        <Alert severity="error">Meta Mask wallet is not installed!</Alert>
      )}
      {loading || success || error || true ? (
        <StyledModal open={true} hideBackdrop={true}>
          <Box>
            {error || success ? (
              <>
                {error && <StyledErrorText>{error}</StyledErrorText>}
                {success && (
                  <StyledSuccessText>
                    Your transaction was processed successfuly and fund were
                    added to your account.
                  </StyledSuccessText>
                )}
              </>
            ) : (
              <StyledLoadingBox>
                <StyledLinearProgress />
                <StyledModalText>
                  Your transaction is being proccessed. You can close this
                  window or wait for confirmation. We will send you an email
                  when transaction is confirmed and your points are added.
                </StyledModalText>
                <StyledHash>{`Transaction hash: \n ${hash}`}</StyledHash>
                <Link href={`${scanServiceCoreUrl}${hash}`}>
                  <a target="_blank">
                    <StyledButton variant="outlined">
                      View on Eather Scan
                    </StyledButton>
                  </a>
                </Link>
              </StyledLoadingBox>
            )}
          </Box>
        </StyledModal>
      ) : (
        <StyledBox>
          <StyledImage src="/MetaMask.png" width="200px" height="200px" />
          <EthExchange exchangeRate={euroToEth} />
          <UserInfo
            amount={query?.amount}
            mail={query?.mail}
            points={query?.points}
            ethExchangeRate={euroToEth}
          />
          {!isWeb3Enabled ? (
            <>
              {metaMaskInstalled && (
                <StyledButton variant="outlined" onClick={connect}>
                  Connect with metamask
                </StyledButton>
              )}
            </>
          ) : (
            <>
              {metaMaskInstalled && (
                <StyledButton variant="outlined" onClick={transferFunds}>
                  Confirm Payment
                </StyledButton>
              )}
            </>
          )}
        </StyledBox>
      )}
    </StyledWrapper>
  )
}

export default CryptoPayment
