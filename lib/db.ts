import sqlite3 from 'sqlite3';

// ایجاد اتصال به دیتابیس
const db = new sqlite3.Database('./database.db', (err) => {
  if (err) {
    console.error('Failed to connect to the database:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
});

// تابع برای ایجاد جدول
const createTable = () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      persian_day INTEGER,
      persian_month INTEGER,
      persian_year INTEGER,
      gregorian_date TEXT,
      persian_month_name TEXT,
      gregorian_month_name TEXT,
      country TEXT,
      city TEXT,
      is_holiday BOOLEAN DEFAULT 0,
      post_category TEXT,
      tags TEXT,
      image_url TEXT,
      author TEXT,
      type TEXT,
      seo_description TEXT,
      promotion1_title TEXT,
      promotion1_description TEXT,
      promotion1_button_text TEXT,
      promotion1_link TEXT,
      promotion2_title TEXT,
      promotion2_description TEXT,
      promotion2_button_text TEXT,
      promotion2_link TEXT,
      content TEXT,
      images TEXT,
      video_url TEXT
    )
  `;
  db.run(sql, (err) => {
    if (err) {
      console.error('Error creating table:', err.message);
    } else {
      console.log('Table created successfully!');
    }
  });
};

// تابع برای اضافه کردن داده
const insertPost = (data: any) => {
  const sql = `
    INSERT INTO posts (title, description, persian_day, persian_month, persian_year, gregorian_date, persian_month_name, gregorian_month_name, country, city, is_holiday, post_category, tags, image_url, author, type, seo_description, promotion1_title, promotion1_description, promotion1_button_text, promotion1_link, promotion2_title, promotion2_description, promotion2_button_text, promotion2_link, content, images, video_url)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  
  db.run(sql, [
    data.title, data.description, data.persian_day, data.persian_month, data.persian_year, data.gregorian_date, 
    data.persian_month_name, data.gregorian_month_name, data.country, data.city, data.is_holiday, data.post_category, 
    data.tags, data.image_url, data.author, data.type, data.seo_description, 
    data.promotion1_title, data.promotion1_description, data.promotion1_button_text, data.promotion1_link, 
    data.promotion2_title, data.promotion2_description, data.promotion2_button_text, data.promotion2_link, 
    data.content, data.images, data.video_url
  ], function (err) {
    if (err) {
      console.error('Error inserting data:', err.message);
    } else {
      console.log(`Row inserted with ID ${this.lastID}`);
    }
  });
};

// ایجاد جدول در صورت عدم وجود آن
createTable();

// خروجی گرفتن توابع برای استفاده در پروژه
export { db, insertPost };