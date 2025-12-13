import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return ( <nav className = "navbar"
        style = {
            { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 2rem' } } >
        <Link to = "/"
        className = "navbar-brand" > MediCare </Link> <ul className = "nav-links">

        {
            user ? ( <
                >
                <
                li > <span className = "nav-link" > Hello, { user.name }({ user.role }) < /span></li > { user.role === 'admin' && < li > < Link to = "/admin"
                    className = "nav-link" > Dashboard </Link></li > } { user.role === 'doctor' && < li > < Link to = "/doctor"
                    className = "nav-link" > Dashboard </Link></li > } { user.role === 'patient' && < li > < Link to = "/patient"
                    className = "nav-link" > Dashboard </Link></li > } <
                li > < button onClick = { handleLogout }
                className = "btn btn-secondary" > Logout </button></li >
                <
                />
            ) : ( <
                >
                <
                li > < Link to = "/login"
                className = "nav-link" > Login < /Link></li >
                <
                li > < Link to = "/register"
                className = "nav-link" > Register < /Link></li >
                <
                li > < Link to = "/about"
                className = "nav-link" > About < /Link></li >
                <
                li > < Link to = "/contact"
                className = "nav-link" > Contact < /Link></li >

                <
                />
            )
        } <
        /ul>

        <
        /nav>
    );
};

export default Navbar;