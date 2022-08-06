# standard-erc20

For deployed contract, refer [Logs](logs)

## Installation

```sh
# module installation
npm install

# environment variables, rpc urls, api keys, etc.
cp .env.example .env
vi .env # edit as you need

# wallet accounts by private key, deployment needs
cp config/accounts.example.js config/accounts.js
vi config/accounts.js # edit as you need
```

## Script runner

```sh
# reformat code
npm run lint:fix

# clean project
npm run clean

# build contract
npm run build

# compile project
npm run compile

# testing contract
npm run test -- --network 'mocha'

# deploy or upgrade contract, using truffle moudule
npm run deploy -- --network 'local'

# collect .sol file to verification
# don't forget to fill file references in config/contract-map.js
npm run verify -- ContractA OtherContract --network 'test'
```
