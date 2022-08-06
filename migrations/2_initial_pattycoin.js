/* eslint-disable no-undef */
/* eslint-disable no-extend-native */

const _ = require('lodash')
const { faker } = require('@faker-js/faker')
const { web3 } = require('@openzeppelin/test-helpers/src/setup')
const { deployProxy } = require('@openzeppelin/truffle-upgrades')

const { toBN, toHex } = web3.utils
const toToken = (val, decimals = 18) => toBN(10).pow(toBN(decimals)).mul(toBN(val))
const toTokenHex = (val, decimals = 18) => toHex(toToken(val, decimals))

const PattyCoin = artifacts.require('PattyCoin')

module.exports = async function (deployer, network, accounts) {
  if (network === 'mocha') return

  let Name = _.deburr(_.words(faker.company.companyName()).join(' '))
  const Symbol = Name.split(' ')
    .map((el) => el[0])
    .join('')

  Name = _.startCase(_.toLower(Name)).replace(/\s/g, '')
  const initParameters = {
    'string memory name_': Name,
    'string memory symbol_': Symbol,
    'uint256 totalSupply_': toTokenHex(1000000, 18),
    'address owner_': accounts[0]
  }
  console.log('@ initializer params:', initParameters)
  await deployProxy(PattyCoin, Object.values(initParameters), { deployer })

  console.log('@ migration: PattyCoin proxy deployed.')
  console.log("@ migration verification: Don't forget to verify with run this command")
  console.log(`  npm run verify -- PattyCoin --network ${network} -D`)
}

/*
const { upgradeProxy } = require('@openzeppelin/truffle-upgrades')

const PattyCoin = artifacts.require('PattyCoin')
const PattyCoinV2 = artifacts.require('PattyCoinV2')

module.exports = async function (deployer, network, accounts) {
  const existing = await PattyCoin.deployed()

  // eslint-disable-next-line no-unused-vars
  const instance = await upgradeProxy(existing.address, PattyCoinV2, { deployer })

  console.log('@ migration: PattyCoin implementation upgraded to PattyCoinV2')
  console.log("@ migration verification: Don't forget to verify with run this command")
  console.log(`  npm run verify -- PattyCoinV2 --network ${network} -D`)
} 
*/
