# Zoppel Contracts

This project is a Hardhat-based development environment for the Zoppel ecosystem

## Project Structure

- `contracts/`: Contains the Solidity contracts.
  - `ZopToken.sol`: The main ERC-20 token contract with ownership and permit functionality.
  - `ArtifactGenerator.sol`: An ERC721-based contract that allows controlled minting and transferring of NFTs.
- `test/`: Contains the test scripts.
  - `ZopToken.cjs`: JavaScript tests for the Zoppel Token contract.
  - `ArtifactGenerator.js`: JavaScript tests for the ArtifactGenerator contract.


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

Run the test suites to ensure everything is working correctly:
```sh
npx hardhat test
```

The test suites cover the following functionalities:

- ZopToken:
  - Deployment and initial supply assignment
  - Token transfers between accounts
  - Insufficient balance transfer reverts
  
- ArtifactGenerator:
  - Correct roles assigned on deployment (DEFAULT_ADMIN_ROLE, MINTER_ROLE, ADMIN_ROLE, MARKETPLACE_ROLE)
  - Minter can mint multiple NFTs
  - User cannot mint without minter role
  - Admin can grant MINTER_ROLE
  - User can mint after receiving MINTER_ROLE
  - User cannot mint after minting once (if not admin)
  - Non-admin cannot grant MINTER_ROLE
  - Admin can revoke MINTER_ROLE if user doesn't mint for any reason
  - Revoked minter cannot mint
  - Marketplace can transfer tokens after approval
  - Non-marketplace cannot transfer tokens
  - Correct token URIs are returned for a user
  - Owner can update base URI correctly
  - Contract fails to distribute sFUEL if contract is out of funds
  - Contract distributes sFUEL when conceding MINTER_ROLE if balance is low
  - Owner can update ETH amount correctly


### Zoppel Token Contract

The Zoppel token contract is an ERC-20 token with the following features:

- Name: Zoppel
- Symbol: ZOP
- Max Supply: 21,000,000 ZOP
- Ownership: The contract is Ownable, allowing administrative tasks to be restricted to the owner.
- Permit: Implements ERC20Permit to support gasless transactions.

#### Note

This contract and its associated tests are part of an ongoing development process. The current token implementation is not necessarily the final version that will be deployed.

### ArtifactGenerator Contract

The ArtifactGenerator contract is an ERC-721 token with the following features:

- Name: ArtifactGenerator
- Symbol: ARTF
- Role-Based Access Control: Uses AccessControl to manage roles such as DEFAULT_ADMIN_ROLE, MINTER_ROLE, and MARKETPLACE_ROLE.
- Minting: Allows authorized minters to create new NFTs with associated metadata URIs.
- Batch Minting: Supports minting multiple tokens to different recipients in a single transaction.
- Token Transfers: Restricts token transfers to addresses with the MARKETPLACE_ROLE.
- Base URI: Allows the admin to set a base URI for token metadata.
- sFUEL Distribution: Distributes a small amount of ETH (sFUEL) to new minters to cover gas costs.
