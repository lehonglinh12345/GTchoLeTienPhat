import { Request, Response } from 'express';
import pool from '../config/db';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-key-12345';

export const register = async (req: Request, res: Response): Promise<any> => {
  try {
    const { email, password, name } = req.body;
    
    if (!email || !password || !name) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const [existing] = await pool.query('SELECT * FROM users WHERE email = ?', [email]) as any;
    if (existing.length > 0) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const [result] = await pool.query(
      'INSERT INTO users (email, password, name) VALUES (?, ?, ?)',
      [email, password, name]
    ) as any;

    const token = jwt.sign({ id: result.insertId, email, name }, JWT_SECRET, { expiresIn: '7d' });
    
    res.status(201).json({ 
      token, 
      user: { id: result.insertId, email, name, avatar: null } 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const login = async (req: Request, res: Response): Promise<any> => {
  try {
    const { email, password } = req.body;

    const [users] = await pool.query('SELECT * FROM users WHERE email = ?', [email]) as any;
    if (users.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const user = users[0];
    
    if (user.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id, email: user.email, name: user.name }, JWT_SECRET, { expiresIn: '7d' });
    
    res.json({ 
      token, 
      user: { id: user.id, email: user.email, name: user.name, avatar: user.avatar } 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const googleLogin = async (req: Request, res: Response): Promise<any> => {
  try {
    const { email, name, picture, sub: google_id } = req.body;

    if (!email || !google_id) {
      return res.status(400).json({ message: 'Invalid Google payload' });
    }

    const [users] = await pool.query('SELECT * FROM users WHERE email = ?', [email]) as any;
    
    let user;
    if (users.length > 0) {
      user = users[0];
      await pool.query(
        'UPDATE users SET google_id = ?, avatar = ? WHERE id = ?',
        [google_id, picture, user.id]
      );
      user.avatar = picture;
    } else {
      const [result] = await pool.query(
        'INSERT INTO users (email, name, avatar, google_id) VALUES (?, ?, ?, ?)',
        [email, name, picture, google_id]
      ) as any;
      
      user = {
        id: result.insertId,
        email,
        name,
        avatar: picture
      };
    }

    const token = jwt.sign({ id: user.id, email: user.email, name: user.name }, JWT_SECRET, { expiresIn: '7d' });
    
    res.json({ token, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
