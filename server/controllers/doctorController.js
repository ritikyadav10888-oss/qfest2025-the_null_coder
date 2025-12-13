const Appointment = require('../models/Appointment');
const Medication = require('../models/Medication');
const User = require('../models/User'); // Need User to get patient phone
const sendSMS = require('../utils/smsService');



// @desc    Get doctor appointments
// @route   GET /api/doctor/appointments
// @access  Private/Doctor
// @desc    Get all appointments for logged-in doctor
// @route   GET /api/doctor/appointments
// @access  Private/Doctor
const getDoctorAppointments = async(req, res) => {
    try {
        const appointments = await Appointment.find({ doctor: req.user._id })
            .populate('patient', 'name')
            .sort({ date: 1 })
            .lean();

        res.json(appointments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Update appointment status
// @route   PUT /api/doctor/appointments/:id
// @access  Private/Doctor
const updateAppointmentStatus = async(req, res) => {
    try {
        const { status } = req.body;
        const validStatuses = ['pending', 'confirmed', 'completed', 'cancelled'];

        if (status && !validStatuses.includes(status)) {
            return res.status(400).json({ message: 'Invalid status value' });
        }

        const appointment = await Appointment.findById(req.params.id);

        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        // Ensure this doctor owns the appointment
        if (appointment.doctor.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        appointment.status = status || appointment.status;
        const updatedAppointment = await appointment.save();

        res.json(updatedAppointment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Prescribe medication
// @route   POST /api/doctor/prescribe
// @access  Private/Doctor
const prescribeMedication = async(req, res) => {
    const { patientId, name, dosage, frequency } = req.body;

    console.log('Prescribe Request:', { patientId, name, dosage, frequency, doctor: req.user._id });

    try {
        const medication = new Medication({
            doctor: req.user._id,
            patient: patientId,
            name,
            dosage,
            frequency
        });

        const createdMedication = await medication.save();
        console.log('Medication Saved:', createdMedication);

        // SMS Alert
        const patient = await User.findById(patientId);
        if (patient && patient.phoneNumber) {
            sendSMS(
                patient.phoneNumber,
                `Rx Alert: Dr. has prescribed ${name} (${dosage}). Freq: ${frequency}. Please take as directed.`
            );
        }

        res.status(201).json(createdMedication);
    } catch (error) {

        console.error('Prescribe Error:', error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};


// @desc    Update doctor availability
// @route   PUT /api/doctor/availability
// @access  Private/Doctor
const updateAvailability = async(req, res) => {
    try {
        const user = await User.findById(req.user._id);

        if (user) {
            user.isAvailable = req.body.isAvailable;
            const updatedUser = await user.save();
            res.json({
                _id: updatedUser._id,
                name: updatedUser.name,

                isAvailable: updatedUser.isAvailable
            });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('Update Availability Error:', error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

module.exports = { getDoctorAppointments, updateAppointmentStatus, prescribeMedication, updateAvailability };