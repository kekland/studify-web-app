import React from 'react';
import './design/theme.css'
import './design/index.css'
import './design/design.css'
import { MainPage } from './pages/main-page/main-page'
import { AuthPage } from './pages/auth-page/auth-page';

function App() {
  return (
    <div className='root body-light body'>
      <AuthPage />
    </div>
  );
}

export default App;
