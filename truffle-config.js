const HDWalletProvider = require('@truffle/hdwallet-provider');
require('dotenv').config();

module.exports = {
  networks: {
    amoy: {
      provider: () => new HDWalletProvider(process.env.MNEMONIC, `https://polygon-amoy.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`),
      network_id: 80002, // Chain ID for Amoy Testnet
      gas: 3578144, // Adjusted gas limit based on budget
      gasPrice: 30900000000 // Gas price in Wei (30.9 Gwei)
    },
    // Other network configurations...
  },
  compilers: {
    solc: {
      version: "0.8.21" // Use the appropriate version
    }
  }
};
