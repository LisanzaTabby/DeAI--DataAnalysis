import express from 'express';
import cors from 'cors';
import authRoutes from './auth.js';// ✅ reference the new file

const app = express();

app.use(cors());
app.use(express.json());

// ✅ Mount API routes
app.use('/api', authRoutes);

app.listen(5000, () => {
  console.log('🚀 Server running on http://localhost:5000');
});
