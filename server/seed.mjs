import XLSX from 'xlsx';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const excelSerialToDate = (serial) => {
  const excelEpoch = new Date(Date.UTC(1899, 11, 30)); // Excel starts at 1900-01-01, but uses 1899-12-30
  const millisecondsPerDay = 24 * 60 * 60 * 1000;
  const date = new Date(excelEpoch.getTime() + serial * millisecondsPerDay);
  return date;
};

function parseRupiah(rupiahStr) {
  // Remove non-digit characters except comma and dot if you want to support decimals
  console.log(rupiahStr)
  const cleaned = rupiahStr.replace(/[^0-9.,]/g, '').replace(/,/g, '');
  return parseFloat(cleaned);
}

function extractDateAndTimeFromExcelSerial(serial) {
  const excelEpoch = new Date(Date.UTC(1899, 11, 30)); // Excel epoch = 1899-12-30
  const millisecondsPerDay = 24 * 60 * 60 * 1000;
  const date = new Date(excelEpoch.getTime() + serial * millisecondsPerDay);

  // Format helper
  const pad = (n) => n.toString().padStart(2, '0');

  // Extract
  const formattedDate = `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
  const formattedTime = `${pad(date.getHours())}:${pad(date.getMinutes())}`;

  return { date: formattedDate, time: formattedTime };
}

async function seedDatabase() {
  const dbPath = path.join(__dirname, 'travel.db');
  console.log(`Attempting to open database at: ${dbPath}`); // Added logging
  const db = await open({
    filename: dbPath,
    driver: sqlite3.Database
  });

  // Initialize database with schema
  const schemaPath = path.join(__dirname, 'schema.sql');
  const schema = fs.readFileSync(schemaPath, 'utf8');
  await db.exec(schema);
  console.log('Database initialized with schema.');

  // Load Excel data
  const excelFilePath = path.join(__dirname, 'data.xlsx');
  const workbook = XLSX.readFile(excelFilePath);
  const sheet = workbook.Sheets['Sheet1'];
  const json = XLSX.utils.sheet_to_json(sheet, { defval: '' });

  const data = json.slice(0);

  const dats = data.map(row => {
    const { date: startDate, time: startTime } = extractDateAndTimeFromExcelSerial(row['Dari Jam']);
    const { date: endDate, time: endTime } = extractDateAndTimeFromExcelSerial(row['Sampai Jam']);

    let durasi = 0;
    if (typeof row['Waktu'] === 'number') {
      durasi = row['Waktu'];
    } else if (typeof row['Waktu'] === 'string' && row['Waktu'].trim() !== '') {
      durasi = parseFloat(row['Waktu']);
      if (isNaN(durasi)) {
        durasi = 0;
      }
    }

    return {
      id: uuidv4(),
      date: startDate,
      waktuMulai: startTime,
      waktuSelesai: endTime,
      durasi: durasi,
      kegiatan: row['Kegiatan'],
      country: 'Indonesia',
      currency: 'IDR',
      biaya: parseFloat(row['Real Budget'] ? row['Real Budget'] : row['Estimasi Biaya']) || 0,
      catatan: row['Keterangan'] || '',
      statusPembayaran: 0,
      actor: ''
    };
  });

  // Insert data into activities table
  for (const row of dats) {

    // console.log(row)
    const kegiatan = row.kegiatan.replace(/'/g, "''");
    const catatan = row.catatan.replace(/'/g, "''");
    const actor = row.actor === '' ? null : row.actor;

    try {
      await db.run(
        `INSERT INTO activities (id, date, waktuMulai, waktuSelesai, durasi, kegiatan, country, currency, biaya, catatan, statusPembayaran, actor) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
        [
          row.id,
          row.date,
          row.waktuMulai,
          row.waktuSelesai,
          row.durasi,
          kegiatan,
          row.country,
          row.currency,
          row.biaya,
          catatan,
          row.statusPembayaran,
          actor
        ]
      );
      console.log(`Inserted activity: ${row.kegiatan}`);
    } catch (error) {
      console.error(`Error inserting activity ${row.kegiatan}:`, error);
    }
  }

  await db.close();
  console.log('All data seeded and database closed.');
}

seedDatabase().catch(console.error);
