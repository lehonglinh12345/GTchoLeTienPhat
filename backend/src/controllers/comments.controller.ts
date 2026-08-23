import { Request, Response } from 'express';
import pool from '../config/db';

export const getComments = async (req: Request, res: Response): Promise<any> => {
  try {
    const { projectId } = req.params;
    const userId = req.query.userId;

    const [comments] = await pool.query(`
      SELECT 
        c.id, c.content, c.created_at, c.parent_id, c.is_edited, 
        u.id as user_id, u.name as user_name, u.avatar as user_avatar,
        (SELECT COUNT(*) FROM comment_reactions WHERE comment_id = c.id AND type = 'like') as likes_count,
        (SELECT COUNT(*) FROM comment_reactions WHERE comment_id = c.id AND type = 'dislike') as dislikes_count
        ${userId ? `, (SELECT type FROM comment_reactions WHERE comment_id = c.id AND user_id = ?) as user_reaction` : ''}
      FROM comments c
      JOIN users u ON c.user_id = u.id
      WHERE c.project_id = ?
      ORDER BY c.created_at ASC
    `, userId ? [userId, projectId] : [projectId]) as any;

    res.json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const createComment = async (req: Request, res: Response): Promise<any> => {
  try {
    const { projectId, userId, content, parentId } = req.body;

    if (!projectId || !userId || !content) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const [result] = await pool.query(
      'INSERT INTO comments (project_id, user_id, content, parent_id) VALUES (?, ?, ?, ?)',
      [projectId, userId, content, parentId || null]
    ) as any;

    const [newComment] = await pool.query(`
      SELECT 
        c.id, c.content, c.created_at, c.parent_id, c.is_edited, 
        u.id as user_id, u.name as user_name, u.avatar as user_avatar,
        0 as likes_count, 0 as dislikes_count, null as user_reaction
      FROM comments c
      JOIN users u ON c.user_id = u.id
      WHERE c.id = ?
    `, [result.insertId]) as any;

    res.status(201).json(newComment[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateComment = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    const { content, userId } = req.body;

    const [comment] = await pool.query('SELECT user_id FROM comments WHERE id = ?', [id]) as any;
    if (comment.length === 0) return res.status(404).json({ message: 'Not found' });
    if (comment[0].user_id !== userId) return res.status(403).json({ message: 'Forbidden' });

    await pool.query('UPDATE comments SET content = ?, is_edited = TRUE WHERE id = ?', [content, id]);
    res.json({ message: 'Updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteComment = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    const { userId } = req.body;

    const [comment] = await pool.query('SELECT user_id FROM comments WHERE id = ?', [id]) as any;
    if (comment.length === 0) return res.status(404).json({ message: 'Not found' });
    if (comment[0].user_id !== userId) return res.status(403).json({ message: 'Forbidden' });

    await pool.query('DELETE FROM comments WHERE id = ?', [id]);
    res.json({ message: 'Deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const reactToComment = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    const { userId, type } = req.body;

    if (!type) {
      await pool.query('DELETE FROM comment_reactions WHERE comment_id = ? AND user_id = ?', [id, userId]);
    } else {
      await pool.query(`
        INSERT INTO comment_reactions (comment_id, user_id, type)
        VALUES (?, ?, ?)
        ON DUPLICATE KEY UPDATE type = VALUES(type)
      `, [id, userId, type]);
    }

    res.json({ message: 'Reaction updated' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
