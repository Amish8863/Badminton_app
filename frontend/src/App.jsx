import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import PrivateRoute from './components/PrivateRoute';
import NotFound from './pages/NotFound';
// import Home from './pages/Home';
import PlayerLayout from './layouts/PlayerLayout';
import Dashboard from './pages/player/Dashboard';
// import PlayerHome from './components/player/Home';

import { useSelector } from 'react-redux';

function App() {

  const { user } = useSelector((state) => state.auth);

  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        <Route element={<PrivateRoute />}>
          <Route path='/player' element={<PlayerLayout />} >
            {/* <Route index element={<PlayerHome />} /> */}
            <Route path='dashboard' element={<Dashboard />} />
          </Route>
        </Route>

        <Route path='/*' element={<NotFound />} />


      </Routes>
    </Router>
  );
}

export default App;
