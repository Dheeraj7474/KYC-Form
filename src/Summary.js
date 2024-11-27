import React from 'react';

const Summary = ({ userData, setUserData, setStep, handleEditUploadsDoc }) => {
  return (
    <div className="space-y-4 flex flex-col justify-between">
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Summary and Review</h2>
        <div className="bg-blue-50 p-4 rounded-lg mb-4">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Personal Information</h3>
          <div className="space-y-1">
            <p><strong className="text-gray-600">Full Name:</strong> {userData.full_name}</p>
            <p><strong className="text-gray-600">Email:</strong> {userData.email}</p>
          </div>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg mb-4">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Address Information</h3>
          <div className="space-y-1">
            <p><strong className="text-gray-600">Country:</strong> {userData.country}</p>
            <p><strong className="text-gray-600">Address:</strong> {userData.address}</p>
          </div>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Document Upload</h3>
          <p><strong className="text-gray-600">Uploaded Document:</strong> {userData.identity_document}</p>
        </div>
      </div>
      <div className="space-y-4">
        <div className="flex justify-between">
          <button
            onClick={() => setStep(1)}
            className="bg-blue-100 text-blue-600 px-4 py-2 rounded-md hover:bg-blue-200 transition duration-300"
          >
            Edit Personal Info
          </button>
          <button
            onClick={() => setStep(2)}
            className="bg-purple-100 text-purple-600 px-4 py-2 rounded-md hover:bg-purple-200 transition duration-300"
          >
            Edit Address
          </button>
          <button
            onClick={handleEditUploadsDoc}
            className="bg-green-100 text-green-600 px-4 py-2 rounded-md hover:bg-green-200 transition duration-300"
          >
            Edit Document
          </button>
        </div>
        <button
          onClick={() => {
            alert('Form submitted successfully!');
            setStep(1);
            setUserData({});
          }}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 px-4 rounded-md hover:from-blue-600 hover:to-purple-700 transition duration-300"
        >
          Confirm and Submit
        </button>
      </div>
    </div>
  );
};

export default Summary;