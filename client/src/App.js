
import {Switch,Route} from 'react-router-dom'
import Header from './components/nav/Header';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Home from './pages/Home';
import {toast, ToastContainer} from 'react-toastify';
import RegisterComplete from './pages/auth/RegisterComplete';
import 'react-toastify/dist/ReactToastify.css';
require('dotenv').config()


function App() {
  return (
    <>
      {/* <p>Ecommerce</p> */}
      <Header/>
      <ToastContainer/>
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route exact path='/login' component={Login}/>
        <Route exact path='/register' component={Register}/>
        <Route exact path='/register/complete' component={RegisterComplete}/>
      </Switch>
    </>
  );
}

export default App;
