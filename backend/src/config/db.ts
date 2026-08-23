import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'vangoc',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Helper function to initialize the database schema if tables don't exist
export const initDb = async () => {
  try {
    const connection = await pool.getConnection();

    // Create Projects table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS projects (
        id VARCHAR(255) PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        category VARCHAR(255),
        year VARCHAR(10),
        description TEXT,
        main_image VARCHAR(500),
        color VARCHAR(50) DEFAULT 'bg-studio-red',
        tags JSON,
        episodes JSON,
        gallery JSON,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Seed initial project if table is empty
    const [projectRows]: any = await connection.query('SELECT COUNT(*) as count FROM projects');
    if (projectRows[0].count === 0) {
      await connection.query(`
        INSERT INTO projects (id, title, category, year, description, main_image, color, tags, episodes, gallery)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `, [
        "project-1",
        "NHÀ CÓ GIỖ",
        "Phim Ngắn / 3D Branding",
        "2026",
        "NHÀ CÓ GIỖ – Phim hoạt hình 3D ngắn chính thức ra mắt! Sau khoảng thời gian thực hiện và hoàn thiện, chúng tôi rất vui khi được mang bộ phim đến với mọi người trên YouTube và FanPage chính thức. 💛 Một câu chuyện vừa hài hước, gần gũi nhưng cũng đầy cảm xúc về gia đình, đám giỗ và những yêu thương đôi khi chưa kịp nói thành lời.",
        "/images/input_file_1.png",
        "bg-studio-red",
        JSON.stringify(["3D Animation", "Creative Direction", "CGI", "Visual Storytelling"]),
        JSON.stringify([
          { id: "ep1", title: "Tập 1: Mâm cỗ ngày giỗ", duration: "10:24", videoUrl: "https://www.youtube.com/embed/TM142-7LiiQ?autoplay=1", thumbnail: "https://img.youtube.com/vi/TM142-7LiiQ/maxresdefault.jpg" },
          { id: "ep2", title: "Tập 2: (Sắp ra mắt)", isPlaceholder: true },
          { id: "ep3", title: "Tập 3: (Sắp ra mắt)", isPlaceholder: true }
        ]),
        JSON.stringify([])
      ]);
    }
    
    // Create Users table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255),
        name VARCHAR(255) NOT NULL,
        avatar VARCHAR(500),
        google_id VARCHAR(255) UNIQUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create Comments table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS comments (
        id INT AUTO_INCREMENT PRIMARY KEY,
        project_id VARCHAR(255) NOT NULL,
        user_id INT NOT NULL,
        content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `);

    // Alter Comments table safely (add columns if not exist via try-catch)
    try {
      await connection.query('ALTER TABLE comments ADD COLUMN parent_id INT DEFAULT NULL');
      await connection.query('ALTER TABLE comments ADD FOREIGN KEY (parent_id) REFERENCES comments(id) ON DELETE CASCADE');
    } catch (e) {
      // Ignore if already exists
    }

    try {
      await connection.query('ALTER TABLE comments ADD COLUMN is_edited BOOLEAN DEFAULT FALSE');
    } catch (e) {
      // Ignore if already exists
    }

    // Create Comment Reactions table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS comment_reactions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        comment_id INT NOT NULL,
        user_id INT NOT NULL,
        type ENUM('like', 'dislike') NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE KEY unique_reaction (comment_id, user_id),
        FOREIGN KEY (comment_id) REFERENCES comments(id) ON DELETE CASCADE,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `);

    console.log('Database initialized successfully.');
    connection.release();
  } catch (error) {
    console.error('Error initializing database:', error);
  }
};

export default pool;
