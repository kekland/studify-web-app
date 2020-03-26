import React from 'react'
import { Column } from '../flex/flex'
import { SizedBox } from '../sized-box/sized-box'
import { StyledText } from '../text/text'
import { InputField } from '../input-field/input-field'
import { faAt, faLock } from '@fortawesome/free-solid-svg-icons'
import { RaisedButton } from '../button/button'

export const SignInForm: React.FC = (props) => {
  return (
    <Column crossAxisSize='max'>
      <StyledText type='heading'>Sign in</StyledText>
      <SizedBox height='24px' />
      <InputField placeholder="Email" icon={faAt} type='email' removeBorderBottom />
      <InputField placeholder="Password" icon={faLock} type='password' removeBorderTop />
      <SizedBox height='24px' />
      <RaisedButton width='100%' label='Sign in' onTap={() => { }} />
    </Column>
  )
}