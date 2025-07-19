CREATE TABLE IF NOT EXISTS activities (
  id TEXT PRIMARY KEY,
  date TEXT,
  waktuMulai TEXT,
  waktuSelesai TEXT,
  durasi REAL,
  kegiatan TEXT,
  country TEXT,
  currency TEXT,
  biaya REAL,
  catatan TEXT,
  statusPembayaran INTEGER,
  actor TEXT
);