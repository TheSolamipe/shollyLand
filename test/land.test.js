const Land = artifacts.require("./contracts/Land");

require("chai").use(require("chai-as-promised")).should();

const EVM_REVERT = "VM Exception while processing transaction: revert";

contract("Land", ([owner1, owner2]) => {
  const NAME = "Sholly Land Buildings";
  const SYMBOL = "SHOLZ";
  const COST = web3.utils.toWei("1", "ether");

  let land, result;

  beforeEach(async () => {
    land = await Land.new(NAME, SYMBOL, COST);
  });

  describe("Deployment", () => {
    it("returns the contract name", async () => {
      result = await land.name();
      result.should.equal(NAME);
    });

    it("returns the symbol", async () => {
      result = await land.symbol();
      result.should.equal(SYMBOL);
    });

    it("returns the cost to mint", async () => {
      result = await land.cost();
      result.toString().should.equal(COST);
    });

    it("returns the max supply", async () => {
      result = await land.maxSupply();
      result.toString().should.equal("10");
    });

    it("returns the number of buildings/ Land available", async () => {
      result = await land.getBuildings();
      result.length.should.equal(10);
    });
  });

  describe("Minting", () => {
    describe("Success", () => {
      beforeEach(async () => {
        result = await land.mint(1, { from: owner1, value: COST });
      });

      it("Updates the owner address", async () => {
        result = await land.ownerOf(1);
        result.should.equal(owner1);
      });

      it("Updates building details", async () => {
        result = await land.getBuilding(1);
        result.owner.should.equal(owner1);
      });
    });

    describe("Failure", () => {
      it("Prevents mint with 0 value", async () => {
        await land
          .mint(1, { from: owner1, value: 0 })
          .should.be.rejectedWith(EVM_REVERT);
      });

      it("Prevents mint with invalid ID", async () => {
        result = await land
          .mint(100, { from: owner1, value: COST })
          .should.be.rejectedWith(EVM_REVERT);
      });

      it("Prevents minting if already owned", async () => {
        await land.mint(1, { from: owner1, value: COST });
        await land
          .mint(1, { from: owner2, value: COST })
          .should.be.rejectedWith(EVM_REVERT);
      });
    });
  });

  describe("Transfers", () => {
    describe("Success", () => {
      beforeEach(async () => {
        await land.mint(1, { from: owner1, value: COST });
        await land.approve(owner2, 1, { from: owner1 });
        await land.transferFrom(owner1, owner2, 1, { from: owner2 });
      });

      it("Updates the owner address", async () => {
        result = await land.ownerOf(1);
        result.should.equal(owner2);
      });

      it("Updates building details", async () => {
        result = await land.getBuilding(1);
        result.owner.should.equal(owner2);
      });
    });

    describe("Failure", () => {
      it("Prevents transfers without ownership", async () => {
        await land
          .transferFrom(owner1, owner2, 1, { from: owner2 })
          .should.be.rejectedWith(EVM_REVERT);
      });

      it("Prevents transfers without approval", async () => {
        await land.mint(1, { from: owner1, value: COST });
        await land
          .transferFrom(owner1, owner2, 1, { from: owner2 })
          .should.be.rejectedWith(EVM_REVERT);
      });
    });
  });
});
