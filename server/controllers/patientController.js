const Appointment = require('../models/Appointment');
const Medication = require('../models/Medication');
const User = require('../models/User');
const sendSMS = require('../utils/smsService');



// @desc    Book appointment
// @route   POST /api/patient/book
// @access  Private/Patient
const bookAppointment = async (req, res) => {
    const { doctorId, date } = req.body;

    try {
        const appointment = new Appointment({
            patient: req.user._id,
            doctor: doctorId,
            date
        });

        const createdAppointment = await appointment.save();

        // SMS Alert
        const doctor = await User.findById(doctorId);
        if (req.user.phoneNumber) {
            sendSMS(
                req.user.phoneNumber,
                `Booking Confirmed! You have an appointment with Dr. ${doctor.name} on ${new Date(date).toLocaleDateString()}.`
            );
        }

        res.status(201).json(createdAppointment);
    } catch (error) {

        res.status(400).json({ message: 'Invalid data' });
    }
};

// @desc    Get my appointments
// @route   GET /api/patient/appointments
// @access  Private/Patient
const getMyAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find({ patient: req.user._id })
            .populate('doctor', 'name')
            .sort({ date: 1 }); // Sort by date

        // Calculate Queue Position & Wait Time for Pending Appointments
        const appointmentsWithQueue = await Promise.all(appointments.map(async (appt) => {
            let apptObj = appt.toObject();

            if (appt.status === 'Pending') {
                const countAhead = await Appointment.countDocuments({
                    doctor: appt.doctor._id,
                    date: appt.date,
                    status: 'Pending',
                    createdAt: { $lt: appt.createdAt }
                });

                apptObj.queuePosition = countAhead + 1;
                apptObj.estimatedWaitTime = (countAhead + 1) * 15; // 15 mins per patient
            }

            return apptObj;
        }));

        res.json(appointmentsWithQueue);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Get my medications (Reminders)
// @route   GET /api/patient/medications
// @access  Private/Patient
const getMedications = async (req, res) => {
    try {
        const medications = await Medication.find({ patient: req.user._id }).populate('doctor', 'name');
        res.json(medications);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Get all doctors
// @route   GET /api/patient/doctors
// @access  Private/Patient
const getDoctors = async (req, res) => {
    try {
        const doctors = await User.find({ role: 'doctor' }).select('name specialization isAvailable');
        res.json(doctors);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = { bookAppointment, getMyAppointments, getMedications, getDoctors };

