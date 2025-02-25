import { Wallet } from 'ethers';

export type Address = string;
export type TransactionHash = string;

export class Secret extends String {
  constructor(value: string) {
    super(value);
  }

  toString(): string {
    return '***';
  }

  toJSON(): string {
    return '***';
  }

  toAddress(): string {
    return new Wallet(this.valueOf()).address;
  }
}
