import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
    const { user } = useAuth();

    if (user) return <Navigate to={user.role === 'agent' ? "/agent/dashboard" : "/dashboard"} />;

    return (
        <div className="min-h-screen text-neutral-900 flex items-center">
            <main className="max-w-7xl mx-auto text-center p-6">
                               
                <h1 className="text-5xl md:text-7xl font-extrabold mb-6">
                    Meet the <span className="text-violet-500">Support Cyborg</span>
                </h1>
                
                <p className="text-xl text-neutral-600 max-w-2xl mx-auto mb-10 leading-relaxed">
                    The intelligence of Gemini AI combined with the empathy of human agents. 
                    Get instant answers, and seamless handoffs when things get complex.
                </p>

                <div className="flex gap-4 justify-center">
                    <Link to="/register" className="flex items-center justify-center bg-violet-500 text-white px-6 py-3 rounded-2xl font-bold text-lg active:scale-95">
                        Get Started 
                    </Link>
                    <Link to="/login" className="flex items-center justify-center border-2 border-violet-500 text-violet-600 px-6 py-3 rounded-2xl font-bold text-lg active:scale-95">
                        Sign In
                    </Link>
                </div>

            </main>
        </div>
    );
}

export default Home;