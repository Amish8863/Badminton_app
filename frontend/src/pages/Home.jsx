import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';

function Home() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
    };

  return (
    <div className="flex flex-col items-center mt-20">
      <h1 className="text-3xl font-bold mb-4">🏸 Badminton Match Tracker</h1>

      {user ? (
        <div className="text-center space-y-3">
          <p className="text-xl">Welcome back, <span className="font-semibold">{user.name}</span>!</p>
          <p className="text-gray-700">Your role: <span className="text-blue-600">{user.role}</span></p>
          
          <div className="mt-6 space-x-4">
            <a href="/matches" className="bg-green-600 text-white px-4 py-2 rounded">View Matches</a>
            <a href="/stats" className="bg-blue-600 text-white px-4 py-2 rounded">View Stats</a>
            <a href="/leaderboard" className="bg-purple-600 text-white px-4 py-2 rounded">Leaderboard</a>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
            Logout
            </button>
        </div>
      ) : (
        <p className="text-red-500">You are not logged in.</p>
      )}
    </div>
  );
}

export default Home;
