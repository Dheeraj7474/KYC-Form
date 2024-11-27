
import React from 'react';
export const Steps = ({ currentStep, children }) => {
    return (
      <div>
        {React.Children.map(children, (child, index) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, { isActive: index + 1 === currentStep });
          }
          return child;
        })}
      </div>
    );
  };
  
  export const Step = ({ step, isActive, children }) => {
    if (!isActive) return null;
    return <div>{children}</div>;
  };