import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signup() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'player'
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post('http://localhost:8080/api/users/signup', formData);

            if (res.status === 201 || res.status === 200) {
                alert('Signup successful!');
                navigate('/login');
            }

        } catch (err) {
            console.error("Signup error:", err);
            alert(err.response?.data?.message || "Signup failed");
        }
    };

    return (
        <div className="flex flex-col items-center mt-16">
            <h2 className="text-2xl font-bold mb-4">Signup</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-80">
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    className="border p-2 rounded"
                    value={formData.name}
                    onChange={handleChange}
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="border p-2 rounded"
                    value={formData.email}
                    onChange={handleChange}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="border p-2 rounded"
                    value={formData.password}
                    onChange={handleChange}
                />
                <select
                    name="role"
                    className="border p-2 rounded"
                    value={formData.role}
                    onChange={handleChange}
                >
                    <option value="player">Player</option>
                    <option value="referee">Referee</option>
                    <option value="admin">Admin</option>
                </select>

                <button type="submit" className="bg-green-600 text-white py-2 rounded">
                    Signup
                </button>
            </form>
        </div>
    );
}

export default Signup;
