const Land = artifacts.require("Land");

module.exports = async function (deployer) {
  const NAME = "Sholly Land Buildings";
  const SYMBOL = "SHOLZ";
  const COST = web3.utils.toWei("1", "ether");

  await deployer.deploy(Land, NAME, SYMBOL, COST);
};
