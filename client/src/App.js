import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext, { AuthProvider } from './context/AuthContext';
import Login from './pages/login';
import Register from './pages/register';
import AdminDashboard from './pages/AdminDashboard';
import DoctorDashboard from './pages/DoctorDashboard';
import PatientDashboard from './pages/PatientDashboard';
import Navbar from './components/navbar';
import About from './pages/About';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import './App.css'; // Will use default App.css for now or vanilla styles

const PrivateRoute = ({ children, allowedRoles }) => {
    const { user, loading } = useContext(AuthContext);

    if (loading) return <div > Loading... < /div>;

    if (!user) {
        return <Navigate to = "/login" / > ;
    }

    if (allowedRoles && !allowedRoles.includes(user.role)) {
        return <Navigate to = "/" / > ; // Or unauthorized page
    }

    return children;
};

function App() {
    return ( <
        AuthProvider >
        <
        Router >
        <
        Navbar / >
        <
        div className = "container" >
        <
        Routes >
        <
        Route path = "/login"
        element = { < Login / > }
        /> <
        Route path = "/register"
        element = { < Register / > }
        /> <
        Route path = "/about"
        element = { < About / > }
        /> <
        Route path = "/contact"
        element = { < Contact / > }
        /> <
        Route path = "/privacy"
        element = { < Privacy / > }
        />

        <
        Route path = "/admin"
        element = { <
            PrivateRoute allowedRoles = {
                ['admin'] } >
            <
            AdminDashboard / >
            <
            /PrivateRoute>
        }
        /> <
        Route path = "/doctor"
        element = { <
            PrivateRoute allowedRoles = {
                ['doctor', 'admin'] } >
            <
            DoctorDashboard / >
            <
            /PrivateRoute>
        }
        /> <
        Route path = "/patient"
        element = { <
            PrivateRoute allowedRoles = {
                ['patient', 'admin'] } >
            <
            PatientDashboard / >
            <
            /PrivateRoute>
        }
        />

        <
        Route path = "/"
        element = { < Navigate to = "/login" / > }
        /> <
        /Routes> <
        /div> <
        /Router> <
        /AuthProvider>
    );
}

export default App;