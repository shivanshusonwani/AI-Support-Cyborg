import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState('');

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const {email, password} = formData;
            const { data } = await api.post('/auth/login', { email, password });

            const user = {
                id: data.userId,
                name: data.name,
                role: data.role
            }

            login(user, data.token);
           
            if (user.role === 'agent') {
                navigate('/agent/dashboard');
            } else {
                navigate('/dashboard');
            }
        } catch (err) {
            setError(err.response?.data?.error || "Login failed");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center text-neutral-900 p-4">
            <form onSubmit={handleSubmit} className="border-violet-40 p-8 rounded-xl shadow-sm shadow-violet-400 max-w-sm">
                <h2 className="text-3xl font-bold mb-6 text-violet-600">CloudKeep Login</h2>

                {error && <p className="bg-red-50 text-red-500 p-3 rounded mb-4 text-sm">{error}</p>}

                <div className="space-y-4">
                    <input 
                        name='email'
                        type="email"
                        autoComplete='username' placeholder="Email" 
                        className="w-full p-3 border border-violet-300 rounded-lg outline-none"
                        onChange={handleChange} 
                    />
                    <input 
                        name='password'
                        type="password"
                        autoComplete='current-password' placeholder="Password" 
                        className="w-full p-3 border border-violet-300 rounded-lg outline-none"
                        onChange={handleChange} 
                    />
                </div>
                <button className="w-full bg-violet-600 text-white py-3 rounded-lg font-bold mt-6 hover:bg-violet-700">
                    Sign In
                </button>

                <p className="mt-4 text-center text-sm">
                    Don't have an account? <Link to="/register" className="text-violet-600 font-bold">Sign up for free</Link>
                </p>
                
            </form>
        </div>
    );
}

export default Login;