
import './App.css';
import Login from './login/Login';
import Homepage from './components/Homepage/Homepage';
import {Routes ,Route} from 'react-router-dom'
import CreatePin from './components/create_pin/CreatePin';
import { UserContextProvider } from './context/UserContext';

function App() {
  return (
          
              <Routes>
                <Route path='/' element={<Homepage />} />
                <Route path='/login' element={<Login />}/>
                <Route path='/create' element={<CreatePin />}/>
              </Routes>
          
  );
}

export default App;
