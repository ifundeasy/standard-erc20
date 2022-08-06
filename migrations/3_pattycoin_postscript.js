/* eslint-disable no-undef */
/* eslint-disable no-extend-native */

const { web3 } = require('@openzeppelin/test-helpers/src/setup')
const { toBN, toHex } = web3.utils
const toToken = (val, decimals = 16) => toBN(10).pow(toBN(decimals)).mul(toBN(val))
const toTokenHex = (val, decimals = 16) => toHex(toToken(val, decimals))

const PattyCoin = artifacts.require('PattyCoin')

module.exports = async function (deployer, network, accounts) {
  if (network === 'mocha') return

  const instance = await PattyCoin.deployed()
  const tokenParameters = {
    'address recipient': accounts[1],
    'uint256 amount': toTokenHex(1000, 18)
  }
  console.log('@ transfer params:', tokenParameters)

  console.log(`@ balance before ${accounts[0]}:`, (await instance.balanceOf(accounts[0])).toString())
  console.log(`@ balance before ${accounts[1]}:`, (await instance.balanceOf(accounts[1])).toString())
  await instance.transfer(...Object.values(tokenParameters, { from: accounts[0] }))
  console.log(`@ balance after  ${accounts[0]}:`, (await instance.balanceOf(accounts[0])).toString())
  console.log(`@ balance after  ${accounts[1]}:`, (await instance.balanceOf(accounts[1])).toString())

  console.log('@ migration: PattyCoin post script deployed.')
}
