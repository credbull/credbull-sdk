# credbull-sdk

## Usage

### Test

`yarn test`

### Run

Run the LiquidStone Operational Scripts

```bash
yarn run-liquid-stone-ops
```

Run verbose mode, logging all deposit periods
```bash
yarn run-liquid-stone-ops --verbose
```

### Generate ThirdWeb Extensions

Generates typescript for a deployed contract, see: https://portal.thirdweb.com/typescript/v5/extensions/generate

```bash
# <chainid>/<contract-address>, e.g. for Arb Sepolia LiquidStone:
yarn thirdweb generate 421614/0x111b6a3dbace7f0b32baad47027907765e88abd2
```
