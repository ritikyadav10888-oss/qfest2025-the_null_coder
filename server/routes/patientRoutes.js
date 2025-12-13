const express = require('express');
const router = express.Router();
const { bookAppointment, getMyAppointments, getMedications, getDoctors } = require('../controllers/patientController');
const { protect, patient } = require('../middleware/authMiddleware');

router.post('/book', protect, patient, bookAppointment);
router.get('/appointments', protect, patient, getMyAppointments);
router.get('/medications', protect, patient, getMedications);
router.get('/doctors', protect, patient, getDoctors);


module.exports = router;
