/* eslint-disable no-undef */

const Migrations = artifacts.require('Migrations')

module.exports = async function (deployer, network, accounts) {
  if (network === 'mocha') return

  await deployer.deploy(Migrations)
  console.log('@ migration: Migrations deployed.')
  console.log("@ migration verification: Don't forget to verify with run this command")
  console.log(`  npm run verify -- Migrations --network ${network} -D`)
}
