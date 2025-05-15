import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export default function ListPage() {
  const tableRef = useRef();
  const navigate = useNavigate();

  // Sample data
  const sampleData = [
    {
      id: '100345832132',
      fullName: 'Birhane kahsay',
      highlight: 'The war was merciless. Weeks turned into months, and',
      protein: 'When the war broke out, everything changed.',
      fat: 'When the war broke out, everything changed.',
      createdAt: '12-04-2024',
      image: 'https://via.placeholder.com/40'
    },
    {
      id: '100345832322',
      fullName: 'Yoneta testsy',
      highlight: 'The war was merciless. Weeks turned into months, and',
      protein: 'When the war broke out, everything changed.',
      fat: 'When the war broke out, everything changed.',
      createdAt: '12-04-2024',
      image: 'https://via.placeholder.com/40'
    }
    // Add more data as needed
  ];

  const exportPDF = () => {
    const doc = new jsPDF();
    autoTable(doc, {
      head: [['ID', 'Full name', 'Highlight', 'Protein', 'Fat', 'Created At']],
      body: sampleData.map(d => [
        d.id, d.fullName, d.highlight, d.protein, d.fat, d.createdAt
      ])
    });
    doc.save('memorial-list.pdf');
  };

  const exportCSV = () => {
    const headers = ['ID', 'Full name', 'Highlight', 'Protein', 'Fat', 'Created At'];
    const rows = sampleData.map(row => [
      row.id,
      row.fullName,
      row.highlight,
      row.protein,
      row.fat,
      row.createdAt
    ]);

    const csvContent = headers.join(',') + '\n' + rows.map(r =>
      r.map(field => `"${String(field).replace(/"/g, '""')}"`).join(',')
    ).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'memorial-list.csv';
    link.click();
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="space-x-2">
          <button onClick={exportPDF} className="px-3 py-1 bg-gray-800 text-white rounded">PDF</button>
          <button onClick={exportCSV} className="px-3 py-1 bg-blue-600 text-white rounded">CSV</button>
        </div>
        <button onClick={() => navigate('/form')} className="px-4 py-2 bg-black text-white rounded-full">Add new</button>
      </div>

      <div className="overflow-x-auto">
        <table ref={tableRef} className="min-w-full border text-sm bg-white rounded shadow">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2">Image</th>
              <th className="p-2">ID</th>
              <th className="p-2">Full name</th>
              <th className="p-2">Highlight</th>
              <th className="p-2">Protein</th>
              <th className="p-2">Fat</th>
              <th className="p-2">Created at</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {sampleData.map((item, idx) => (
              <tr key={idx} className="border-t">
                <td className="p-2">
                  <img src={item.image} alt="thumb" className="w-10 h-10 rounded" />
                </td>
                <td className="p-2">{item.id}</td>
                <td className="p-2">{item.fullName}</td>
                <td className="p-2 truncate max-w-xs">{item.highlight}</td>
                <td className="p-2">{item.protein}</td>
                <td className="p-2">{item.fat}</td>
                <td className="p-2">{item.createdAt}</td>
                <td className="p-2 space-x-2">
                  <button className="text-blue-600 hover:underline">✏️</button>
                  <button className="text-red-600 hover:underline">🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
