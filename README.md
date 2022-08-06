# standard-erc20

For deployed contract, refer [CONTRACT.md](CONTRACT.md)

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
npm run pretty

# init project
npm run clean && npm run init

# compile contract
npm run compile

# build contract
npm run build

# testing contract
npm run test

# deploy or upgrade contract, using truffle moudule
npm run deploy -- --network dev

# deploy contract with remix
npm run deploy:remix

# collect .sol file to verification
# don't forget to fill file references in config/contract-map.js
node script/verification.js
```
