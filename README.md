Dental Insurance Claims on Ethereum Ledger

# Dental Insurance Claims on Ethereum Ledger

### Note
You can create your app in your client folder by typing `npx create-react-app my-app` in your command line, I recommend looking at React's documentation for more information.
## Package Download Information

### npm install:
- express
- jsonwebtoken
- dotenv
- body-parser
- cors
- axios
- truffle and @truffle/hdwallet-provider
- web3

## Setup

To run this application you need to open two terminals, one for the client side and one for the server side. 

For the client side:
- Ensure you have all the dependencies installed above, in the root directory type `cd client` to access the folder, and after type `npm start` to run the program.

For the server side:
- Again, ensure all dependencies are installed for this application, in the root directory type `cd server/api`, and after type `node server.js` to run the server.

A window should pop up labeled `localhost:3000` to which the application should be running on.

## Main Goals

Currently, this project is still under development with a few server issues that need to be resolved. At the moment, the application is running offline to ensure that its intended purpose is highlighted when being demo'd. In the future, this project will still utilize Polygon's Testnet servers to interact with contracts on the Ethereum network. The main thought process behind this build was to incorporate elements of offchain data storage for a more practical approach to draw consumers to this business model.

## Contracts

There are two main contracts in this project that have been minted onto Ethereum's Blockchain (see `build` folder). My `auth.js` and `claim.js` files found in my `server/api/routes` folder are utilized to interact with these contracts by using Alchemy's `getTransaction()` function. This function takes in an object:

```javascript
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

```
and then transmits data to interact with the smart contract. In this case, the transaction would verify a business utilizing the `DentalCompanyVerifier.sol` contract.
## Implications

See the 'About Us' page.

##Final Regards

By no means would I say this is how I would want my project to be finalized, as there were a lot of conceptual points that I failed to take into consideration. Looking back, I would have spent more time working with Polygon's AMOY Testnet server on a different application from Alchemy. Furthermore, I also would have taken into consideration that implementations are constantly changing with these softwares and it is important to stay up to date with proper documentation of applications such as Alchemy or Ethers. Additionally, there were files (in `server\api\models`) set up to be used as a structure for an online database to store data offchain. This project was inspired by my dad, who taught me about being honest in business. This application was aimed to change the integrity of the insurance industry for the better.