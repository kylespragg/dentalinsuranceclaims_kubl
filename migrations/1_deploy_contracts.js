const DentalInsuranceVerifier = artifacts.require("DentalInsuranceVerifier");

module.exports = function(deployer) {
  deployer.deploy(DentalInsuranceVerifier);
};
