import React from 'react'
import Image from 'next/image'
import { styled } from '@mui/material/styles'

const Container = styled('div')`
  display: flex;
  flex-direction: row;
  gap: 8px;
`
const StyledText = styled('span')`
  display: block;
  font-family: 'Roboto', sans-serif;
  font-size: 24px;
  color: #1976d2;
`
const Flex = styled(Container)`
  gap: 4px;
`

export const EthExchange: React.FC<{ exchangeRate: number }> = ({
  exchangeRate,
}) => {
  return (
    <Container>
      <StyledText>1€</StyledText> <StyledText>=</StyledText>
      <Flex>
        <StyledText>{exchangeRate}</StyledText>
        <Image src="/eth.png" width="24px" height="24px" alt="eth" />
      </Flex>
    </Container>
  )
}
