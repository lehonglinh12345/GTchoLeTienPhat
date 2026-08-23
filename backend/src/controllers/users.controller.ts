import { Request, Response } from 'express';
import pool from '../config/db';

export const uploadAvatar = async (req: Request, res: Response): Promise<any> => {
  try {
    const { userId } = req.body;
    
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    // Construct the public URL for the avatar
    const avatarUrl = `http://localhost:5000/uploads/${req.file.filename}`;

    // Update database
    await pool.query(
      'UPDATE users SET avatar = ? WHERE id = ?',
      [avatarUrl, userId]
    );

    res.json({ avatar: avatarUrl, message: 'Avatar updated successfully' });
  } catch (error) {
    console.error('Error uploading avatar:', error);
    res.status(500).json({ message: 'Server error during avatar upload' });
  }
};
