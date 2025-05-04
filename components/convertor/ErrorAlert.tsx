// /components/convertor/ErrorAlert.tsx
import React from 'react';

interface ErrorAlertProps {
  message: string;
  onClose: () => void;
}

const ErrorAlert: React.FC<ErrorAlertProps> = ({ message, onClose }) => {
  return (
    <div className="bg-red-100 border-r-4 border-red-500 text-red-700 p-4 mb-4 rounded shadow-md" role="alert">
      <div className="flex justify-between items-start">
        <div>
          <p className="font-bold mb-1">خطا</p>
          <p className="text-sm">{message}</p>
        </div>
        <button 
          onClick={onClose}
          className="text-red-500 hover:text-red-700 font-bold"
          aria-label="بستن"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default ErrorAlert;