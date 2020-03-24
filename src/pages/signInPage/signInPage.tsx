import React from 'react'
import './signInPage.css'
import { Row } from '../../components/Row'

export const SignInPage: React.FC = (props, children) => {
  return (
    <div id='host'>
      <div id='body'>
        <div className='text-title text-muted'>Sign in</div>
        <div style={{ height: '12px' }} />
        <Row>
          <input className='input' placeholder='Email' style={{ borderRadius: '12px 12px 0 0' }} />
        </Row>
        <div className='divider' />
        <input className='input' placeholder='Password' style={{ borderRadius: '0 0 12px 12px' }} />
      </div>
    </div>
  )
}