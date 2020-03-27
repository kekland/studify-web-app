import React from 'react'
import '../auth-page/auth-page.css'
import { Center } from '../../components/center/center'
import { Surface } from '../../components/surface/surface'
import { AppLogo } from '../../components/app-logo/app-logo'
import { useHistory } from 'react-router-dom'

export const IntroPage: React.FC = () => {
  const history = useHistory()

  setTimeout(() => {
    history.replace('/auth')
  }, 2000)

  return (
    <div className='host'>
      <Center>
        <Surface style={{ borderRadius: '1000px', padding: '32px', width: '200px', height: '200px' }}>
          <Center>
            <AppLogo size='120px' />
          </Center>
        </Surface>
      </Center>
    </div>
  )
}
