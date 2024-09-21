## Project 
Module 2 of the Eth-Avax course by Metacrafters.

## Description
Adding functionalities in assessment.sol and interacting with the smart contract using the frontend.

## Frontend UI
If MetaMask or any other crypto wallet is not installed.
![image](https://github.com/Alok-Raturi/SCM-Starter/assets/110283609/6d5412fe-e053-44d2-a125-6e8f994e0340)

Otherwise
![image](https://github.com/Alok-Raturi/SCM-Starter/assets/110283609/099d31d2-331d-4e11-ac06-39f48e449269)

![image](https://github.com/Alok-Raturi/SCM-Starter/assets/110283609/e7cb0b3e-35fe-4a38-946f-05609d0ce676)

## Execution:
      * First fork the project and clone it.
      * In hardhat, first use the sepolia testnet.
      * In hardhat.config.js, add the sepolia network and use alchemy as provider and also add the private key of your metamask account.
      * After that, use npm i.
      * use npx hardhat run scripts/deploy.js --network sepolia.
      * Now copy the contract address in the contract address variable in ./pages/index.js
      * Now run npm run dev.
      * It will create a server on localhost:3000
      * Now you can use any wallet to interact with any functionality except deposit and withdraw.
      * To interact with deposit and withdraw, you must choose your account through which you have done deployment of contract.

## Possibility of Error:
    * Paste the correct Alchemy URL. .
    * Use the account through which you have done deployment to interact with deposit and withdraw functions otherwise you will get call revert function error or unexpected gas        limit error.

    
