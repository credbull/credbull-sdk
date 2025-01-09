# credbull-sdk

## Setup
### Install Pre-requisite Tools
- NodeJS LTS (v20) ([install node.js](https://nodejs.org/en/learn/getting-started/how-to-install-nodejs))
- Yarn ([install yarn](https://v3.yarnpkg.com/getting-started/install))
- ThirdWeb Account ([thirdweb -> get started](https://thirdweb.com/))

### Setup Environment
```bash
cp -n .env.sample .env
# Manually edit the .env with your own thirdweb and wallet settings
```

## Run and Test

### Install dependencies
`yarn install`

### Run
Run the LiquidStone Operational Scripts (optional --verbose flag)
```bash
yarn run-liquid-stone-ops --verbose
```

### Integration Test
`yarn test`


## Developers

### Add Contract Typescript
Generates typescript for a deployed smart contract, see: https://portal.thirdweb.com/typescript/v5/extensions/generate
```bash
# <chainid>/<contract-address>, e.g. for Arb Sepolia LiquidStone:
yarn thirdweb generate 421614/0x111b6a3dbace7f0b32baad47027907765e88abd2
```
