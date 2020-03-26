import React from 'react'
import { Row } from '../flex/flex'
import StudifyLogo from '../../studify-logo-transparent.svg'
import { StyledText } from '../text/text'
import { SizedBox } from '../sized-box/sized-box'

export const AppLogoHorizontal: React.FC = (props) => {
  return (
    <Row crossAxisAlignment='center'>
      <img src={StudifyLogo} width={40} height={40} />
      <SizedBox width="8px" />
      <StyledText
        fontFamily='Righteous'
        fontSize='20px'
        surface='dark'>STUDIFY</StyledText>
    </Row>
  )
}