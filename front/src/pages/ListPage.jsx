import React, { useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { AuthContext } from '../context/AuthContext';

export default function ListPage() {
  const tableRef = useRef();
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

  // Sample data
  const sampleData = [
    {
      id: '100345832132',
      fullName: 'Birhane Kahsay',
      highlight: 'The war was merciless. Weeks turned into months...',
      shortStory: 'When the war broke out, everything changed...',
      memorialMessage: 'We remember your courage and sacrifice...',
      createdAt: '12-04-2024',
      image: 'https://via.placeholder.com/40'
    },
    // More data...
  ];

  // Only show Add New button for admin/creator roles
  const showAddButton = ['admin', 'creator'].includes(currentUser?.role);

  const exportPDF = () => {
    const doc = new jsPDF();
    autoTable(doc, {
      head: [['ID', 'Full Name', 'Highlight', 'Short Story', 'Created At']],
      body: sampleData.map(d => [
        d.id, 
        d.fullName, 
        d.highlight.substring(0, 50) + '...', 
        d.shortStory.substring(0, 50) + '...', 
        d.createdAt
      ])
    });
    doc.save('memorial-list.pdf');
  };

  const exportCSV = () => {
    const headers = ['ID', 'Full Name', 'Highlight', 'Short Story', 'Created At'];
    const rows = sampleData.map(row => [
      row.id,
      row.fullName,
      `"${row.highlight}"`,
      `"${row.shortStory}"`,
      row.createdAt
    ]);

    const csvContent = headers.join(',') + '\n' + rows.join('\n');
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
          <button onClick={exportPDF} className="px-3 py-1 bg-gray-800 text-white rounded hover:bg-gray-700 transition">
            Export PDF
          </button>
          <button onClick={exportCSV} className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
            Export CSV
          </button>
        </div>
        
        {showAddButton && (
          <button 
            onClick={() => navigate('/form')} 
            className="px-4 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition"
          >
            Add New Memorial
          </button>
        )}
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table ref={tableRef} className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Image</th>
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Full Name</th>
              <th className="p-3 text-left">Highlight</th>
              <th className="p-3 text-left">Created At</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {sampleData.map((item, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                <td className="p-3">
                  <img src={item.image} alt="Profile" className="w-10 h-10 rounded-full object-cover" />
                </td>
                <td className="p-3">{item.id}</td>
                <td className="p-3 font-medium">{item.fullName}</td>
                <td className="p-3 max-w-xs truncate">{item.highlight}</td>
                <td className="p-3">{item.createdAt}</td>
                <td className="p-3 space-x-2">
                  <button 
                    className="text-blue-600 hover:text-blue-800"
                    onClick={() => navigate(`/memorial/${item.id}`)}
                  >
                    View
                  </button>
                  {['admin', 'editor'].includes(currentUser?.role) && (
                    <>
                      <button className="text-yellow-600 hover:text-yellow-800">
                        Edit
                      </button>
                      <button className="text-red-600 hover:text-red-800">
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}