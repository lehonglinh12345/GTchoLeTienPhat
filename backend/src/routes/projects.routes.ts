import { Router } from 'express';
import pool from '../config/db';
import { adminAuth } from '../middleware/adminAuth';

const router = Router();

// Simple in-memory cache for projects
let projectsCache: any = null;
let lastCacheTime = 0;
const CACHE_TTL = 60 * 1000; // 1 minute

// Clear cache function
const clearCache = () => {
  projectsCache = null;
  lastCacheTime = 0;
};

// GET all projects
router.get('/', async (req, res) => {
  try {
    const now = Date.now();
    if (projectsCache && (now - lastCacheTime < CACHE_TTL)) {
      return res.json(projectsCache);
    }
    
    const [projects] = await pool.query('SELECT * FROM projects ORDER BY created_at DESC');
    
    projectsCache = projects;
    lastCacheTime = now;
    
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi lấy danh sách dự án' });
  }
});

// GET single project
router.get('/:id', async (req, res) => {
  try {
    const [projects]: any = await pool.query('SELECT * FROM projects WHERE id = ?', [req.params.id]);
    if (projects.length === 0) {
      return res.status(404).json({ message: 'Không tìm thấy dự án' });
    }
    res.json(projects[0]);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi lấy chi tiết dự án' });
  }
});

// POST new project (Admin only)
router.post('/', adminAuth, async (req, res) => {
  try {
    const { id, title, category, year, description, main_image, color, tags, episodes, gallery } = req.body;
    
    // Check if ID exists
    const [existing]: any = await pool.query('SELECT id FROM projects WHERE id = ?', [id]);
    if (existing.length > 0) {
      return res.status(400).json({ message: 'Mã dự án (ID) đã tồn tại, vui lòng chọn mã khác' });
    }

    await pool.query(`
      INSERT INTO projects (id, title, category, year, description, main_image, color, tags, episodes, gallery)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      id, title, category, year, description, main_image, color || 'bg-studio-red', 
      JSON.stringify(tags || []), 
      JSON.stringify(episodes || []), 
      JSON.stringify(gallery || [])
    ]);

    clearCache(); // Invalidate cache

    res.status(201).json({ message: 'Thêm dự án thành công' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Lỗi thêm dự án' });
  }
});

// PUT update project (Admin only)
router.put('/:id', adminAuth, async (req, res) => {
  try {
    const { title, category, year, description, main_image, color, tags, episodes, gallery } = req.body;
    
    await pool.query(`
      UPDATE projects 
      SET title = ?, category = ?, year = ?, description = ?, main_image = ?, color = ?, tags = ?, episodes = ?, gallery = ?
      WHERE id = ?
    `, [
      title, category, year, description, main_image, color, 
      JSON.stringify(tags || []), 
      JSON.stringify(episodes || []), 
      JSON.stringify(gallery || []),
      req.params.id
    ]);

    clearCache(); // Invalidate cache

    res.json({ message: 'Cập nhật dự án thành công' });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi cập nhật dự án' });
  }
});

// DELETE project (Admin only)
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    await pool.query('DELETE FROM projects WHERE id = ?', [req.params.id]);
    clearCache(); // Invalidate cache
    res.json({ message: 'Xóa dự án thành công' });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi xóa dự án' });
  }
});

export default router;
