import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../context/AuthContext';

const DoctorDashboard = () => {
    const [appointments, setAppointments] = useState([]);
    const { user } = useContext(AuthContext);

    // Prescription State
    const [showPrescribe, setShowPrescribe] = useState(null); // ID of appointment/patient
    const [medName, setMedName] = useState('');
    const [dosage, setDosage] = useState('');
    const [frequency, setFrequency] = useState('');

    const fetchAppointments = async () => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };
            const { data } = await axios.get('/api/doctor/appointments', config);
            setAppointments(data);
        } catch (error) {
            console.error(error);
        }
    };

    const [isAvailable, setIsAvailable] = useState(true);

    useEffect(() => {
        if (user) {
            fetchAppointments();
            // User context might need refresh, but for now lets assume user object has it or we fetch it
            // Actually, best to fetch current status on load
            axios.get('/api/auth/profile', { // Assuming there's a profile route or we can check user object
                headers: { Authorization: `Bearer ${user.token}` }
            }).then(res => setIsAvailable(res.data.isAvailable))
                .catch(err => console.log(err));
        }
    }, [user]);

    const toggleAvailability = async () => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };
            const { data } = await axios.put('/api/doctor/availability', { isAvailable: !isAvailable }, config);
            setIsAvailable(data.isAvailable);
            alert(`Status updated to: ${data.isAvailable ? 'Available' : 'Unavailable'}`);
        } catch (error) {
            console.error(error);
            const errMsg = error.response?.data?.message || error.message || 'Unknown Error';
            alert(`Failed to update status: ${errMsg}`);
        }
    };

    const markCompleted = async (id) => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };
            await axios.put(`/api/doctor/appointments/${id}`, { status: 'Completed' }, config);
            fetchAppointments();
        } catch (error) {
            console.error(error);
        }
    };

    const handlePrescribe = async (e, patientId) => {
        e.preventDefault();

        if (!patientId) {
            alert('Error: Patient ID is missing. Cannot prescribe.');
            return;
        }

        console.log('Sending prescription for Patient:', patientId);

        try {

            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };
            await axios.post('/api/doctor/prescribe', {
                patientId,
                name: medName,
                dosage,
                frequency
            }, config);

            alert('Prescription Sent!');
            setShowPrescribe(null);
            setMedName('');
            setDosage('');
            setFrequency('');
        } catch (error) {
            console.error('Prescription failed:', error);
            const errMsg = error.response?.data?.message || error.message || 'Unknown Error';
            alert(`Failed to prescribe: ${errMsg}`);
        }
    };


    return (
        <div>
            <h1>Doctor Dashboard</h1>
            <div style={{ marginBottom: '20px' }}>
                <button
                    onClick={toggleAvailability}
                    className={`btn ${isAvailable ? 'btn-success' : 'btn-danger'}`}
                    style={{ background: isAvailable ? '#10b981' : '#ef4444' }}
                >
                    Set Status: {isAvailable ? 'Available' : 'Unavailable'}
                </button>
            </div>
            <div className="card">
                <h3>Patient Queue & Prescriptions</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Patient Name</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {appointments.map((appt) => (
                            <tr key={appt._id}>
                                <td>{appt.patient?.name || 'Unknown'}</td>
                                <td>{new Date(appt.date).toLocaleDateString()}</td>
                                <td>
                                    <span className={`status-badge status-${appt.status}`}>
                                        {appt.status}
                                    </span>
                                </td>
                                <td>
                                    <div style={{ display: 'flex', gap: '10px' }}>
                                        {appt.status === 'Pending' && (
                                            <button
                                                className="btn btn-primary"
                                                onClick={() => markCompleted(appt._id)}
                                            >
                                                Complete
                                            </button>
                                        )}
                                        <button
                                            className="btn btn-secondary"
                                            onClick={() => setShowPrescribe(showPrescribe === appt.patient._id ? null : appt.patient._id)}
                                        >
                                            {showPrescribe === appt.patient._id ? 'Close' : 'Prescribe Meds'}
                                        </button>
                                    </div>

                                    {showPrescribe === appt.patient._id && (
                                        <div style={{ marginTop: '10px', padding: '10px', background: '#f3f4f6', borderRadius: '5px' }}>
                                            <form onSubmit={(e) => handlePrescribe(e, appt.patient._id)}>
                                                <input
                                                    type="text"
                                                    placeholder="Medicine Name"
                                                    value={medName}
                                                    onChange={(e) => setMedName(e.target.value)}
                                                    required
                                                    style={{ display: 'block', width: '100%', marginBottom: '5px', padding: '5px' }}
                                                />
                                                <input
                                                    type="text"
                                                    placeholder="Dosage (e.g. 500mg)"
                                                    value={dosage}
                                                    onChange={(e) => setDosage(e.target.value)}
                                                    required
                                                    style={{ display: 'block', width: '100%', marginBottom: '5px', padding: '5px' }}
                                                />
                                                <input
                                                    type="text"
                                                    placeholder="Frequency (e.g. 2x Daily)"
                                                    value={frequency}
                                                    onChange={(e) => setFrequency(e.target.value)}
                                                    required
                                                    style={{ display: 'block', width: '100%', marginBottom: '5px', padding: '5px' }}
                                                />
                                                <button type="submit" className="btn btn-primary" style={{ fontSize: '0.9em' }}>Send Rx</button>
                                            </form>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DoctorDashboard;
