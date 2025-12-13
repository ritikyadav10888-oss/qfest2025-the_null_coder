import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                };
                const { data } = await axios.get('/api/admin/users', config);
                setUsers(data);
            } catch (error) {
                console.error(error);
            }
        };

        if (user) fetchUsers();
    }, [user]);

    const deleteUser = async (id) => {
        if (window.confirm('Are you sure?')) {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                };
                await axios.delete(`/api/admin/users/${id}`, config);
                setUsers(users.filter((u) => u._id !== id));
            } catch (error) {
                console.error(error);
            }
        }
    };

    return (
        <div style={{ paddingBottom: '3rem' }}>
            <h2 style={{ marginBottom: '1.5rem', borderLeft: '4px solid var(--primary)', paddingLeft: '1rem' }}>Admin Dashboard</h2>

            <div className="dashboard-grid">
                <div className="card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>
                        <h3 style={{ margin: 0 }}>Manage Users</h3>
                        <button className="btn btn-primary" onClick={() => navigate('/register')} style={{ fontSize: '0.9rem', padding: '0.4rem 0.8rem' }}>+ Create New User</button>
                    </div>

                    <div style={{ overflowX: 'auto' }}>
                        <table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Role</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map(u => (
                                    <tr key={u._id}>
                                        <td>{u.name}</td>
                                        <td>{u.email}</td>
                                        <td>
                                            <span style={{
                                                padding: '0.25rem 0.6rem',
                                                borderRadius: '9999px',
                                                fontSize: '0.8rem',
                                                fontWeight: '600',
                                                backgroundColor: u.role === 'doctor' ? '#e0f2fe' : u.role === 'admin' ? '#f3e8ff' : '#f1f5f9',
                                                color: u.role === 'doctor' ? '#0369a1' : u.role === 'admin' ? '#7e22ce' : '#475569',
                                                textTransform: 'capitalize'
                                            }}>
                                                {u.role}
                                            </span>
                                        </td>
                                        <td>
                                            <button
                                                onClick={() => deleteUser(u._id)}
                                                className="btn btn-danger"
                                                style={{ padding: '0.3rem 0.6rem', fontSize: '0.8rem' }}
                                                disabled={u.role === 'admin'}
                                                title="Delete User"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
