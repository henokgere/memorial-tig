import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DynamicInput from '../components/DynamicInput';

export default function MemorialForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    fatherName: '',
    grandfatherName: '',
    birthDate: '',
    deathDate: '',
    placeOfBirth: '',
    placeOfDeath: '',
    causeOfDeath: '',
    burialLocation: '',
    familyMember: '',
    shortStory: '',
    memorialMessage: '',
    obituary: '',
    image: null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const formDataToSend = new FormData();
      for (const key in formData) {
        if (formData[key] !== null && formData[key] !== '') {
          formDataToSend.append(key, formData[key]);
        }
      }

      const token = localStorage.getItem('token');
      const response = await fetch('/api/memorials', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formDataToSend
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create memorial');
      }

      const data = await response.json();
      navigate(`/memorials/${data._id}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Create a Memorial</h2>
      
      {error && (
        <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
          <p>{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Personal Information */}
        <div className="md:col-span-3">
          <h3 className="text-lg font-medium text-gray-900 mb-4 border-b pb-2">Personal Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <DynamicInput 
              label="Full Name *" 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              required 
              placeholder="Enter full name"
            />
            <DynamicInput 
              label="Father's Name *" 
              name="fatherName" 
              value={formData.fatherName} 
              onChange={handleChange} 
              required 
              placeholder="Enter father's name"
            />
            <DynamicInput 
              label="Grandfather's Name" 
              name="grandfatherName" 
              value={formData.grandfatherName} 
              onChange={handleChange} 
              placeholder="Enter grandfather's name"
            />
          </div>
        </div>

        {/* Dates */}
        <div className="md:col-span-3">
          <h3 className="text-lg font-medium text-gray-900 mb-4 border-b pb-2">Dates</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <DynamicInput 
              label="Birth Date *" 
              name="birthDate" 
              type="date" 
              value={formData.birthDate} 
              onChange={handleChange} 
              required 
            />
            <DynamicInput 
              label="Death Date *" 
              name="deathDate" 
              type="date" 
              value={formData.deathDate} 
              onChange={handleChange} 
              required 
            />
          </div>
        </div>

        {/* Places */}
        <div className="md:col-span-3">
          <h3 className="text-lg font-medium text-gray-900 mb-4 border-b pb-2">Places</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <DynamicInput 
              label="Place of Birth" 
              name="placeOfBirth" 
              value={formData.placeOfBirth} 
              onChange={handleChange} 
              placeholder="City, Country"
            />
            <DynamicInput 
              label="Place of Death" 
              name="placeOfDeath" 
              value={formData.placeOfDeath} 
              onChange={handleChange} 
              placeholder="City, Country"
            />
            <DynamicInput 
              label="Burial Location" 
              name="burialLocation" 
              value={formData.burialLocation} 
              onChange={handleChange} 
              placeholder="Cemetery name and location"
            />
          </div>
        </div>

        {/* Death Details */}
        <div className="md:col-span-3">
          <h3 className="text-lg font-medium text-gray-900 mb-4 border-b pb-2">Death Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <DynamicInput 
              label="Cause of Death" 
              name="causeOfDeath" 
              value={formData.causeOfDeath} 
              onChange={handleChange} 
              placeholder="Optional"
            />
            <DynamicInput 
              label="Family Member (Your Relation)" 
              name="familyMember" 
              value={formData.familyMember} 
              onChange={handleChange} 
              placeholder="E.g., Father, Mother, etc."
            />
          </div>
        </div>

        {/* Photo Upload */}
        <div className="md:col-span-3">
          <h3 className="text-lg font-medium text-gray-900 mb-4 border-b pb-2">Memorial Photo</h3>
          <DynamicInput 
            label="Upload Photo" 
            name="image" 
            type="file" 
            onChange={handleChange}
            accept="image/*"
            helperText="JPEG or PNG, max 5MB"
          />
        </div>

        {/* Stories and Messages */}
        <div className="md:col-span-3">
          <h3 className="text-lg font-medium text-gray-900 mb-4 border-b pb-2">Memorial Content</h3>
          <div className="grid grid-cols-1 gap-6">
            <DynamicInput 
              label="Short Story (Max 2000 characters)" 
              name="shortStory" 
              type="textarea" 
              value={formData.shortStory} 
              onChange={handleChange} 
              maxLength={2000}
              rows={4}
            />
            <DynamicInput 
              label="Memorial Message (Max 1000 characters)" 
              name="memorialMessage" 
              type="textarea" 
              value={formData.memorialMessage} 
              onChange={handleChange} 
              maxLength={1000}
              rows={4}
            />
            <DynamicInput 
              label="Obituary (Max 1000 characters)" 
              name="obituary" 
              type="textarea" 
              value={formData.obituary} 
              onChange={handleChange} 
              maxLength={1000}
              rows={4}
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="md:col-span-3 flex justify-end mt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-[#383C00] text-white px-6 py-3 rounded-lg hover:bg-[#2f3200] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating Memorial...
              </span>
            ) : 'Create Memorial'}
          </button>
        </div>
      </form>
    </div>
  );
}