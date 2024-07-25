import React, { useState } from 'react';
import './App.css';
import Login from './Login';
import ValidateClaim from './ValidateClaim';
import AboutUs from './AboutUs';
import Settings from './Settings';
import logo from './insuracarelogo.png';
const App = () => {
  const [currentPage, setCurrentPage] = useState('Login');

  const handleButtonClick = (buttonName) => {
    console.log(`Page clicked: ${buttonName}`);
    setCurrentPage(buttonName);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  }

  return (
    <div>
      <div className="custom-main-border">
        <div className="mainHeader">
          <h1 id="mainHeaderText">InsuraCare</h1>
          </div>
        <p id="headerSubText">Innovating the Insurance Industry</p>
        <div className="containermainlogo">
          <img src={logo} alt="Logo" className="mainlogo" />
        </div>
        <div className="tabs">
            {/* Navigation buttons or links */}
            <button onClick={() => handleButtonClick('Login')}>Login</button>
            <button onClick={() => handleButtonClick('AboutUs')}>About us</button>
            <button onClick={() => handleButtonClick('Settings')}>Settings</button>
   
          </div>
      </div>
        {/* Render the current page */}
        {currentPage === 'Login' && <Login onPageChange={handlePageChange} setCurrentPage={setCurrentPage} />}
        {currentPage === 'ValidateClaim' && <ValidateClaim setCurrentPage={setCurrentPage} />}
        {currentPage === 'AboutUs' && <AboutUs setCurrentPage={setCurrentPage} />} 
        {currentPage === 'Settings' && <Settings setCurrentPage={setCurrentPage} />}
    </div>
  );
};

export default App;

