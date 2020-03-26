import React from 'react';
import './design/theme.css'
import './design/index.css'
import './design/design.css'
import { MainPage } from './pages/main-page/main-page'
import { AuthPage } from './pages/auth-page/auth-page';
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import { AlertTemplate } from './components/alert/alert';

function App() {
  return (
    <AlertProvider
      template={AlertTemplate}
      position='bottom right'
      timeout={3500}
      transition='scale'
      containerStyle={{ pointerEvents: 'auto', zIndex: 0 }}>
      <div className='root root-dark'>
        <AuthPage />
      </div>
    </AlertProvider>
  );
}

export default App;
