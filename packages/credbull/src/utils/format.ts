export async function toStr(amount: bigint | number, decimals: number = 1000000) {
  const scaledDown = Number(amount) / decimals;
  const decimalPlaces = Math.floor(Math.log10(decimals));
  const [integerPart, decimalPart] = scaledDown.toFixed(decimalPlaces).split('.');
  return `${Number(integerPart).toLocaleString()}.${decimalPart}`;
}

export async function toStrUSDC(assets: bigint | number) {
  return `${await toStr(assets)} USDC`;
}

export async function toStrShares(shares: bigint | number) {
  return `${await toStr(shares)} shrs`;
}
