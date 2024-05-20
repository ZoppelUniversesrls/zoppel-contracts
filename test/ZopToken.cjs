const { expect } = require("chai");

describe("Zoppel Token Contract", function () {
    let Zoppel, zoppel, owner, addr1, addr2;

    beforeEach(async function () {
        // Get the ContractFactory and Signers here.
        Zoppel = await ethers.getContractFactory("Zoppel");
        [owner, addr1, addr2] = await ethers.getSigners();

        // Deploy the contract
        zoppel = await Zoppel.deploy(owner.address);
        
    });

    describe("Deployment", function () {
        it("Should set the right owner", async function () {
            expect(await zoppel.owner()).to.equal(owner.address);
        });

        it("Should assign the total supply of tokens to the owner", async function () {
            const ownerBalance = await zoppel.balanceOf(owner.address);
            expect(await zoppel.totalSupply()).to.equal(ownerBalance);
        });

        it("Should set the correct max supply", async function () {
            expect(await zoppel.MAX_SUPPLY()).to.equal(ethers.parseUnits("21000000.0", "ether"));
        });
    });

    describe("Transactions", function () {
        it("Should transfer tokens between accounts", async function () {
            // Transfer 50 tokens from owner to addr1
            await zoppel.transfer(addr1.address, ethers.parseUnits("50.0","ether"));
            const addr1Balance = await zoppel.balanceOf(addr1.address);
            expect(addr1Balance).to.equal(ethers.parseUnits("50.0","ether"));

            // Transfer 50 tokens from addr1 to addr2
            await zoppel.connect(addr1).transfer(addr2.address, ethers.parseUnits("50","ether"));
            const addr2Balance = await zoppel.balanceOf(addr2.address);
            expect(addr2Balance).to.equal(ethers.parseUnits("50","ether"));
        });

        it("Should fail if sender doesn’t have enough tokens", async function () {
            const initialOwnerBalance = await zoppel.balanceOf(owner.address);

            // Try to send 1 token from addr1 (0 tokens) to owner.
            try {
                await zoppel.connect(addr1).transfer(owner.address, ethers.parseUnits("1","ether"));
            } catch (error) {
                //console.error("Revert reason:", error.message);
                expect(error.message).to.include("ERC20InsufficientBalance");
            }

            // Owner balance shouldn't have changed.
            expect(await zoppel.balanceOf(owner.address)).to.equal(initialOwnerBalance);
        });

        it("Should update balances after transfers", async function () {
            const initialOwnerBalance = await zoppel.balanceOf(owner.address);

            // Transfer 100 tokens from owner to addr1.
            await zoppel.transfer(addr1.address, ethers.parseUnits("100","ether"));

            // Transfer another 50 tokens from owner to addr2.
            await zoppel.transfer(addr2.address, ethers.parseUnits("50","ether"));

            // Check balances.
            const finalOwnerBalance = await zoppel.balanceOf(owner.address);
            expect(finalOwnerBalance).to.equal(initialOwnerBalance - (ethers.parseUnits("150","ether")));

            const addr1Balance = await zoppel.balanceOf(addr1.address);
            expect(addr1Balance).to.equal(ethers.parseUnits("100","ether"));

            const addr2Balance = await zoppel.balanceOf(addr2.address);
            expect(addr2Balance).to.equal(ethers.parseUnits("50","ether"));
        });
    });
});
