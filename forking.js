require('dotenv').config()
const { LOCAL_RPC_PORT, MAINNET_RPC_URL, MAINNET_BLOCK_NUM } = process.env

const ganache = require('ganache')
// const { toBN } = require('web3').utils
const Account = require('./config/accounts.js')

const accounts = Account.test.map((account) => {
  return { secretKey: '0x' + account, balance: 10000000000000000000000 }
})
const option = {
  fork: {
    url: MAINNET_RPC_URL,
    blockNumber: parseInt(MAINNET_BLOCK_NUM)
  },
  port: parseInt(LOCAL_RPC_PORT),
  accounts,
  debug: true
}
const server = ganache.server(option)
server.listen(option.port, async (err) => {
  if (err) throw err

  console.log(`Ganache listening on port ${option.port}...`)
  const provider = server.provider
  const accounts = await provider.request({ method: 'eth_accounts', params: [] })
  console.log(accounts)
})
