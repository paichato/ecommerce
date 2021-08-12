
import {Switch,Route} from 'react-router-dom'
import Header from './components/nav/Header';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Home from './pages/Home';
require('dotenv').config()

function App() {
  return (
    <>
      {/* <p>Ecommerce</p> */}
      <Header/>
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route exact path='/login' component={Login}/>
        <Route exact path='/register' component={Register}/>
      </Switch>
    </>
  );
}

export default App;
