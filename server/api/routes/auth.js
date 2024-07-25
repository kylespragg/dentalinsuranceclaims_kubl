const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../../.env') });
const express = require('express');
const jwt = require('jsonwebtoken');
const {Web3} = require('web3'); // Ensure Web3 is correctly imported
const { Alchemy, Network, Wallet, Utils } = require('alchemy-sdk'); // Ensure Alchemy SDK is installed
const router = express.Router();
const ethers = require('ethers');
const { isAddress } = require('web3-validator');
const contractABI = require('../../../build/contracts/DentalInsuranceVerifier.json').abi;
const contractAddress = '0x4Ae421713F84a7Ff7505fB3f3c9C7a44644C6726';
const alchemy = new Alchemy({
    apiKey: process.env.ALCHEMY_API_KEY,
    network: Network.POLYGON_AMOY, // Adjust network as needed
  });

const web3 = new Web3(new Web3.providers.HttpProvider(`https://polygon-amoy.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`));
const dentalInsuranceVerifier = new web3.eth.Contract(contractABI, contractAddress);

// console.log(OWNER_ADDRESS);
// console.log(PRIVATE_KEY);
// console.log(SECRET_KEY);

ALCHEMY_API_KEY= process.env.ALCHEMY_API_KEY;
SECRET_KEY= process.env.SECRET_KEY;
PORT=5000
OWNER_ADDRESS= process.env.OWNER_ADDRESS;
PRIVATE_KEY= process.env.PRIVATE_KEY;

const sendTransaction = async (transaction) => {
    try {
        const wallet = new Wallet(PRIVATE_KEY); // Initialize wallet with private key
        let nonce = await alchemy.core.getTransactionCount(wallet.address, 'latest');
        
        // Log the values before using them
        console.log('Nonce:', nonce);
        console.log('Transaction Data:', transaction.data);
    
        const gasLimit = 3578144n; // Convert to BigNumber
        const maxFeePerGas = (ethers.parseUnits('20', 'gwei')); // Convert to BigNumber
        const maxPriorityFeePerGas = (ethers.parseUnits('2', 'gwei')); // Convert to BigNumber
        const chainId = 80002;
      // Log the converted value
        console.log('Gas Limit:', gasLimit);
        console.log('Max Priority Fee Per Gas:', maxPriorityFeePerGas);
        console.log('Max Fee Per Gas:', maxFeePerGas);
        console.log('Chain ID:', chainId);
        
      // Prepare transaction object
        const tx = {
            from: OWNER_ADDRESS,
            to: contractAddress,
            data: transaction.data,
            gasLimit,
            maxPriorityFeePerGas,
            maxFeePerGas,
            nonce: nonce,
            type: 2,
            chainId,
            value: ethers.parseUnits('0.001', 'ether'),
        };
  
      // Log the transaction object
      console.log('Transaction Object:', tx);
  
      // Sign the transaction
      const signedTx = await wallet.signTransaction(tx);
  
      // Send the transaction
      const receipt = await alchemy.core.sendTransaction(signedTx.rawTransaction);
  
      return receipt;
    } catch (error) {
      console.error('Error sending transaction:', error);
      throw error;
    }
  };
  
  // Register route
  router.post('/register', async (req, res) => {
    const { address, name, location } = req.body;
  
    try {
      // Validate owner address
      if (!OWNER_ADDRESS || !isAddress(OWNER_ADDRESS)) {
        throw new Error('Invalid owner address');
      }
  
      // Prepare the transaction data
      const encodedABI = dentalInsuranceVerifier.methods.verifyBusiness(address, name, location).encodeABI();
  
      // Prepare the transaction object
      const transaction = { data: encodedABI };
  
      // Send the transaction
      const res = await sendTransaction(transaction);
  
      // Respond with a success message
      res.status(201).send('Business registered and verified on the blockchain');
    } catch (error) {
      console.error('Error verifying business:', error);
      res.status(500).send('Internal server error');
    }
  });
  
  // Login route
  router.post('/login', async (req, res) => {
      const { address } = req.body;
      try {
          const isVerified = await dentalInsuranceVerifier.methods.isBusinessVerified(address).call();
          if (!isVerified) {
              return res.status(400).send('Business not verified');
          }
  
          const business = await dentalInsuranceVerifier.methods.businesses(address).call();
          const token = jwt.sign({ address, name: business.name, location: business.location }, SECRET_KEY, { expiresIn: '1h' });
          res.json({ token });
      } catch (error) {
          console.error('Error logging in:', error);
          res.status(500).send('Internal server error');
      }
  });
  
  module.exports = router;