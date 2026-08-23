import { Router } from 'express';
import jwt from 'jsonwebtoken';
import pool from '../config/db';
import { adminAuth } from '../middleware/adminAuth';

const router = Router();

// Admin Login
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === 'admin123') {
    const token = jwt.sign({ id: 0, role: 'admin', name: 'Admin' }, process.env.JWT_SECRET || 'fallback_secret', { expiresIn: '1d' });
    return res.json({ token, user: { id: 0, name: 'Admin', role: 'admin' } });
  }
  return res.status(401).json({ message: 'Sai tên đăng nhập hoặc mật khẩu.' });
});

// Get Stats
router.get('/stats', adminAuth, async (req, res) => {
  try {
    const [users] = await pool.query('SELECT COUNT(*) as count FROM users');
    const [comments] = await pool.query('SELECT COUNT(*) as count FROM comments');
    res.json({
      totalUsers: (users as any)[0].count,
      totalComments: (comments as any)[0].count
    });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server' });
  }
});

// Get Users
router.get('/users', adminAuth, async (req, res) => {
  try {
    const [users] = await pool.query('SELECT id, name, email, avatar, created_at FROM users ORDER BY created_at DESC');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi lấy danh sách users' });
  }
});

// Delete User
router.delete('/users/:id', adminAuth, async (req, res) => {
  try {
    await pool.query('DELETE FROM users WHERE id = ?', [req.params.id]);
    res.json({ message: 'Xóa user thành công' });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi xóa user' });
  }
});

// Get Comments
router.get('/comments', adminAuth, async (req, res) => {
  try {
    const query = `
      SELECT c.*, u.name as user_name, u.avatar as user_avatar 
      FROM comments c 
      JOIN users u ON c.user_id = u.id 
      ORDER BY c.created_at DESC
    `;
    const [comments] = await pool.query(query);
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi lấy danh sách comments' });
  }
});

// Delete Comment
router.delete('/comments/:id', adminAuth, async (req, res) => {
  try {
    await pool.query('DELETE FROM comments WHERE id = ?', [req.params.id]);
    res.json({ message: 'Xóa comment thành công' });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi xóa comment' });
  }
});

export default router;
