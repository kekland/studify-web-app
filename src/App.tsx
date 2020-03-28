import React from 'react';
import './design/theme.css'
import './design/index.css'
import './design/design.css'
import { AuthPage } from './pages/auth-page/auth-page';
import { Provider as AlertProvider } from 'react-alert'
import { AlertTemplate } from './components/alert/alert';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { MainPage } from './pages/main-page/main-page';
import { IntroPage } from './pages/intro-page/intro-page';
import { AnimatedSwitch } from 'react-router-transition'
import { hot } from 'react-hot-loader/root'

const App = () => {
  return (
    <AlertProvider
      template={AlertTemplate}
      position='bottom right'
      timeout={3500}
      transition='scale'
      containerStyle={{ pointerEvents: 'auto', zIndex: 0 }}>
      <div id='app' className='root root-light'>
        <Router>
          <AnimatedSwitch
            atEnter={{ opacity: 0 }}
            atLeave={{ opacity: 0 }}
            atActive={{ opacity: 1 }}
            className="switch-wrapper">
            <Route path='/auth' component={AuthPage} />
            <Route path='/main' component={MainPage} />
            <Route path='/' component={IntroPage} />
          </AnimatedSwitch>
        </Router>
      </div>
    </AlertProvider>
  );
}

export const AppElement = App
export default hot(App);
