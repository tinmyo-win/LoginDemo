
import './App.css';

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import Login from './Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </Router>
  );
}

function Home() {
  return(
    <h1>Welcome User</h1>
  )
}

export default App;
