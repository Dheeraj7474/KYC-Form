import React from 'react';

const countries = [
  { value: 'USA', label: 'United States' },
  { value: 'Canada', label: 'Canada' },
  { value: 'UK', label: 'United Kingdom' },
  { value: 'AUS', label: 'Australia' },
  { value: 'DEU', label: 'Germany' },
];

const AddressInfo = ({ userData, setUserData, onNextStep, onPrevStep, errors }) => {
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
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Address Information</h2>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2 font-medium">Country</label>
          <select 
            name="country"
            value={userData.country || ''}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
          >
            <option value="">Select a Country</option>
            {countries.map((country) => (
              <option key={country.value} value={country.value}>
                {country.label}
              </option>
            ))}
          </select>
          {errors.country && (
            <div className="text-red-500 text-sm mt-2">{errors.country}</div>
          )}
        </div>
        <div>
          <label className="block text-gray-700 mb-2 font-medium">Address</label>
          <input
            name="address"
            value={userData.address || ''}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
          />
          {errors.address && (
            <div className="text-red-500 text-sm mt-2">{errors.address}</div>
          )}
        </div>
      </div>
      <div className="flex justify-between mt-4">
        <button
          type="button"
          onClick={onPrevStep}
          className="bg-gray-200 text-gray-700 py-2 px-6 rounded-lg hover:bg-gray-300 transition duration-300"
        >
          Previous
        </button>
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

export default AddressInfo;