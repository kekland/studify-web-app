import React, { useState, useEffect } from 'react'
import './auth-page.css'
import { AppLogoHorizontal } from '../../components/app-logo/app-logo'
import { FlatButton } from '../../components/button/button'
import { Center } from '../../components/center/center'
import { SignInForm, ISignInFormData } from '../../components/sign-in-form/sign-in-form'
import { SignUpForm, ISignUpFormData } from '../../components/sign-up-form/sign-up-form'
import { useAlert } from 'react-alert'
import { RootState } from '../../state/store'
import { Redirect } from 'react-router-dom'
import { Loader } from '../../components/loader/loader'
import { useScreenSize } from '../../hooks/hooks'
import { useSelector } from 'react-redux'
import { methods } from '../../api/methods/methods'
import { Flexible, Column } from '../../components/flex/flex'
import Scrollbars from 'react-custom-scrollbars'
import { SizedBox } from '../../components/sized-box/sized-box'

export const AuthPage: React.FC = (props) => {
  const alert = useAlert()
  const isMobile = useScreenSize(500)
  const [isLoading, setLoading] = useState(false)
  const [isSignInShown, setIsSignInShown] = useState(true)
  const auth = useSelector((state: RootState) => state.auth)

  useEffect(() => {
    methods.initialize(alert)
    methods.api.auth.clearToken()
  }, [alert])

  if (auth.user)
    return <Redirect to='/main' />

  const signIn = async (data: ISignInFormData) => {
    setLoading(true)
    await methods.auth.signIn(data)
    setLoading(false)
  }

  const signUp = async (data: ISignUpFormData) => {
    setLoading(true)
    await methods.auth.signUp(data)
    setLoading(false)
  }

  return (
    <div className='host'>
      <Loader isLoading={isLoading}>
        <div className={`surface surface-${isMobile ? 'mobile' : 'desktop'}`}>
          <Column mainAxisSize='max'>
            <AppLogoHorizontal />
            <SizedBox flexSize='24px' />
            <Flexible />
            {isSignInShown ?
              <SignInForm onSubmit={signIn} /> :
              <SignUpForm onSubmit={signUp}
                onBackTap={() => setIsSignInShown(true)} />
            }
            <Flexible />
            <SizedBox flexSize='24px' />
            <FlatButton width='100%' height='48px'
              label={isSignInShown ? 'Create an account' : 'Already have an account?'}
              onTap={() => setIsSignInShown(!isSignInShown)} />
          </Column>
        </div>
        <div className='decoration'>
        </div>
      </Loader>
    </div >
  )
}