export async function toStr(amount: bigint | number, decimals: number = 1000000) {
  const scaledDown = Number(amount) / decimals;
  const decimalPlaces = Math.floor(Math.log10(decimals));
  const [integerPart, decimalPart] = scaledDown.toFixed(decimalPlaces).split('.');
  return `${Number(integerPart).toLocaleString()}.${decimalPart}`;
}

export async function toStrUSDC(assets: bigint | number): Promise<string> {
  return `${await toStr(assets)} USDC`;
}

export async function toStrShares(shares: bigint | number): Promise<string> {
  return `${await toStr(shares)} shrs`;
}

export function stringifyWithBigint(): (key: string, value: unknown) => string | number | null | undefined {
  return (key: string, value: unknown): string | number | null | undefined => {
    if (typeof value === 'bigint') {
      return value.toString(); // Convert BigInt to string
    }
    return value as string | number | null | undefined; // Explicitly allow other JSON-serializable types
  };
}
