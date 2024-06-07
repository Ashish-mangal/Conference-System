const db = require('../config/database');

exports.getAllConferences = (req, res) => {
  db.all('SELECT * FROM conferences', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ conferences: rows });
  });
};

exports.createConference = (req, res) => {
  const { title, description, date } = req.body;
  db.run('INSERT INTO conferences (title, description, date) VALUES (?, ?, ?)', [title, description, date], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ id: this.lastID });
  });
};

exports.registerForConference = (req, res) => {
  const { name, email, conferenceId } = req.body;
  db.run('INSERT INTO registrations (name, email, conference_id) VALUES (?, ?, ?)', [name, email, conferenceId], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ id: this.lastID });
  });
};

exports.submitFeedback = (req, res) => {
  const { userId, conferenceId, feedback } = req.body;
  db.run('INSERT INTO feedback (user_id, conference_id, feedback) VALUES (?, ?, ?)', [userId, conferenceId, feedback], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ id: this.lastID });
  });
};