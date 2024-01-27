import React from 'react'
import { Route, Redirect ,useLocation} from 'react-router-dom';
import { HomePage } from './pages/HomePage.jsx';
import { Dash } from './pages/Dash.jsx';
import { Questions } from './pages/Questions.jsx';
import { IntakeForm } from './pages/IntakeForm.jsx';
import { Appointment } from './pages/Appointment.jsx';
import { Assessment } from './components/Assessment.jsx';
import { AnimatePresence } from 'framer-motion';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const location =useLocation();
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
    return (
      <Route location={location} key={location.pathname}
        {...rest}
        render={(props) =>
          userId && token? <Component {...props} /> : <Redirect to="/" />
        }
      />
    );
  };
const AnimatedRoutes = () => {
 
  return (
    <div>
    <AnimatePresence>
      <Route  path="/" component={HomePage} exact />
      <PrivateRoute path="/dash" component={Dash} />
      <PrivateRoute path="/personality-test" component={Questions} />
      <PrivateRoute path="/intake-form" component={IntakeForm} />
      <PrivateRoute path="/appointment" component={Appointment} />
      <PrivateRoute path="/assessment" component={Assessment} />
      </AnimatePresence>
    </div>
  )
}

export default AnimatedRoutes
