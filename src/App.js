import React, { useState } from 'react';
import PersonalInfo from './PersonalInfo';
import AddressInfo from './AddressInfo';
import DocumentUpload from './DocumentUpload';
import Summary from './Summary';

const App = () => {
  const [step, setStep] = useState(1);
  const [userData, setUserData] = useState({});
  const [errors, setErrors] = useState({});

  const validateStep1 = (data) => {
    const newErrors = {};
    
    // Full Name Validation
    if (!data.full_name) {
      newErrors.full_name = "Full Name is required";
    } else if (data.full_name.length < 2) {
      newErrors.full_name = "Name must be at least 2 characters long";
    } else if (data.full_name.length > 50) {
      newErrors.full_name = "Name cannot exceed 50 characters";
    }

    // Email Validation
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!data.email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(data.email)) {
      newErrors.email = "Invalid email address";
    }

    return newErrors;
  };

  const validateStep2 = (data) => {
    const newErrors = {};
    
    // Country Validation
    if (!data.country) {
      newErrors.country = "Country is required";
    }

    // Address Validation
    if (!data.address) {
      newErrors.address = "Address is required";
    } else if (data.address.length < 5) {
      newErrors.address = "Address must be at least 5 characters long";
    } else if (data.address.length > 100) {
      newErrors.address = "Address cannot exceed 100 characters";
    }

    return newErrors;
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    let currentErrors = {};

    // Validate based on current step
    if (step === 1) {
      currentErrors = validateStep1(userData);
    } else if (step === 2) {
      currentErrors = validateStep2(userData);
    } else if (step === 3 && !userData.identity_document) {
      currentErrors = { identity_document: 'Please attach a file to proceed' };
    }

    // If there are no errors, proceed to next step
    if (Object.keys(currentErrors).length === 0) {
      setErrors({});
      
      setStep((prevStep) => prevStep + 1);
      
      // Handle special case for document upload step
      if (step === 2 && !userData.identity_document) {
        setStep(3);
      }
      
    } else {
      setErrors(currentErrors);
    }
  };

  const handlePrevStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const renderProgressBar = () => {
    const progress = ((step - 1) / 4) * 100;
    return (
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6 shadow-inner">
        <div 
          className="bg-gradient-to-r from-blue-500 to-purple-600 h-2.5 rounded-full transition-all duration-500 ease-in-out" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    );
  };

  const handleEditUploadsDoc = () => {
    setUserData(prev => ({
      ...prev,
      identity_document: ''
    }));
    setStep(3);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-100 h-[600px]"> {/* Fixed height */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white">
          <h1 className="text-3xl font-extrabold tracking-tight">KYC Verification</h1>
          <p className="text-blue-100 mt-2">Complete your Know Your Customer process</p>
        </div>
        
        <div className="p-6 h-[calc(100%-120px)] overflow-y-auto"> {/* Allow scrolling */}
          {renderProgressBar()}
          
          <div>
            {step === 1 && (
              <PersonalInfo 
                userData={userData} 
                setUserData={setUserData} 
                onNextStep={handleNextStep} 
                errors={errors} 
              />
            )}

            {step === 2 && (
              <AddressInfo 
                userData={userData} 
                setUserData={setUserData} 
                onNextStep={handleNextStep} 
                onPrevStep={handlePrevStep} 
                errors={errors} 
              />
            )}

            {step === 3 && (
              <DocumentUpload 
                userData={userData} 
                setUserData={setUserData} 
                onNextStep={handleNextStep} 
                onPrevStep={handlePrevStep} 
                errors={errors} 
              />
            )}

            {step === 4 && (
              <Summary 
                userData={userData}
                setUserData={setUserData}
                setStep={setStep}
                handleEditUploadsDoc={handleEditUploadsDoc}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;