import React from 'react';

const DocumentUpload = ({ userData, setUserData, onNextStep, onPrevStep, errors }) => {
  const handleFileChange = (e) => {
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
  };

  return (
    <form onSubmit={onNextStep} className="space-y-4 h-full flex flex-col justify-between">
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Document Upload</h2>
        <div>
          <label className="block text-gray-700 mb-2 font-medium">Identity Document</label>
          <div className="relative">
            {userData.identity_document ? (
              <p className="text-green-500 text-sm mt-2">
                File attached: {userData.identity_document}
              </p>
            ) : (
              <input
                type="file"
                onChange={handleFileChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg file:mr-4 file:rounded-lg file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-blue-700 hover:file:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              />
            )}
            {!userData.identity_document && errors.identity_document && (
              <div className="text-red-500 text-sm mt-2">{errors.identity_document}</div>
            )}
          </div>
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

export default DocumentUpload;