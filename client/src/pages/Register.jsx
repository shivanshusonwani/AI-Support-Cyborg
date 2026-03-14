import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await api.post('/auth/register', formData);
            
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.error || "Registration failed");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center text-neutral-900 p-4">
            <form onSubmit={handleSubmit} className="border-violet-40 p-8 rounded-xl shadow-sm shadow-violet-400 max-w-sm">
                <h2 className="text-3xl font-bold mb-6 text-violet-600">Create Account</h2>
                
                {error && <p className="bg-red-50 text-red-500 p-3 rounded mb-4 text-sm">{error}</p>}

                <div className="space-y-4">
                    <input name="name" type="text" placeholder="Full Name" required 
                        className="w-full p-3 border border-violet-300 placeholder:text-neutral-500 rounded-lg outline-none" 
                        onChange={handleChange} />
                    
                    <input name="email" type="email" placeholder="Email Address" required 
                        className="w-full p-3 border border-violet-300 placeholder:text-neutral-500 rounded-lg outline-none" 
                        onChange={handleChange} />
                    
                    <input name="password" type="password" placeholder="Password" required 
                        className="w-full p-3 border border-violet-300 placeholder:text-neutral-500 rounded-lg outline-none" 
                        onChange={handleChange} />
                </div>

                <button type="submit" className="w-full bg-violet-600 text-white py-3 rounded-lg font-bold mt-6 hover:bg-violet-700">
                    Register
                </button>

                <p className="mt-4 text-center text-sm">
                    Already have an account? <Link to="/login" className="text-violet-600 font-bold">Login here</Link>
                </p>
            </form>
        </div>
    );
}

export default Register;