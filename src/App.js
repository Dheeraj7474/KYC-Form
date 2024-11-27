import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

const countries = [
  { value: 'USA', label: 'United States' },
  { value: 'Canada', label: 'Canada' },
  { value: 'UK', label: 'United Kingdom' },
  { value: 'AUS', label: 'Australia' },
  { value: 'DEU', label: 'Germany' },
];

const App = () => {
  const [step, setStep] = useState(1);
  const [userData, setUserData] = useState({});
  const { register, handleSubmit, control, trigger, formState: { errors }, getValues } = useForm({
    mode: 'onBlur',
  });

  const handleNextStep = async () => {
    const result = await trigger();
    if (result) {
      const currentStepData = getValues();
      setUserData((prev) => ({ ...prev, ...currentStepData }));
      if (step === 2 && !userData.identity_document) {
        setStep(3);
      } else {
        setStep((prevStep) => prevStep + 1);
      }
    }
  };

  const handlePrevStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const onSubmit = (data) => {
    const finalData = { ...userData, ...data };
    console.log('Submitted Data:', finalData);
    alert('Form Submitted Successfully!');
  };

  const renderProgressBar = () => {
    const progress = ((step - 1) / 3) * 100;
    return (
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
        <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
      </div>
    );
  };

  const handleEditUploadsDoc = () => {
    setUserData((prev) => ({ ...prev, identity_document: '' }));
    setStep(3);
  };

  return (
    <div className="max-w-md mx-auto p-4 mt-8 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">KYC Form</h1>
      {renderProgressBar()}
      {step === 1 && (
        <form onSubmit={handleNextStep}>
          <h2 className="text-lg font-bold mb-4">Step 1: Personal Information</h2>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Full Name</label>
            <input
              type="text"
              className="shadow border rounded w-full py-2 px-3"
              value={userData.full_name || ''}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, full_name: e.target.value }))
              }
            />
            {!userData.full_name && (
              <div className="text-red-500 text-sm mt-2">Full Name is required</div>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              className="shadow border rounded w-full py-2 px-3"
              value={userData.email || ''}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, email: e.target.value }))
              }
            />
            {!userData.email && (
              <div className="text-red-500 text-sm mt-2">Valid Email is required</div>
            )}
          </div>
          <div className="flex justify-between mt-4">
            <button
              type="submit"
              disabled={!userData.full_name || !userData.email}
              className={`${
                userData.full_name && userData.email
                  ? 'bg-blue-500 hover:bg-blue-700 text-white'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              } py-2 px-4 rounded`}
            >
              Next
            </button>
          </div>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handleNextStep}>
          <h2 className="text-lg font-bold mb-4">Step 2: Address Information</h2>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Country</label>
            <select
              className="shadow border rounded w-full py-2 px-3"
              value={userData.country || ''}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, country: e.target.value }))
              }
            >
              <option value="">Select a Country</option>
              <option value="USA">USA</option>
              <option value="Canada">Canada</option>
              <option value="UK">UK</option>
            </select>
            {!userData.country && (
              <div className="text-red-500 text-sm mt-2">Country is required</div>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Address</label>
            <input
              type="text"
              className="shadow border rounded w-full py-2 px-3"
              value={userData.address || ''}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, address: e.target.value }))
              }
            />
            {!userData.address && (
              <div className="text-red-500 text-sm mt-2">Address is required</div>
            )}
          </div>
          <div className="flex justify-between mt-4">
            <button
              type="button"
              onClick={handlePrevStep}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded"
            >
              Previous
            </button>
            <button
              type="submit"
              disabled={!userData.country || !userData.address}
              className={`${
                userData.country && userData.address
                  ? 'bg-blue-500 hover:bg-blue-700 text-white'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              } py-2 px-4 rounded`}
            >
              Next
            </button>
          </div>
        </form>
      )}

{step === 3 && (
  <form
    onSubmit={(e) => {
      e.preventDefault();
      if (userData.identity_document) {
        setStep(4);
      }
    }}
  >
    <h2 className="text-lg font-bold mb-4">Step 3: Document Upload</h2>
    <div className="mb-4">
      <label className="block text-gray-700 mb-2">Identity Document</label>
      <div className="relative">
        <input
          type="file"
          className="shadow border rounded w-full py-2 px-3"
          onChange={(e) => {
            if (e.target.files.length > 0) {
              const file = e.target.files[0];
              setUserData((prev) => ({
                ...prev,
                identity_document: file.name,
              }));
            } else {
              setUserData((prev) => ({
                ...prev,
                identity_document: '',
              }));
            }
          }}
        />
        {userData.identity_document && (
          <p className="text-green-500 text-sm mt-2">File attached: {userData.identity_document}</p>
        )}
        {!userData.identity_document && (
          <div className="text-red-500 text-sm mt-2">Please attach a file to proceed</div>
        )}
      </div>
    </div>
    <div className="flex justify-between mt-4">
      <button
        type="button"
        onClick={handlePrevStep}
        className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded"
      >
        Previous
      </button>
      <button
        type="submit"
        disabled={!userData.identity_document}
        className={`${
          userData.identity_document
            ? 'bg-green-500 hover:bg-green-700 text-white'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        } py-2 px-4 rounded`}
      >
        Next
      </button>
    </div>
  </form>
)}

      {step === 4 && (
        <div className="p-6 bg-white shadow-md rounded">
          <h2 className="text-lg font-bold mb-4">Summary and Review</h2>
          <div className="mb-4">
            <h3 className="font-bold text-gray-700">Personal Information</h3>
            <p>
              <strong>Full Name:</strong> {userData.full_name}
            </p>
            <p>
              <strong>Email:</strong> {userData.email}
            </p>
          </div>
          <div className="mb-4">
            <h3 className="font-bold text-gray-700">Address Information</h3>
            <p>
              <strong>Country:</strong> {userData.country}
            </p>
            <p>
              <strong>Address:</strong> {userData.address}
            </p>
          </div>
          <div className="mb-4">
            <h3 className="font-bold text-gray-700">Document Upload</h3>
            <p>
              <strong>Uploaded Document:</strong> {userData.identity_document}
            </p>
          </div>
          <div className="flex justify-between mt-4">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 mr-2 rounded"
            >
              Edit Personal Information
            </button>
            <button
              type="button"
              onClick={() => setStep(2)}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 mr-2 rounded"
            >
              Edit Address Information
            </button>
            <button
              type="button"
              onClick={handleEditUploadsDoc}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded"
            >
              Edit Document Upload
            </button>
          </div>
          <div className="mt-4">
            <button
              type="button"
              onClick={() => alert('Form submitted successfully!')}
              className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded"
            >
              Confirm and Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;