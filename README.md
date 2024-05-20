# Zoppel Contracts

This project is a Hardhat-based development environment for the Zoppel token, an ERC-20 token with a maximum supply of 21 million tokens. The project also includes basic tests to verify the token's functionality.

## Project Structure

- `contracts/`: Contains the Solidity contracts.
  - `ZopToken.sol`: The main ERC-20 token contract with ownership and permit functionality.
- `test/`: Contains the test scripts.
  - `ZopToken.cjs`: JavaScript tests for the Zoppel Token contract.


## Prerequisites

Before running any commands, make sure you have Node.js and npm installed.

1. Install Node.js: [Download and Install Node.js](https://nodejs.org/)
2. Install npm: npm is included with Node.js

## Getting Started

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/ZoppelUniversesrls/zoppel-contracts.git
    cd zoppel-contracts
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

### Compiling the Contracts

Compile the smart contracts using Hardhat:
```sh
npx hardhat compile
```


### Running Tests

The test suite is written using Chai and Hardhat, covering the following basic functionalities:

- Deployment and initial supply assignment
- Token transfers between accounts
- Insufficient balance transfer reverts

Run the test suite to ensure everything is working correctly:
```sh
npx hardhat test
```


### Zoppel Token Contract

The Zoppel token contract is an ERC-20 token with the following features:

- Name: Zoppel
- Symbol: ZOP
- Max Supply: 21,000,000 ZOP
- Ownership: The contract is Ownable, allowing administrative tasks to be restricted to the owner.
- Permit: Implements ERC20Permit to support gasless transactions.

#### Note

This contract and its associated tests are part of an ongoing development process. The current token implementation is not necessarily the final version that will be deployed.

