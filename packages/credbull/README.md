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

### Upload File to IPFS
Upload a file path to IPFS, see https://portal.thirdweb.com/cli/upload and https://www.youtube.com/watch?v=wyYkpMgEVxE

```bash
# first source the .env for the thirdweb secret
source .env

# upload a a file to IPFS, e.g.
yarn thirdweb upload -k $THIRDWEB_SECRET_KEY tests/ipfs/sample_1.csv

# verify file uploaded at https://ipfs.io/ipfs/<IPFS_URI>, e.g.:
curl https://ipfs.io/ipfs/QmVvzR7KqmXRKpEe62ooafhnknxSuZJ5YzgwoLpfaZzi4y
```

Create hash of the file for verification:
```bash
# option 1: using shasum, .e.g:
shasum -a 256 tests/ipfs/sample_1.csv

# option 1: using openssl, .e.g:
openssl dgst -sha256 tests/ipfs/sample_1.csv
```
