import db from '../config/db.js';

const Activity = {
  getAll: (callback) => {
    db.all("SELECT * FROM activities", [], callback);
  },

  getById: (id, callback) => {
    db.get("SELECT * FROM activities WHERE id = ?", [id], callback);
  },

  create: (activity, callback) => {
    const { id, date, waktuMulai, waktuSelesai, durasi, kegiatan, country, currency, biaya, catatan, statusPembayaran, actor } = activity;
    db.run(
      `INSERT INTO activities (id, date, waktuMulai, waktuSelesai, durasi, kegiatan, country, currency, biaya, catatan, statusPembayaran, actor) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
      [
        id,
        date,
        waktuMulai,
        waktuSelesai,
        durasi,
        kegiatan,
        country,
        currency,
        biaya,
        catatan,
        statusPembayaran ? 1 : 0,
        actor
      ],
      callback
    );
  },

  update: (id, activity, callback) => {
    const { date, waktuMulai, waktuSelesai, durasi, kegiatan, country, currency, biaya, catatan, statusPembayaran, actor } = activity;
    db.run(
      `UPDATE activities SET date = ?, waktuMulai = ?, waktuSelesai = ?, durasi = ?, kegiatan = ?, country = ?, currency = ?, biaya = ?, catatan = ?, statusPembayaran = ?, actor = ? WHERE id = ?`,
      [
        date,
        waktuMulai,
        waktuSelesai,
        durasi,
        kegiatan,
        country,
        currency,
        biaya,
        catatan,
        statusPembayaran ? 1 : 0,
        actor,
        id
      ],
      callback
    );
  },

  delete: (id, callback) => {
    db.run(`DELETE FROM activities WHERE id = ?`, id, callback);
  },
};

module.exports = Activity;
