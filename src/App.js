import logo from './logo.svg';
import './App.css';
import Nav from './components/Nav';
import {Route, Routes} from 'react-router-dom'
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import IsPrivate from './components/IsPrivate';
import IsAnon from './components/IsAnon';
import Cart from './components/Cart'
import Instruments from './components/Instruments';

function App() {
  return (
    <div className="App">
      <Nav/>
      <Routes>
        <Route exact path='/' element={<Instruments/>}/>
        <Route path='/signup' element={<SignupPage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/instruments' element={<Instruments/>}/>
        <Route path='/cart' element={<IsPrivate><Cart/></IsPrivate>}/>
      </Routes>
    </div>
  );
}

export default App;
