import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import authRoutes from './routes/auth.routes';
import commentRoutes from './routes/comments.routes';
import userRoutes from './routes/users.routes';
import adminRoutes from './routes/admin.routes';
import projectsRoutes from './routes/projects.routes';
import { initDb } from './config/db';
import compression from 'compression';
import helmet from 'helmet';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(helmet({
  crossOriginResourcePolicy: false, // Allow images to be loaded
  crossOriginOpenerPolicy: false // Allow Google OAuth popup
}));
app.use(compression());
app.use(express.json());

// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, '../../backend/uploads')));

// Initialize Database
initDb();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/projects', projectsRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Serve frontend in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../../frontend/dist')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../frontend/dist', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
