import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Register = () => {
        const [name, setName] = useState('');
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        const [phoneNumber, setPhoneNumber] = useState('');
        const [role, setRole] = useState('patient');
        const [specialization, setSpecialization] = useState('');
        const { register } = useContext(AuthContext);
        const navigate = useNavigate();
        const [error, setError] = useState('');

        const handleSubmit = async(e) => {
            e.preventDefault();
            const result = await register(name, email, password, phoneNumber, role, specialization);
            if (result.success) {
                navigate('/');
            } else {
                setError(result.error);
            }
        };

<<<<<<< HEAD
        return ( <
            div style = {
                { display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', padding: '2rem 0' } } >
            <
            div className = "card"
            style = {
                { width: '100%', maxWidth: '500px' } } >
            <
            h2 style = {
                { textAlign: 'center', marginBottom: '1.5rem', color: 'var(--primary)' } } > Create Account < /h2> {
                error && < div style = {
                        { backgroundColor: '#fee2e2', color: '#b91c1c', padding: '0.75rem', borderRadius: '0.5rem', marginBottom: '1rem', fontSize: '0.9rem' } } > { error } < /div>} <
                    form onSubmit = { handleSubmit } >
                    <
                    div className = "form-group" >
                    <
                    label > Full Name < /label> <
                    input
                type = "text"
                value = { name }
                onChange = {
                    (e) => setName(e.target.value) }
                required
                placeholder = "enter your full name" /
                    >
                    <
                    /div> <
                    div className = "form-group" >
                    <
                    label > Email Address < /label> <
                    input
                type = "email"
                value = { email }
                onChange = {
                    (e) => setEmail(e.target.value) }
                required
                placeholder = "enter your email" /
                    >
                    <
                    /div> <
                    div className = "form-group" >
                    <
                    label > Password < /label> <
                    input
                type = "password"
                value = { password }
                onChange = {
                    (e) => setPassword(e.target.value) }
                required
                placeholder = "Create a strong password" /
                    >
                    <
                    /div> <
                    div className = "form-group" >
                    <
                    label > Mobile Number < /label> <
                    input
                type = "text"
                value = { phoneNumber }
                onChange = {
                    (e) => setPhoneNumber(e.target.value) }
                placeholder = "enter your mobile number"
                required
                    /
                    >
                    <
                    /div> <
                    div className = "form-group" >
                    <
                    label > I am a... < /label> <
                    select value = { role }
                onChange = {
                        (e) => setRole(e.target.value) } >
                    <
                    option value = "patient" > Patient(Looking
                        for care) < /option> <
                    option value = "doctor" > Doctor(Providing care) < /option> <
                    option value = "admin" > Admin < /option> <
                    /select> <
                    /div> {
                        role === 'doctor' && ( <
                            div className = "form-group" >
                            <
                            label > Specialization < /label> <
                            select value = { specialization }
                            onChange = {
                                (e) => setSpecialization(e.target.value) }
                            required >
                            <
                            option value = "" > Select Specialization < /option> <
                            option value = "General Physician" > General Physician < /option> <
                            option value = "Cardiologist" > Cardiologist(MBBS, MD) < /option> <
                            option value = "Dermatologist" > Dermatologist(MBBS, MD) < /option> <
                            option value = "Pediatrician" > Pediatrician(MBBS, MD) < /option> <
                            option value = "Orthopedic" > Orthopedic Surgeon(MBBS, MS) < /option> <
                            option value = "Neurologist" > Neurologist(MBBS, DM) < /option> <
                            /select> <
                            /div>
                        )
                    } <
                    button type = "submit"
                className = "btn btn-primary"
                style = {
                        { width: '100%', marginTop: '1rem' } } > Register < /button> <
                    /form> <
                    div style = {
                        { marginTop: '1rem', textAlign: 'center', fontSize: '0.9rem', color: 'var(--text-secondary)' } } >
                    Already have an account ? < a href = "/login"
                style = {
                        { color: 'var(--primary)', textDecoration: 'none', fontWeight: '500' } } > Login < /a> <
                    /div> <
                    /div> <
                    /div>
            );
        };
=======
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', padding: '2rem 0' }}>
            <div className="card" style={{ width: '100%', maxWidth: '500px' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '1.5rem', color: 'var(--primary)' }}>Create Account</h2>
                {error && <div style={{ backgroundColor: '#fee2e2', color: '#b91c1c', padding: '0.75rem', borderRadius: '0.5rem', marginBottom: '1rem', fontSize: '0.9rem' }}>{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Full Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            placeholder="Enter Your Name"
                        />
                    </div>
                    <div className="form-group">
                        <label>Email Address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="Enter your email"
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="Create a strong password"
                        />
                    </div>
                    <div className="form-group">
                        <label>Mobile Number</label>
                        <input
                            type="text"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            placeholder="Enter your number"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>I am a...</label>
                        <select value={role} onChange={(e) => setRole(e.target.value)}>
                            <option value="patient">Patient (Looking for care)</option>
                            <option value="doctor">Doctor (Providing care)</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                    {role === 'doctor' && (
                        <div className="form-group">
                            <label>Specialization</label>
                            <select
                                value={specialization}
                                onChange={(e) => setSpecialization(e.target.value)}
                                required
                            >
                                <option value="">Select Specialization</option>
                                <option value="General Physician">General Physician</option>
                                <option value="Cardiologist">Cardiologist (MBBS, MD)</option>
                                <option value="Dermatologist">Dermatologist (MBBS, MD)</option>
                                <option value="Pediatrician">Pediatrician (MBBS, MD)</option>
                                <option value="Orthopedic">Orthopedic Surgeon (MBBS, MS)</option>
                                <option value="Neurologist">Neurologist (MBBS, DM)</option>
                            </select>
                        </div>
                    )}
                    <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>Register</button>
                </form>
                <div style={{ marginTop: '1rem', textAlign: 'center', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                    Already have an account? <a href="/login" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: '500' }}>Login</a>
                </div>
            </div>
        </div>
    );
};
>>>>>>> 400f9abbd406ebe0ea6ecd9a1d0a4b699b35529b

        export default Register;