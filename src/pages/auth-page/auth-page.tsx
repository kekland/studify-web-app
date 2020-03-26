import React, { useState } from 'react'
import './auth-page.css'
import { AppLogoHorizontal } from '../../components/app-logo/app-logo'
import { FlatButton } from '../../components/button/button'
import { Center } from '../../components/center/center'
import { SignInForm } from '../../components/sign-in-form/sign-in-form'
import { SignUpForm } from '../../components/sign-up-form/sign-up-form'

export const AuthPage: React.FC = (props) => {
  const [isSignInShown, setIsSignInShown] = useState(false)

  return (
    <div className='host'>
      <div className='surface' style={{ position: 'relative' }}>
        <div style={{ position: 'absolute' }}>
          <AppLogoHorizontal />
        </div>
        <Center>
          {
            isSignInShown ?
              <SignInForm onSubmit={(data) => console.log(data)} /> :
              <SignUpForm onSubmit={(data) => console.log(data)}
                onBackTap={() => setIsSignInShown(true)} />
          }
        </Center>
        <div style={{ position: 'absolute', bottom: '24px', left: '24px', right: '24px' }}>
          <FlatButton width='100%' height='48px'
            label={isSignInShown ? 'Create an account' : 'Already have an account?'}
            onTap={() => setIsSignInShown(!isSignInShown)} />
        </div>
      </div>
      <div className='decoration'>
      </div>
    </div>
  )
}