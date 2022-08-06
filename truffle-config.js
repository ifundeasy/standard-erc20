require('dotenv').config()

const HDWalletProvider = require('@truffle/hdwallet-provider')
const Account = require('./config/accounts')
const {
  // localhost, forking;
  LOCAL_RPC_PORT,

  // cloud, testnet
  TESTNET_CHAIN_ID,
  TESTNET_RPC_URL,

  // cloud, mainnet
  MAINNET_CHAIN_ID,
  MAINNET_RPC_URL
} = process.env

const forkingNetwork = {
  network_id: '*',
  host: '127.0.0.1',
  port: LOCAL_RPC_PORT
}

const networks = {
  local: forkingNetwork,
  mocha: forkingNetwork,
  test: {
    network_id: TESTNET_CHAIN_ID,
    provider: new HDWalletProvider({
      privateKeys: Account.test,
      providerOrUrl: TESTNET_RPC_URL
    })
  },
  stag: {
    network_id: MAINNET_CHAIN_ID,
    provider: new HDWalletProvider({
      // gas: 8500000, // Gas sent with each transaction (default: ~6700000)
      // gasPrice: 21000000000, // 20 gwei (in wei) (default: 100 gwei)
      privateKeys: Account.stag,
      providerOrUrl: MAINNET_RPC_URL
    })
  },
  prod: {
    network_id: MAINNET_CHAIN_ID,
    provider: new HDWalletProvider({
      privateKeys: Account.prod,
      providerOrUrl: MAINNET_RPC_URL
    })
  }
}

/*
const db = {
  enabled: false,
  host: "127.0.0.1",
  adapter: {
    name: "sqlite",
    settings: {
      directory: ".db",
    },
  },
};
*/

const plugins = ['truffle-plugin-verify']
const compilers = {
  solc: {
    version: '0.8.9',
    // parser: "solcjs",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
}

module.exports = {
  plugins,
  // db,
  networks,
  compilers,
  api_keys: {
    etherscan: process.env.API_KEY
  }
}
