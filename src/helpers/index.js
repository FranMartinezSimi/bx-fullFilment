import Papa from 'papaparse';

export default function getExportFileBlob(data) {
  const transform = JSON.stringify(data);
  const csvString = Papa.unparse(transform);
  const blob = new Blob([csvString]);
  const file = document.createElement('a');
  file.href = URL.createObjectURL(blob, { type: 'text/csv;charset=utf-8;' });
  file.download = 'file.csv';
  document.body.appendChild(file);
  file.click();
  document.body.removeChild(file);
}