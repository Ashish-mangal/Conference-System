const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.post('/login', adminController.login);
router.get('/registrations', adminController.getAllRegistrations);
router.get('/feedbacks', adminController.getAllFeedbacks);

module.exports = router;