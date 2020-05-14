const express = require('express');
const router = express.Router();
const patientsController = require('../../../controllers/api/v1/patients_controller_api');
const passport = require('passport');

//auhtenticating some requests before executing them

// router.post('/register', passport.authenticate('jwt', {session: false}),  patientsController.register);
// router.post('/:id/create_report',passport.authenticate('jwt', {session: false}), patientsController.createReport);
// router.get('/:id/all_reports', passport.authenticate('jwt', {session: false}),  patientsController.allReports);

router.post('/:id/register', patientsController.register);
router.post('/:id/create_report', patientsController.createReport);
router.get('/:id/all_reports', patientsController.allReports);
module.exports = router;