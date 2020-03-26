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
      timeout={5000}
      offset='24px'
      transition='scale'
      containerStyle={{ pointerEvents: 'all' }}>
      <div className='root root-dark'>
        <AuthPage />
      </div>
    </AlertProvider>
  );
}

export default App;
