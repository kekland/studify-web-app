import React from 'react'
import { AlertComponentPropsWithStyle } from 'react-alert'
import { Surface } from '../surface/surface'
import { StyledText } from '../text/text'
import { Column, Row } from '../flex/flex'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfo, IconDefinition, faCheckCircle, faInfoCircle, faExclamationCircle, faCross, faTimes } from '@fortawesome/free-solid-svg-icons'
import { SizedBox } from '../sized-box/sized-box'
import { IconButton } from '../button/button'

export const AlertTemplate: React.FC<AlertComponentPropsWithStyle> = (props) => {
  let type: 'success' | 'primary' | 'danger' = 'success'
  let text = 'Success'
  let icon: IconDefinition = faCheckCircle

  if (props.options.type === 'info') {
    icon = faInfoCircle
    text = 'Info'
    type = 'primary'
  }
  else if (props.options.type === 'error') {
    icon = faExclamationCircle
    text = 'Error'
    type = 'danger'
  }

  let iconColor = 'rgba(255, 255, 255, 0.65)'


  return (
    <Surface type={type} style={{ padding: '16px', margin: '0 12px 12px 12px' }}>
      <Row crossAxisAlignment='center'>
        <FontAwesomeIcon icon={icon} color={iconColor} size='lg' />
        <SizedBox width='12px' />
        <Column>
          <StyledText surface='dark' type='caption' customColor={iconColor}>
            {text}
          </StyledText>
          <StyledText surface='dark'>
            {props.message}
          </StyledText>
        </Column>
        <SizedBox width='6px' />
        <IconButton onTap={props.close} icon={faTimes} size='36px' surface='dark' />
      </Row>
    </Surface>
  )
}