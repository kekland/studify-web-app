import React from 'react'
import './app-bar-main.css';
import { AppLogoHorizontal } from '../app-logo/app-logo';

export const AppBarMain: React.FC = (props) => {
  return (
    <div className='app-bar-main'>
      <AppLogoHorizontal />
    </div>
  )
}