import React, { useState } from 'react';
import DynamicInput from '../components/DynamicInput';

export default function MemorialForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    fatherName: '',
    grandFatherName: '',
    photo: null,
    dob: '',
    dod: '',
    causeOfDeath: '',
    placeOfBirth: '',
    placeOfDeath: '',
    burialLocation: '',
    familyMember: '',
    shortStory: '',
    memorialMessage: '',
    obituary: ''
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-gray-50">
      <h2 className="text-2xl font-semibold mb-4">Memorial Form</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <DynamicInput label="First name" name="firstName" value={formData.firstName} onChange={handleChange} required />
        <DynamicInput label="Father's name" name="fatherName" value={formData.fatherName} onChange={handleChange} required />
        <DynamicInput label="Grand father's name" name="grandFatherName" value={formData.grandFatherName} onChange={handleChange} />

        <DynamicInput label="Photo" name="photo" type="file" onChange={handleChange} />
        <DynamicInput label="Date of birth" name="dob" type="date" value={formData.dob} onChange={handleChange} required />
        <DynamicInput label="Date of death" name="dod" type="date" value={formData.dod} onChange={handleChange} required />

        <DynamicInput label="Cause of death" name="causeOfDeath" value={formData.causeOfDeath} onChange={handleChange} />
        <DynamicInput label="Place of birth" name="placeOfBirth" value={formData.placeOfBirth} onChange={handleChange} />
        <DynamicInput label="Place of death" name="placeOfDeath" value={formData.placeOfDeath} onChange={handleChange} />
        <DynamicInput label="Burial location" name="burialLocation" value={formData.burialLocation} onChange={handleChange} />
        <DynamicInput label="Family member" name="familyMember" value={formData.familyMember} onChange={handleChange} />
        
        <div className="md:col-span-2">
          <DynamicInput label="Short story" name="shortStory" type="textarea" value={formData.shortStory} onChange={handleChange} />
        </div>

        <DynamicInput label="Memorial message" name="memorialMessage" type="textarea" value={formData.memorialMessage} onChange={handleChange} />
        <div className="md:col-span-2">
          <DynamicInput label="Obituary" name="obituary" type="textarea" value={formData.obituary} onChange={handleChange} />
        </div>

        <div className="md:col-span-3">
          <button
            type="submit"
            className="mt-4 bg-[#383C00] text-white px-6 py-2 rounded hover:bg-[#2f3200]"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
