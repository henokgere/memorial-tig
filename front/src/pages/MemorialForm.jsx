import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import DynamicInput from '../components/DynamicInput';
import { AuthContext } from '../context/AuthContext';
import api from '../utils/axios';

export default function MemorialForm() {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    fatherName: '',
    grandfatherName: '',
    image: null,
    birthDate: '',
    deathDate: '',
    causeOfDeath: '',
    placeOfBirth: '',
    placeOfDeath: '',
    burialLocation: '',
    familyMember: '',
    shortStory: '',
    memorialMessage: '',
    obituary: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!['admin', 'creator'].includes(currentUser?.role)) {
      setError('You are not authorized to create memorials');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const formDataToSend = new FormData();
      for (const key in formData) {
        if (formData[key] !== null && formData[key] !== '') {
          formDataToSend.append(key, formData[key]);
        }
      }

      await api.post('/memorials', formDataToSend,{
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      
      navigate("/admin/heroes");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!['admin', 'creator'].includes(currentUser?.role)) {
    return (
      <div className="max-w-5xl mx-auto p-6 text-center">
        <h2 className="text-2xl font-semibold mb-4">Unauthorized Access</h2>
        <p>You don't have permission to access this page.</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6 bg-gray-50">
      <h2 className="text-2xl font-semibold mb-4">Create Memorial</h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 border-l-4 border-red-500 text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Personal Information */}
        <div className="md:col-span-2 space-y-4">
          <h3 className="text-lg font-medium border-b pb-2">Personal Information</h3>
          <DynamicInput label="Full Name *" name="name" value={formData.name} onChange={handleChange} required />
          <DynamicInput label="Father's Name *" name="fatherName" value={formData.fatherName} onChange={handleChange} required />
          <DynamicInput label="Grandfather's Name" name="grandfatherName" value={formData.grandfatherName} onChange={handleChange} />
        </div>

        {/* Dates */}
        <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          <DynamicInput label="Birth Date *" name="birthDate" type="date" value={formData.birthDate} onChange={handleChange} required />
          <DynamicInput label="Death Date *" name="deathDate" type="date" value={formData.deathDate} onChange={handleChange} required />
        </div>

        {/* Image Upload */}
        <div className="md:col-span-2">
          <DynamicInput 
            label="Memorial Photo" 
            name="image" 
            type="file" 
            onChange={handleChange}
            accept="image/*"
            helperText="JPEG or PNG, max 5MB"
          />
        </div>

        {/* Location Information */}
        <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-6">
          <DynamicInput label="Place of Birth" name="placeOfBirth" value={formData.placeOfBirth} onChange={handleChange} />
          <DynamicInput label="Place of Death" name="placeOfDeath" value={formData.placeOfDeath} onChange={handleChange} />
          <DynamicInput label="Burial Location" name="burialLocation" value={formData.burialLocation} onChange={handleChange} />
        </div>

        {/* Other Information */}
        <DynamicInput label="Cause of Death" name="causeOfDeath" value={formData.causeOfDeath} onChange={handleChange} />
        <DynamicInput label="Family Member (Your Relation)" name="familyMember" value={formData.familyMember} onChange={handleChange} />

        {/* Stories */}
        <div className="md:col-span-2">
          <DynamicInput 
            label="Short Story" 
            name="shortStory" 
            type="textarea" 
            value={formData.shortStory} 
            onChange={handleChange} 
            rows={5}
          />
        </div>
        <div className="md:col-span-2">
          <DynamicInput 
            label="Memorial Message" 
            name="memorialMessage" 
            type="textarea" 
            value={formData.memorialMessage} 
            onChange={handleChange} 
            rows={5}
          />
        </div>
        <div className="md:col-span-2">
          <DynamicInput 
            label="Obituary" 
            name="obituary" 
            type="textarea" 
            value={formData.obituary} 
            onChange={handleChange} 
            rows={5}
          />
        </div>

        <div className="md:col-span-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-4 bg-[#383C00] text-white px-6 py-3 rounded hover:bg-[#2f3200] disabled:opacity-50"
          >
            {isSubmitting ? 'Creating...' : 'Create Memorial'}
          </button>
        </div>
      </form>
    </div>
  );
}