import React from 'react';

const PersonalInfo = ({ userData, setUserData, onNextStep, errors }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <form onSubmit={onNextStep} className="space-y-4 h-full flex flex-col justify-between">
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Personal Information</h2>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2 font-medium">Full Name</label>
          <input
            name="full_name"
            value={userData.full_name || ''}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
          />
          {errors.full_name && (
            <div className="text-red-500 text-sm mt-2">{errors.full_name}</div>
          )}
        </div>
        <div>
          <label className="block text-gray-700 mb-2 font-medium">Email</label>
          <input
            name="email"
            value={userData.email || ''}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
          />
          {errors.email && (
            <div className="text-red-500 text-sm mt-2">{errors.email}</div>
          )}
        </div>
      </div>
      <div className="flex justify-end mt-4">
        <button
          type="submit"
          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 px-6 rounded-lg hover:from-blue-600 hover:to-purple-700 transition duration-300 shadow-md"
        >
          Next Step
        </button>
      </div>
    </form>
  );
};

export default PersonalInfo;