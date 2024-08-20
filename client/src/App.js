import './App.css';
import { Routes,Route } from 'react-router-dom';
import Headers from './components/Headers';
import Home from './components/Home';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Error from './components/Error';

function App() {
  return (
   <>
   <Headers/>
   <Routes>
     <Route path='/' element={<Home />}/>
     <Route path='/login' element={<Login />}/>
     <Route path='/dashboard' element={<Dashboard />}/>
     <Route path='/error' element={<Error />}/>
   </Routes>
   </>
  );
}

export default App;
