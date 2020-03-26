import React from 'react'
import './main-page.css';
import { AppBarMain } from '../../components/main-page/app-bar-main';

export const MainPage: React.FC = (props) => {
  return (
    <div className='host'>
      <div className='app-bar-main'>
        <AppBarMain />
      </div>
      <div className='app-bar-group'>

      </div>
      <div className='tab-panel'>

      </div>
      <div className='user-panel'>

      </div>
      <div className='message-panel'>

      </div>
      <div className='message-field-panel'>

      </div>
    </div>
  )
}