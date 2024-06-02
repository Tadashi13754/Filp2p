import { Routes, Route } from 'react-router-dom';
import Home from './page/Home';
import Dashboard from './page/Dashboard';
import NotFound from './page/NotFound';

function App() {

  return(
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/dashboard' element={localStorage.getItem('wallet')?<Dashboard />:<Home />} />
      <Route path='*' element={localStorage.getItem('wallet')?<NotFound />:<Home />} />
    </Routes>
  )
}

export default App
