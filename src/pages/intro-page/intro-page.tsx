import React, { useEffect } from 'react'
import '../auth-page/auth-page.css'
import { Center } from '../../components/center/center'
import { AppLogo } from '../../components/app-logo/app-logo'
import { useHistory } from 'react-router-dom'
import ReactLoader from 'react-loaders'
import { useAlert } from 'react-alert'
import { methods } from '../../api/methods/methods'

export const IntroPage: React.FC = () => {
  const alert = useAlert()
  const history = useHistory()


  useEffect(() => {
    methods.initialize(alert)
  }, [alert])

  useEffect(() => {
    const trySignIn = async () => {
      await methods.auth.signInWithToken()
      history.push('/main')
    }
    const token = methods.api.auth.getToken()

    console.log(token)
    if (token) trySignIn()
    else history.push('/auth')
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div style={{ width: '100%', height: '100%', backgroundColor: 'var(--color-canvas-dark)', position: 'relative' }}>
      <Center>
        <div style={{
          transform: 'scale(6)', position: 'absolute',
          zIndex: 0,
        }}>
          <ReactLoader type='ball-scale-multiple' active />
        </div>
        <div style={{
          position: 'absolute',
          zIndex: 2, width: '200px', height: '200px',
          backgroundColor: 'white', borderRadius: '100px',
        }}>
          <Center>
            <AppLogo size='120px' />
          </Center>
        </div>
      </Center>
    </div>
  )
}
