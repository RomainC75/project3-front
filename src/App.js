import logo from './logo.svg';
import './App.css';
import Nav from './components/Nav';
import {Route, Routes} from 'react-router-dom'
function App() {
  return (
    <div className="App">
      <p>VOILA</p>
      <Routes>
        <Route path="/test" element={<Nav/>}/>

      </Routes>
    </div>
  );
}

export default App;
