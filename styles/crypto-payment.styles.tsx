import { styled } from '@mui/material/styles'
import Image from 'next/image'
import { Modal, LinearProgress, Button, Box } from '@mui/material'

export const StyledWrapper = styled('div')`
  width: 100vw;
  height: 100vh;
  position: relative;
`
export const StyledBackground = styled(Image)`
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
`
export const StyledBox = styled('div')`
  width: 600px;
  height: 800px;
  background-color: white;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  border-radius: 15px;
  box-shadow: 0 0 1em black;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px;
`
export const StyledModal = styled(Modal)`
  left: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
  width: 600px;
  height: 260px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px;
  background-color: white;
  border-radius: 20px;
`
export const StyledModalText = styled('h1')`
  margin-top: 24px;
  text-align: center;
  font-size: 16px;
  color: #1976d2;
  font-family: 'Roboto', sans-serif;
`
export const StyledHash = styled(StyledModalText)`
  font-size: 14px;
  color: black;
  font-weight: 700;
`
export const StyledErrorText = styled(StyledModalText)`
  color: red;
`
export const StyledSuccessText = styled(StyledModalText)`
  color: green;
`
export const StyledLinearProgress = styled(LinearProgress)`
  margin-top: 24px;
  align-self: center;
  display: flex;
  flex-direction: row;
  justify-content: center;
`
export const StyledImage = styled(Image)`
  width: 300px;
  height: auto;
`
export const StyledButton = styled(Button)`
  margin-top: 32px;
  font-size: 16px;
  font-weight: 700;
  border-width: 2px;
`
export const StyledLoadingBox = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
`
