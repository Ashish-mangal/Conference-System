const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Define the path to the database file
const dbPath = path.resolve(__dirname, 'conference.db');

// Create the database file if it doesn't exist
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
});

db.serialize(() => {
  db.run('CREATE TABLE IF NOT EXISTS conferences (id INTEGER PRIMARY KEY, title TEXT, description TEXT, date TEXT)');
  db.run('CREATE TABLE IF NOT EXISTS registrations (id INTEGER PRIMARY KEY, name TEXT, email TEXT, conference_id INTEGER)');
  db.run('CREATE TABLE IF NOT EXISTS feedback (id INTEGER PRIMARY KEY, user_id INTEGER, conference_id INTEGER, feedback TEXT)');
  db.run('CREATE TABLE IF NOT EXISTS admins (id INTEGER PRIMARY KEY, username TEXT, password TEXT)');

  // Insert default admin if not exists
  db.get('SELECT * FROM admins WHERE username = ?', ['admin'], (err, row) => {
    if (!row) {
      db.run('INSERT INTO admins (username, password) VALUES (?, ?)', ['admin', 'password'], (err) => {
        if (err) {
          console.error('Error inserting default admin:', err.message);
        } else {
          console.log('Default admin inserted.');
        }
      });
    }
  });
});

module.exports = db;