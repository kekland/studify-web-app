import React from 'react'
import { Column, Row } from '../flex/flex'
import { SizedBox } from '../sized-box/sized-box'
import { StyledText } from '../text/text'
import { InputField } from '../input-field/input-field'
import { faAt, faLock, faArrowLeft, faAngleLeft, faGrin, faSmile, faUser, faLockOpen } from '@fortawesome/free-solid-svg-icons'
import { RaisedButton, IconButton } from '../button/button'

export const SignUpForm: React.FC = (props) => {
  return (
    <Column crossAxisSize='max'>
      <Row crossAxisAlignment='center'>
        <IconButton size='36px' icon={faAngleLeft} iconSize='lg' onTap={() => { }} />
        <SizedBox width='8px' />
        <StyledText type='heading'>Sign up</StyledText>
      </Row>
      <SizedBox height='24px' />
      <InputField placeholder="Username" icon={faUser} type='text' />
      <SizedBox height='12px' />
      <InputField placeholder="Name" icon={faSmile} type='text' />
      <SizedBox height='12px' />
      <InputField placeholder="Email" icon={faAt} type='email' />
      <SizedBox height='12px' />
      <InputField placeholder="Password" icon={faLock} type='password' removeBorderBottom />
      <InputField placeholder="Repeat your password" type='password' removeBorderTop iconInset />
      <SizedBox height='24px' />
      <RaisedButton width='100%' label='Register' type='primary' onTap={() => { }} />
    </Column>
  )
}