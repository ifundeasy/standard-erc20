/* eslint-disable no-undef */
/* eslint-disable no-extend-native */

const { web3 } = require('@openzeppelin/test-helpers/src/setup')
const { deployProxy } = require('@openzeppelin/truffle-upgrades')

const { toBN, toHex } = web3.utils
const toToken = (val, decimals = 16) => toBN(10).pow(toBN(decimals)).mul(toBN(val))
const toTokenHex = (val, decimals = 16) => toHex(toToken(val, decimals))

const ERC20 = artifacts.require('ERC20Upgradeable')

module.exports = async function (deployer, network, accounts) {
  if (network === 'mocha') return

  const initParameters = {
    'string memory name_': 'MyTokenA',
    'string memory symbol_': 'MTA',
    'uint256 totalSupply_': toTokenHex(1000000)
  }
  console.log('@ initializer params:', initParameters)
  await deployProxy(ERC20, Object.values(initParameters), { deployer })

  console.log('@ migration: ERC20 proxy deployed.')
  console.log("@ migration verification: Don't forget to verify with run this command")
  console.log(`  npm run verify -- ERC20 --network ${network} -D`)
}

/*
const { upgradeProxy } = require('@openzeppelin/truffle-upgrades')

const ERC20 = artifacts.require('ERC20Upgradeable')
const ERC20V2 = artifacts.require('ERC20UpgradeableV2')

module.exports = async function (deployer, network, accounts) {
  const existing = await ERC20.deployed()

  // eslint-disable-next-line no-unused-vars
  const instance = await upgradeProxy(existing.address, ERC20V2, { deployer })

  console.log('@ migration: ERC20 implementation upgraded to ERC20V2')
  console.log("@ migration verification: Don't forget to verify with run this command")
  console.log(`  npm run verify -- ERC20V2 --network ${network} -D`)
} 
*/
