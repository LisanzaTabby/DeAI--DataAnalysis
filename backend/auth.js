import express from 'express';
import bcrypt from 'bcryptjs';
import { registerUser, findUserByEmail } from './users.js';

const router = express.Router();

// POST /signup
router.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await registerUser({ username, email, password: hashedPassword });
    res.json({ message: 'Signup successful!', ...result });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ✅ Updated POST /login
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  findUserByEmail(email, async (err, user) => {
    if (err) {
      return res.status(500).json({ error: 'Internal server error' });
    }

    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ error: 'Incorrect password' });
    }

    return res.json({
      message: 'Login successful',
      user: {
        id: user.id,
        username: user.username,
        email: user.email
      }
    });
  });
});


export default router;
