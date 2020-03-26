import React from 'react'
import { Row } from '../flex/flex'
import StudifyLogo from '../../studify-logo-transparent.svg'

export const AppLogoHorizontal: React.FC = (props) => {
  return (
    <Row crossAxisAlignment='center'>
      <img src={StudifyLogo} width={48} height={48} />
    
      <div style={{fontFamily: 'Righteous', fontSize: 24}}>STUDIFY</div>
    </Row>
  )
}