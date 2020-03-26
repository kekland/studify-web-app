import React from 'react'
import './auth-page.css'
import { AppLogoHorizontal } from '../../components/app-logo/app-logo'
import { Column } from '../../components/flex/flex'
import { StyledText } from '../../components/text/text'
import { SizedBox } from '../../components/sized-box/sized-box'
import { Alignment } from '../../components/alignment/alignment'
import { InputField } from '../../components/input-field/input-field'
import { faAt, faLock } from '@fortawesome/free-solid-svg-icons'
import { RaisedButton, FlatButton } from '../../components/button/button'
import { Center } from '../../components/center/center'
import { SignInForm } from '../../components/sign-in-form/sign-in-form'
import { SignUpForm } from '../../components/sign-up-form/sign-up-form'

export const AuthPage: React.FC = (props) => {
  return (
    <div className='host'>
      <div className='surface' style={{ position: 'relative' }}>
        <div style={{ position: 'absolute' }}>
          <AppLogoHorizontal />
        </div>
        <Center>
          <SignUpForm />
        </Center>
        <div style={{ position: 'absolute', bottom: '24px', left: '24px', right: '24px' }}>
          <FlatButton width='100%' height='48px' label='Already have an account?' onTap={() => { }} />
        </div>
      </div>
      <div className='decoration'>
      </div>
    </div>
  )
}