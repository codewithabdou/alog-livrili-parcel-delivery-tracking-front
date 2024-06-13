const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const ParcelModule = buildModule("ParcelModule", (m) => {
  const parcel = m.contract("Parcel");

  return {
    parcel,
  };
});

module.exports = ParcelModule;
