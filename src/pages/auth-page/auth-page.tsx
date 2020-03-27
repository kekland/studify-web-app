import React, { useState } from 'react'
import './auth-page.css'
import { AppLogoHorizontal } from '../../components/app-logo/app-logo'
import { FlatButton } from '../../components/button/button'
import { Center } from '../../components/center/center'
import { SignInForm, ISignInFormData } from '../../components/sign-in-form/sign-in-form'
import { SignUpForm, ISignUpFormData } from '../../components/sign-up-form/sign-up-form'
import { useAlert } from 'react-alert'
import { api } from '../../api/api'
import { setAuth } from '../../state/auth'
import { store } from '../../state/store'
import { useHistory } from 'react-router-dom'
import { setGroups } from '../../state/main'

export const AuthPage: React.FC = (props) => {
  const alert = useAlert()
  const history = useHistory()
  const [isSignInShown, setIsSignInShown] = useState(true)

  const signIn = async (data: ISignInFormData) => {
    api.use(alert, async () => {
      const result = await api.signIn(data)
      store.dispatch(setAuth(result))
      store.dispatch(setGroups(result.user.groups))
      history.replace('/main')
    })
  }

  const signUp = async (data: ISignUpFormData) => {
    api.use(alert, async () => {
      const result = await api.signUp(data)
      store.dispatch(setAuth(result))
      store.dispatch(setGroups(result.user.groups))
      history.replace('/main')
    })
  }

  return (
    <div className='host'>
      <div className='surface' style={{ position: 'relative' }}>
        <div style={{ position: 'absolute' }}>
          <AppLogoHorizontal />
        </div>
        <Center>
          {
            isSignInShown ?
              <SignInForm onSubmit={signIn} /> :
              <SignUpForm onSubmit={signUp}
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