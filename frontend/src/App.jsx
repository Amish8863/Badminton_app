import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import PrivateRoute from './components/PrivateRoute';
import NotFound from './pages/NotFound';
// import Home from './pages/Home';
import PlayerLayout from './layouts/PlayerLayout';
import Dashboard from './pages/player/Dashboard';

import RefereeLayout from './layouts/RefereeLayout';

import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import RefereeDashboard from './pages/referee/Dashboard';

function App() {

  const { user } = useSelector((state) => state.auth);

  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        <Route path='/' element={ <Navigate to={ user ? `/${user?.role}/dashboard` : '/login' } /> } />

        <Route element={<PrivateRoute />}>
          <Route path='/player' element={<PlayerLayout />} >
            {/* <Route index element={<PlayerHome />} /> */}
            <Route path='dashboard' element={<Dashboard />} />
          </Route>
        </Route>

        <Route path='/*' element={<NotFound />} />

        <Route element={<PrivateRoute />}>
          <Route path='/referee' element={<RefereeLayout />} >
            <Route path='dashboard' element={<RefereeDashboard />} />
          </Route>
        </Route>

      </Routes>
      
    </Router>
  );
}

//  <Route path="/referee" element={<RefereeLayout />}>
          {/* <Route index element={<RefereeDashboard />} /> */}
          {/* <Route path="matches" element={<RefereeMatchList />} /> */}
          {/* <Route path="create" element={<CreateMatch />} /> */}
          {/* <Route path="playground/:matchId" element={<Playground />} /> */}
          {/* <Route path="edit/:matchId" element={<EditMatch />} /> */}
        {/* </Route> */}

export default App;
