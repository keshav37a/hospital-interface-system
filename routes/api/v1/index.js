const express = require('express');
const router = express.Router();
const patientsController = require('../../../controllers/api/v1/patients_controller_api');
const passport = require('passport');

router.use('/doctors', require('./doctors'));
router.use('/patients', require('./patients'));
router.get('/reports/:status', passport.authenticate('jwt', {session:false}),  patientsController.getReportsByStatus);

module.exports = router;