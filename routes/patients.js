// /routes/patients.js
const express = require('express');
const router = express.Router();
const PatientController = require('../controllers/PatientController');

router.get('/', PatientController.getAllPatients);
router.post('/', PatientController.createPatient);
router.get('/:id', PatientController.getPatient);
router.put('/:id', PatientController.updatePatient);
router.delete('/:id', PatientController.deletePatient);

module.exports = router;