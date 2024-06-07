const express = require('express');
const router = express.Router();
const conferenceController = require('../controllers/conferenceController');

router.get('/', conferenceController.getAllConferences);
router.post('/', conferenceController.createConference);
router.post('/register', conferenceController.registerForConference);
router.post('/feedback', conferenceController.submitFeedback); // Ensure this line is present


module.exports = router;


