const db = require('../config/database');

exports.login = (req, res) => {
  const { username, password } = req.body;
  db.get('SELECT * FROM admins WHERE username = ? AND password = ?', [username, password], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    res.json({ message: 'Login successful', adminId: row.id });
  });
};

exports.getAllRegistrations = (req, res) => {
  db.all(`SELECT registrations.*, conferences.title as conference_title
          FROM registrations 
          JOIN conferences ON registrations.conference_id = conferences.id`, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ registrations: rows });
  });
};

exports.getAllFeedbacks = (req, res) => {
  db.all(`SELECT feedback.*, conferences.title as conference_title
          FROM feedback 
          JOIN conferences ON feedback.conference_id = conferences.id`, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ feedbacks: rows });
  });
};