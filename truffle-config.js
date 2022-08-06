require("dotenv").config()

const HDWalletProvider = require("@truffle/hdwallet-provider")
const Account = require("./config/accounts")
const {
  // localhost, forking;
  DEV_RPC_PORT,

  // cloud, testnet
  TEST_CHAIN_ID,
  TEST_RPC_URL,

  // cloud, mainnet (acceptance of production)
  STAG_CHAIN_ID,
  STAG_RPC_URL,

  // cloud, mainnet
  PROD_CHAIN_ID,
  PROD_RPC_URL
} = process.env

const forkingNetwork = {
  network_id: "*",
  host: "127.0.0.1",
  port: DEV_RPC_PORT
}

const networks = {
  dev: forkingNetwork,
  mocha: forkingNetwork,
  test: {
    network_id: TEST_CHAIN_ID,
    provider: new HDWalletProvider({
      privateKeys: Account.test,
      providerOrUrl: TEST_RPC_URL,
      gas: 8500000, // Gas sent with each transaction (default: ~6700000)
      gasPrice: 21000000000, // 20 gwei (in wei) (default: 100 gwei)
    }),
  },
  stag: {
    network_id: STAG_CHAIN_ID,
    provider: new HDWalletProvider({
      privateKeys: Account.stag,
      providerOrUrl: STAG_RPC_URL,
      gas: 8500000, // Gas sent with each transaction (default: ~6700000)
      gasPrice: 21000000000, // 20 gwei (in wei) (default: 100 gwei)
    }),
  },
  prod: {
    network_id: PROD_CHAIN_ID,
    provider: new HDWalletProvider({
      privateKeys: Account.prod,
      providerOrUrl: PROD_RPC_URL
    }),
  },
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

const plugins = ["truffle-plugin-verify"]
const compilers = {
  solc: {
    version: "0.8.9",
    // parser: "solcjs",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
}

module.exports = {
  plugins,
  // db,
  networks,
  compilers,
  api_keys: {
    etherscan: process.env.API_KEY,
  },
}
