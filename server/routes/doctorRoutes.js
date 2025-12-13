const express = require('express');
const router = express.Router();
const { getDoctorAppointments, updateAppointmentStatus, prescribeMedication, updateAvailability } = require('../controllers/doctorController');
const { protect, doctor } = require('../middleware/authMiddleware');

router.route('/appointments').get(protect, doctor, getDoctorAppointments);
router.route('/appointments/:id').put(protect, doctor, updateAppointmentStatus);
router.route('/prescribe').post(protect, doctor, prescribeMedication);
router.route('/availability').put(protect, doctor, updateAvailability); // New Route

module.exports = router;

