import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { login } from '../redux/slices/authSlice';

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        // next step: axios call and redux dispatch

        try {
            const res = await axios.post('http://localhost:8080/api/users/login', { email, password });

            if (res.status === 200) {
                alert('Login successful!');
                // Dispatch login action to Redux store
                dispatch(login({ user: res.data.user, accessToken: res.data.accessToken }));
                // Redirect to home or dashboard
                navigate('/home');
            }
            else {
                alert('Login failed');
                navigate('/');
            }
        } catch (error) {
            console.error("Login error:", error);
            alert(error.response?.data?.message || "Login failed");

        }
    };

    return (
        <div className="flex flex-col items-center mt-20">
            <h2 className="text-2xl font-bold mb-4">Login</h2>
            <form onSubmit={handleLogin} className="flex flex-col gap-4 w-80">
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border p-2 rounded"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border p-2 rounded"
                />
                <button type="submit" className="bg-blue-600 text-white py-2 rounded">
                    Login
                </button>
            </form>
        </div>
    );
}

export default Login;
