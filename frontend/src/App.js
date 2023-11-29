import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthForm from './AuthForm';
import Home from './Home';
import Criminals from './Criminals'
import Sentences from './Sentences'
import Officers from './Officers'
import Crimes from './Crimes'
import Charges from './Charges'
import ManageInformation from './ManageInformation'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<AuthForm />}/>
        <Route path='/cityjail/home' element={<Home />}/>
        <Route path='/cityjail/criminals' element={<Criminals />}/>
        <Route path='/cityjail/sentences' element={<Sentences />}/>
        <Route path='/cityjail/officers' element={<Officers />}/>
        <Route path='/cityjail/crimes' element={<Crimes />}/>
        <Route path='/cityjail/charges' element={<Charges />}/>

        <Route path='/cityjail/manage-info' element={<ManageInformation />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
