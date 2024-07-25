import { useState } from 'react';
import axios from 'axios';
import Web3 from 'web3';
import './login.css';
import DentalInsuranceVerifierABI from './contracts/DentalInsuranceVerifier.json';
import { isAddress } from 'web3-validator';

const serverUrl = 'http://localhost:5000';
const web3 = new Web3(Web3.givenProvider || `https://polygon-amoy.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`); // Replace with your provider
const contractAddress = '0x4D557209B4ec35Fed5A1CAcaA0cB0aDce20ea965';
// Login component
function Login({ onPageChange, onSetUserSeed, onSetPublicKey }) {
  const [isFocused, setIsFocused] = useState(false); // State to control the input focus
  const [isHovered, setIsHovered] = useState(false); // State to control the input hover
  const [userInput, setUserInput] = useState(''); // State to store the user input
  const [error, setError] = useState(''); // State to store the error message
  const [accCreation, setAccCreation] = useState(false);
  const [newAccountID, setNewAccountID] = useState('');
  const [newAccountName, setNewAccountName] = useState('');
  const [newAccountLocation, setNewAccountLocation] = useState('');
  const [loadingSubmit, setLoadingSubmit] = useState(false); // State to control the loading state
  const [loadingCreate, setLoadingCreate] = useState(false);

  // Function to handle the input focus
  const handleFocus = () => setIsFocused(true);

  // Function to handle the input blur
  const handleBlur = () => setIsFocused(false);

  // Function to handle the input hover
  const handleMouseEnter = () => setIsHovered(true);

  // Function to handle the input mouse leave
  const handleMouseLeave = () => setIsHovered(false);

  // Function to handle the input change
  const handleChange = (event) => setUserInput(event.target.value);

  // Function to login to existing wallet
  const loginSeed = async () => {
    try {
        if (!userInput || !isAddress(userInput)) {
            setError('Invalid Ethereum address format');
            return;
        }
        setLoadingSubmit(true);

        // Verify the Ethereum address directly with your server or smart contract
        const response = await axios.post(`${serverUrl}/api/auth/login`, { seed: userInput });

        if (response.data.success) {
            localStorage.setItem('token', response.data.token); // Store token in local storage
            onPageChange('ValidateClaim');
        } else {
            setError('Failed to log in');
        }
    } catch (error) {
        console.error('Error logging in:', error.message);
        setError('Failed to log in');
    } finally {
        setLoadingSubmit(false);
    }
};


  const chooseCreateAccount = () => setAccCreation(true);
  // Function to create a new wallet
  const signUpSeed = async () => {
    onPageChange('ValidateClaim');
    try {
        if (!newAccountID || !newAccountName || !newAccountLocation) {
            setError('All fields are required');
            return;
        }
        
        if (isAddress(newAccountID) === false) {
          setError('Invalid Ethereum address');
          return;
        }

        setLoadingCreate(true);
        console.log('New Account ID', newAccountID);
        // Send the Ethereum address and other details to the server or smart contract
        const response = await axios.post(`${serverUrl}/api/auth/register`, {
            address: newAccountID,
            name: newAccountName,
            location: newAccountLocation
        });

        if (response.data.success) {
            localStorage.setItem('token', response.data.token); // Store token in local storage
            onPageChange('ValidateClaim');
        } else {
            setError('Failed to create wallet');
        }
    } catch (error) {
        console.error('Error creating wallet:', error.message);
        setError('Failed to create wallet');
    } finally {
        setLoadingCreate(false);
    }
};


  // Render the login component
  return (
        <div className="loginContainer">
          <h1 id="loginHeader">Login</h1>
          <div className="inputContainer">
            {/* Input field */}
            <input
              id="inputSeed"
              className="input-seed"
              type="text"
              placeholder="Wallet ID"
              onFocus={handleFocus}
              onBlur={handleBlur}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              value={userInput} // Set input value to userInput state
              onChange={handleChange} // Handle input change
            />
            {/* Border element */}
            <div id="positionBorder">
              <div className={`inputBorder ${isFocused || isHovered ? 'focused' : ''}`}></div>
            </div>
          </div>
          <div id="centerSubmitButton">
            <button className="submitSeed" type="button" onClick={loginSeed}>Login</button>
            {loadingSubmit && <p id="loadingSubmit">Loading...</p>}
          </div>
          <div id="centerOr">
            <h2 id="optionOr">Or</h2>
          </div>
          <div id="newSeedContainer">
            {accCreation === false ? (
              <button id="newSeed" type="button" onClick={chooseCreateAccount}>Create New Account</button>
            ) : (
              <>
                <div id="ioContainer">
                <input
                    className="addingBusiness"
                    value={newAccountID}
                    onChange={(e) => setNewAccountID(e.target.value)}
                    placeholder="Wallet ID"
                  />
                  <input
                    className="addingBusiness"
                    value={newAccountName}
                    onChange={(e) => setNewAccountName(e.target.value)}
                    placeholder="Business Name"
                  />
                  <input
                    className="addingBusiness"
                    value={newAccountLocation}
                    onChange={(e) => setNewAccountLocation(e.target.value)}
                    placeholder="Location (e.g. Lawrence, KS)"
                  />
                </div>
                <button id="submitBusinessAccount" type="button" onClick={signUpSeed}>Submit</button>
              </>
            )}
          </div>
          <div id="notesContainer">
            {loadingCreate && <p id="loadingCreate">Loading...</p>}
            {error && <p id="errorText">{error}</p>}
            <p id="noteText">
              *note: Creating your own account will incur a gas fee on Polygon's AMOY Testnet.<br />
              Ensure your account has sufficient funds.<br />
              If you do not have your own account, please check out the About us page.
            </p>
          </div>
        </div>
  );
}

export default Login;


