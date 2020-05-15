const express = require('express');
const router = express.Router();
const doctorsController = require('../../../controllers/api/v1/doctors_controller_api');

router.post('/register', doctorsController.register);
router.post('/login', doctorsController.login);
router.get('/:id/all_patients', doctorsController.getAllPatients);
router.get('/:id', doctorsController.getDoctorInfo);

module.exports = router;