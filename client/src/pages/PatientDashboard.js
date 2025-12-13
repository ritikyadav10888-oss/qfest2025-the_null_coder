import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import SymptomChecker from '../components/SymptomChecker';

const PatientDashboard = () => {
    const [appointments, setAppointments] = useState([]);
    const [medications, setMedications] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const { user } = useContext(AuthContext);
    const [msg, setMsg] = useState('');

    const fetchData = async () => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };
            const apptData = await axios.get('/api/patient/appointments', config);
            setAppointments(apptData.data);

            const docData = await axios.get('/api/patient/doctors', config);
            setDoctors(docData.data);
            if (docData.data.length > 0) setSelectedDoctor(docData.data[0]._id);

            const medData = await axios.get('/api/patient/medications', config);
            setMedications(medData.data);

        } catch (error) {
            console.error(error);
        }
    };


    useEffect(() => {
        if (user) {
            fetchData();
            const interval = setInterval(() => {
                fetchData();
            }, 10000);

            return () => clearInterval(interval);
        }
    }, [user]);

    const handleBook = async (e) => {
        e.preventDefault();
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };

            const dateTime = new Date(`${date}T${time}`);

            await axios.post('/api/patient/book', { doctorId: selectedDoctor, date: dateTime }, config);
            setMsg('Appointment Booked!');
            fetchData();
        } catch (error) {
            setMsg('Booking Failed');
        }
    };

    return (
        <div style={{ paddingBottom: '3rem' }}>
            <h2 style={{ marginBottom: '1.5rem', borderLeft: '4px solid var(--primary)', paddingLeft: '1rem' }}>Patient Dashboard</h2>
            {msg && <div style={{ marginBottom: '1rem', padding: '1rem', borderRadius: 'var(--radius-md)', backgroundColor: msg.includes('Failed') ? '#fee2e2' : '#dcfce7', color: msg.includes('Failed') ? '#b91c1c' : '#15803d' }}>{msg}</div>}

            <div className="dashboard-grid">
                {/* Reminders / Medications Section */}
                <div className="card" style={{ borderLeft: '5px solid #10b981' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                        <h3 style={{ margin: 0 }}>🔔 Medication Records</h3>
                        <button onClick={fetchData} className="btn btn-secondary" style={{ fontSize: '0.8rem', padding: '4px 8px' }}>Refresh</button>
                    </div>
                    {medications.length === 0 ? (
                        <p style={{ color: 'var(--text-secondary)' }}>No active prescriptions.</p>
                    ) : (
                        <ul className="medication-list" style={{ listStyle: 'none', padding: 0 }}>
                            {medications.map(med => (
                                <li key={med._id} style={{ marginBottom: '15px', paddingBottom: '15px', borderBottom: '1px solid #eee' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <strong style={{ fontSize: '1.1em', color: '#1f2937' }}>{med.name}</strong>
                                        <span style={{ fontSize: '0.9em', color: '#6b7280' }}>Dr. {med.doctor?.name}</span>
                                    </div>
                                    <div style={{ marginTop: '5px', color: '#4b5563' }}>
                                        <span style={{ background: '#e0e7ff', padding: '2px 6px', borderRadius: '4px', marginRight: '5px', color: '#3730a3', fontSize: '0.9em' }}>
                                            Dose: {med.dosage}
                                        </span>
                                        <span style={{ background: '#ecfdf5', padding: '2px 6px', borderRadius: '4px', color: '#065f46', fontSize: '0.9em' }}>
                                            Freq: {med.frequency}
                                        </span>
                                    </div>
                                    <div style={{ marginTop: '8px', fontSize: '0.85em', color: '#ef4444' }}>
                                        ⏰ Reminder: Don't forget your current dose!
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* Book Appointment Section */}
                <div className="card">
                    <h3 style={{ borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem', marginBottom: '1rem' }}>📅 Book Appointment</h3>
                    <form onSubmit={handleBook}>
                        <div className="form-group">
                            <label>Select Doctor</label>
                            <select
                                value={selectedDoctor}
                                onChange={(e) => setSelectedDoctor(e.target.value)}
                                required
                            >
                                <option value="">-- Choose a Doctor --</option>
                                {doctors.map(d => (
                                    <option key={d._id} value={d._id} disabled={!d.isAvailable}>
                                        {d.name} {d.specialization ? `(${d.specialization})` : ''} {d.isAvailable ? '✅' : '⛔'}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Date</label>
                            <input
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                min={new Date().toISOString().split('T')[0]}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Time</label>
                            <input
                                type="time"
                                value={time}
                                onChange={(e) => setTime(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Confirm Booking</button>
                    </form>
                </div>

                {/* History Section */}
                <div className="card">
                    <h3 style={{ borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem', marginBottom: '1rem' }}>🕒 My Appointments</h3>
                    {appointments.length === 0 ? (
                        <p style={{ color: 'var(--text-secondary)', fontStyle: 'italic' }}>No appointments found.</p>
                    ) : (
                        <ul style={{ listStyle: 'none', padding: 0, maxHeight: '400px', overflowY: 'auto' }}>
                            {appointments.map(a => (
                                <li key={a._id} style={{
                                    padding: '1rem',
                                    border: '1px solid var(--border)',
                                    borderRadius: 'var(--radius-md)',
                                    marginBottom: '0.75rem',
                                    backgroundColor: 'var(--background)'
                                }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                                        <div>
                                            <strong style={{ fontSize: '1.05rem' }}>Dr. {a.doctor?.name}</strong>
                                            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                                                {new Date(a.date).toLocaleDateString()} at {new Date(a.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </div>
                                        </div>
                                        <span className={`status-badge status-${a.status}`}>{a.status}</span>
                                    </div>

                                    {a.status === 'Pending' && (
                                        <div style={{ marginTop: '0.75rem', padding: '0.5rem', backgroundColor: '#fff7ed', borderRadius: '0.25rem', fontSize: '0.9rem', borderLeft: '3px solid #f97316' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <span>Queue Position:</span>
                                                <strong>{a.queuePosition}</strong>
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <span>Est. Wait Time:</span>
                                                <strong>{a.estimatedWaitTime} mins</strong>
                                            </div>
                                        </div>
                                    )}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* Symptom Checker Section */}
                <div className="card">
                    <h3 style={{ borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem', marginBottom: '1rem' }}>🤖 AI Symptom Checker</h3>
                    <SymptomChecker />
                </div>
            </div>
        </div>
    );
};

export default PatientDashboard;
