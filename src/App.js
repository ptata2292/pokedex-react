import logo from './logo.svg';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Main from './Components/Main';
import './Components/style.css'
import { Formulario } from './Components/formulario';
import { useState } from 'react';

function App() {
  const [user, setUser] = useState([])

  return (
    <> 
    {
      user.length > 0 
        ?<Main setUser={setUser}/>
        :<Formulario setUser={setUser}/>
    } 
    </>
  );
}

export default App;
