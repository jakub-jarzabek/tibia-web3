import React from 'react'
import { styled } from '@mui/material/styles'
import { Box } from '@mui/material'

const StyledLabel = styled('span')`
  display: block;
  font-family: 'Roboto', sans-serif;
  font-size: 16px;
  font-weight: 700;
  color: #1976d2;
`
const StyledText = styled('span')`
  display: block;
  font-family: 'Roboto', sans-serif;
  font-size: 16px;
  font-weight: 400;
  color: black;
`
const TextRow = styled('div')`
  display: flex;
  flex-direction: row;
  gap: 12px;
`
const Container = styled(Box)`
  margin: 16px 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
`
const StyledCurrency = styled('span')`
  font-family: 'Roboto', sans-serif;
  font-size: 16px;
  font-weight: 700;
  color: #1976d2;
`
interface IUserInfo {
  amount: string
  mail: string
  points: string
  ethExchangeRate: number
}
export const UserInfo: React.FC<IUserInfo> = ({
  amount,
  mail,
  points,
  ethExchangeRate,
}) => {
  return (
    <Container>
      <TextRow>
        <StyledLabel>Email: </StyledLabel>
        <StyledText>{mail}</StyledText>
      </TextRow>
      <TextRow>
        <StyledLabel>Premium Points: </StyledLabel>
        <StyledText>
          {points}
          <StyledCurrency> PP</StyledCurrency>
        </StyledText>
      </TextRow>
      <TextRow>
        <StyledLabel>Price in EUR: </StyledLabel>
        <StyledText>
          {amount}
          <StyledCurrency> €</StyledCurrency>
        </StyledText>
      </TextRow>
      <TextRow>
        <StyledLabel>Price in ETH: </StyledLabel>
        <StyledText>
          {ethExchangeRate * Number(amount)}
          <StyledCurrency> Eth</StyledCurrency> + Gas Fee
        </StyledText>
      </TextRow>
    </Container>
  )
}
