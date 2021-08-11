
import {Switch,Route} from 'react-router-dom'
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Home from './pages/Home';

function App() {
  return (
    <div className="App">
      <p>Ecommerce</p>
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route exact path='/login' component={Login}/>
        <Route exact path='/register' component={Register}/>
      </Switch>
    </div>
  );
}

export default App;
