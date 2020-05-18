const express = require('express');
const router = express.Router();
const passport = require('passport');
const doctorsController = require('../../../controllers/api/v1/doctors_controller_api');

router.post('/register', doctorsController.register);
router.post('/login', doctorsController.login);
router.get('/:id/all_patients', passport.authenticate('jwt', {session:false}), doctorsController.getAllPatients);
router.get('/:id',  passport.authenticate('jwt', {session:false}), doctorsController.getDoctorInfo);
router.get('/:id/all_stats', passport.authenticate('jwt', {session:false}), doctorsController.getStats);

module.exports = router;