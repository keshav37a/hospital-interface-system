const express = require('express');
const router = express.Router();
const doctors_controller = require('../../../controllers/api/v1/doctors_controller_api');

router.get('/:status', doctors_controller.getReportsByStatus);

module.exports = router;