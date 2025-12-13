const About = () => {
    return ( <
        div style = {
            { maxWidth: '800px', margin: '0 auto', padding: '2rem' } } >
        <
        div className = "card" >
        <
        h1 style = {
            { color: 'var(--primary)', marginBottom: '1rem' } } > About MediCare < /h1> <
        p style = {
            { fontSize: '1.1rem', marginBottom: '1.5rem', lineHeight: '1.8' } } >
        MediCare is a state - of - the - art healthcare management platform designed to bridge the gap between patients and doctors.Our mission is to make healthcare accessible, efficient, and user - friendly
        for everyone. <
        /p> <
        h3 style = {
            { borderBottom: '2px solid var(--border)', paddingBottom: '0.5rem', marginBottom: '1rem' } } > Key Features < /h3> <
        ul style = {
            { listStyleType: 'none', padding: 0 } } >
        <
        li style = {
            { marginBottom: '1rem', display: 'flex', alignItems: 'center' } } >
        <
        span style = {
            { color: 'var(--success)', marginRight: '10px', fontSize: '1.2rem' } } > ✔ < /span>
        Easy Appointment Booking <
        /li> <
        li style = {
            { marginBottom: '1rem', display: 'flex', alignItems: 'center' } } >
        <
        span style = {
            { color: 'var(--success)', marginRight: '10px', fontSize: '1.2rem' } } > ✔ < /span>
        Real - time Doctor Availability <
        /li> <
        li style = {
            { marginBottom: '1rem', display: 'flex', alignItems: 'center' } } >
        <
        span style = {
            { color: 'var(--success)', marginRight: '10px', fontSize: '1.2rem' } } > ✔ < /span>
        Rule - Based Symptom Checker <
        /li> <
        li style = {
            { marginBottom: '1rem', display: 'flex', alignItems: 'center' } } >
        <
        span style = {
            { color: 'var(--success)', marginRight: '10px', fontSize: '1.2rem' } } > ✔ < /span>
        Secure Digital Prescriptions <
        /li> <
        /ul> <
        /div> <
        /div>
    );
};

export default About;