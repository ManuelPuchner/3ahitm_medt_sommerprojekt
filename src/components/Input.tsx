import React from "react";

type InputProps = {
  label: string;
  placeholder?: string;
  type: string;
  name: string;
  id: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
};

function Input({ label, placeholder, type, name, id, onChange, disabled}: InputProps) {
  return (
    <div className="flex flex-wrap mb-3">
      <label htmlFor="name" className="w-full">
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={id}
        className="border border-gray-100 rounded-md px-4 py-3 w-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent disabled:opacity-50"
        placeholder={placeholder}
        onChange={onChange}
        disabled={disabled}
      />
    </div>
  );
}

export default Input;
