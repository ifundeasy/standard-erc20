/* eslint-disable no-undef */
/* eslint-disable no-extend-native */

const { web3 } = require('@openzeppelin/test-helpers/src/setup')
const { toBN, toHex } = web3.utils
const toToken = (val, decimals = 16) => toBN(10).pow(toBN(decimals)).mul(toBN(val))
const toTokenHex = (val, decimals = 16) => toHex(toToken(val, decimals))

const ERC20 = artifacts.require('ERC20Upgradeable')

module.exports = async function (deployer, network, accounts) {
  if (network === 'mocha') return

  const instance = await ERC20.deployed()
  const tokenParameters = {
    'address recipient': accounts[1],
    'uint256 amount': toTokenHex(1000, 16)
  }
  console.log('@ setToken params:', tokenParameters)
  await instance.setToken(...Object.values(tokenParameters), { from: accounts[0] })

  console.log('@ migration: ERC20 post script deployed.')
}
