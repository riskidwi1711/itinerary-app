import XLSX from 'xlsx';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const excelFilePath = path.resolve(__dirname, 'dara.xlsx');

try {
  const workbook = XLSX.readFile(excelFilePath);
  const sheet = workbook.Sheets['Sheet1'];
  const json = XLSX.utils.sheet_to_json(sheet, { defval: '' });

  json.slice(0, 10).forEach(row => {
    console.log(row['Waktu']);
  });
} catch (error) {
  console.error('Error reading Excel file:', error);
}