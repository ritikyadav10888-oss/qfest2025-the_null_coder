const Privacy = () => {
    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
            <div className="card">
                <h1 style={{ color: 'var(--primary)', marginBottom: '1.5rem' }}>Privacy Policy</h1>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Last Updated: December 2025</p>

                <section style={{ marginBottom: '2rem' }}>
                    <h3 style={{ marginBottom: '1rem', color: '#1e293b' }}>1. Introduction</h3>
                    <p>At MediCare, we take your privacy seriously. This policy explains how we collect, use, and protect your personal health information.</p>
                </section>

                <section style={{ marginBottom: '2rem' }}>
                    <h3 style={{ marginBottom: '1rem', color: '#1e293b' }}>2. Data Collection</h3>
                    <p>We collect information that you provide directly to us, including:</p>
                    <ul style={{ paddingLeft: '1.5rem', marginTop: '0.5rem' }}>
                        <li>Personal identification (Name, Email, Phone)</li>
                        <li>Health information (Consultation history, Prescriptions)</li>
                        <li>Appointment details</li>
                    </ul>
                </section>

                <section style={{ marginBottom: '2rem' }}>
                    <h3 style={{ marginBottom: '1rem', color: '#1e293b' }}>3. Data Security</h3>
                    <p>We implement industry-standard security measures to protect your data. All sensitive medical records are encrypted and access is strictly controlled based on user roles (Doctor/Patient/Admin).</p>
                </section>

                <section>
                    <h3 style={{ marginBottom: '1rem', color: '#1e293b' }}>4. Contact Us</h3>
                    <p>If you have questions about this policy, please contact us at <a href="mailto:privacy@medicare.com" style={{ color: 'var(--primary)' }}>privacy@medicare.com</a>.</p>
                </section>
            </div>
        </div>
    );
};

export default Privacy;
