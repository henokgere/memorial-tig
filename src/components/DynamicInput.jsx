import React from 'react';

export default function DynamicInput({
  label,
  name,
  type = 'text',
  value,
  onChange,
  required = false,
  className = '',
}) {
  const inputClass = `w-full border p-2 rounded text-gray-400 bg-white focus:outline-none focus:ring-2 focus:ring-[#383C00] ${className}`;

  return (
    <div className="flex flex-col">
      <label htmlFor={name} className="block text-gray-400 font-medium mb-1">
        {label} {required && '*'}
      </label>

      {type === 'textarea' ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className={inputClass + ' h-24'}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          value={type !== 'file' ? value : undefined}
          onChange={onChange}
          required={required}
          className={inputClass}
          {...(type === 'file' && { accept: 'image/*' })}
        />
      )}
    </div>
  );
}
