const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || 'YOUR_TELEGRAM_BOT_TOKEN';
const JWT_SECRET = process.env.JWT_SECRET || 'supersecretjwtkey';
const PORT = process.env.PORT || 4000;

const app = express();
app.use(cors());
app.use(bodyParser.json());

// SQLite setup
const db = new sqlite3.Database('./users.db');
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    telegram_id TEXT UNIQUE,
    first_name TEXT,
    last_name TEXT,
    username TEXT,
    photo_url TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);
});

// Helper: Verify Telegram login signature
function checkTelegramAuth(data) {
  const { hash, ...fields } = data;
  const secret = crypto.createHash('sha256').update(TELEGRAM_BOT_TOKEN).digest();
  const sorted = Object.keys(fields).sort().map(key => `${key}=${fields[key]}`).join('\n');
  const hmac = crypto.createHmac('sha256', secret).update(sorted).digest('hex');
  return hmac === hash;
}

// Auth endpoint
app.post('/auth/telegram', (req, res) => {
  const data = req.body;
  if (!checkTelegramAuth(data)) {
    return res.status(401).json({ error: 'Invalid Telegram auth' });
  }
  const telegram_id = data.id.toString();
  db.get('SELECT * FROM users WHERE telegram_id = ?', [telegram_id], (err, user) => {
    if (err) return res.status(500).json({ error: 'DB error' });
    if (user) {
      // User exists, issue JWT
      const token = jwt.sign({ telegram_id }, JWT_SECRET, { expiresIn: '30d' });
      return res.json({ token, user });
    } else {
      // Create user
      db.run(
        'INSERT INTO users (telegram_id, first_name, last_name, username, photo_url) VALUES (?, ?, ?, ?, ?)',
        [telegram_id, data.first_name, data.last_name, data.username, data.photo_url],
        function (err) {
          if (err) return res.status(500).json({ error: 'DB error' });
          const user = {
            id: this.lastID,
            telegram_id,
            first_name: data.first_name,
            last_name: data.last_name,
            username: data.username,
            photo_url: data.photo_url,
          };
          const token = jwt.sign({ telegram_id }, JWT_SECRET, { expiresIn: '30d' });
          return res.json({ token, user });
        }
      );
    }
  });
});

app.listen(PORT, () => {
  console.log(`Backend listening on port ${PORT}`);
}); 