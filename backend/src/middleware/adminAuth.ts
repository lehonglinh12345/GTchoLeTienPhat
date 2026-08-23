import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AdminRequest extends Request {
  admin?: any;
}

export const adminAuth = (req: AdminRequest, res: Response, next: NextFunction) => {
  const authHeader = req.header('Authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Không có quyền truy cập.' });
  }

  const token = authHeader.replace('Bearer ', '');

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret') as any;
    
    if (decoded.role !== 'admin') {
      return res.status(403).json({ message: 'Bạn không phải là admin.' });
    }

    req.admin = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token không hợp lệ hoặc đã hết hạn.' });
  }
};
