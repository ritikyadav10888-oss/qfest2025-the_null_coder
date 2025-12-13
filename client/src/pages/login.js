import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [error, setError] = useState('');

    useEffect(() => {
        if (user) {
            if (user.role === 'admin') navigate('/admin');
            else if (user.role === 'doctor') navigate('/doctor');
            else navigate('/patient');
        }
    }, [user, navigate]);

    const handleSubmit = async(e) => {
        e.preventDefault();
        const result = await login(email, password);
        if (!result.success) {
            setError(result.error);
        } else {
            setError('');
        }
    };

    return ( <div style = {
            { display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' } } >
        <div className = "card"
        style = {
            { width: '100%', maxWidth: '400px' } } >
        <h2 style = {
            { textAlign: 'center', marginBottom: '1.5rem', color: 'var(--primary)', fontSize: '1.9rem' } } >
        Login </h2>

        {
            error && ( <div style = {
                    {
                        backgroundColor: '#fee2e2',
                        color: '#b91c1c',
                        padding: '0.75rem',
                        borderRadius: '0.5rem',
                        marginBottom: '1rem',
                        fontSize: '0.9rem'
                    }
                } > { error } </div>
            )
        }

        <form onSubmit = { handleSubmit } >
        <div className = "form-group" >
        <label htmlFor = "email" > Email Address </label> <input id = "email"
        type = "email"
        value = { email }
        onChange = {
            (e) => setEmail(e.target.value) }
        required placeholder = "Enter your email" />
        </div>

        <div className = "form-group" >
        <label htmlFor = "password" > Password </label> <input id = "password"
        type = "password"
        value = { password }
        onChange = {
            (e) => setPassword(e.target.value) }
        required placeholder = "Enter your password" />
        </div>

          <div style={{ marginTop: '0.75rem', textAlign: 'right' }}>
        <a
            href="/forgot-password"
            style={{ color: 'var(--primary)', fontSize: '0.85rem', textDecoration: 'none' }}>
            Forgot Password?
        </a>
        </div>

        <button type = "submit"
        className = "btn btn-primary"
        style = {
            { width: '100%', marginTop: '0.5rem' } } >
        Login </button> </form>


        <div style = {
            { marginTop: '1rem', textAlign: 'center', fontSize: '0.9rem', color: 'var(--text-secondary)' } } >
        Don’ t have an account ? { ' ' } 
        <a href = "/register"
        style = {
            { color: 'var(--primary)', textDecoration: 'none', fontWeight: '500' } } >
        Signup Now</a> 
        </div> 

        </div> 
        </div>
    );
};

export default Login;