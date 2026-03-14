import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import UserDashboard from './pages/UserDashboard';
import AgentDashboard from './pages/AgentDashboard';

export default function App() {
    const { user } = useAuth();

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path='/register' element={<Register/>}/>
                
                <Route 
                    path="/dashboard" 
                    element={
                        <ProtectedRoute allowedRole="user">
                            <UserDashboard />
                        </ProtectedRoute>
                    } 
                />
                <Route 
                    path="/agent/dashboard" 
                    element={
                        <ProtectedRoute allowedRole="agent">
                            <AgentDashboard />
                        </ProtectedRoute>
                    } 
                />
            </Routes>
        </BrowserRouter>
    );
}