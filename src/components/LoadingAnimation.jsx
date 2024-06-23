import React from 'react';
import logo from "../assets/logo2.png"
const LoadingAnimation = ({ isLoading }) => {
  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-neutral-900 z-50">
          <div className="animate-bounce">
            <img
              src={logo}
              alt="Logo"
              className="w-32 h-32"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default LoadingAnimation;