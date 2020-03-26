import React from 'react';
import './design/theme.css'
import './design/index.css'
import './design/design.css'
import { MainPage } from './pages/main-page/main-page'
import { AuthPage } from './pages/auth-page/auth-page';
import { transitions, positions, Provider as AlertProvider} from 'react-alert'

function App() {
  return (
    <AlertProvider template={AlertTemplate}>
      <div className='root body-dark body'>
        <AuthPage />
      </div>
    </AlertProvider>
  );
}

export default App;
