import React from 'react'
import { Row } from '../flex/flex'
import StudifyLogo from '../../studify-logo-default.svg'
import StudifyLogoTransparent from '../../studify-logo-transparent.svg'
import { StyledText } from '../text/text'
import { SizedBox } from '../sized-box/sized-box'

export interface IAppLogoProps {
  logoType?: 'default' | 'transparent';
  size?: string;
}

export interface IAppLogoHorizontalProps {
  surface?: 'light' | 'dark';
  fontSize?: string;
}

export const AppLogoHorizontal: React.FC<IAppLogoProps & IAppLogoHorizontalProps> = (props) => {
  return (
    <Row crossAxisAlignment='center'>
      <AppLogo logoType={props.logoType} size={props.size ?? '40px'} />
      <SizedBox width="16px" />
      <StyledText
        fontFamily='Righteous'
        fontSize={props.fontSize ?? '20px'}
        surface={props.surface}>STUDIFY</StyledText>
    </Row>
  )
}

export const AppLogo: React.FC<IAppLogoProps> = (props) => {
  return (
    <img src={props.logoType === 'transparent' ? StudifyLogoTransparent : StudifyLogo}
      height={props.size} alt='Studify logo' />
  )
}