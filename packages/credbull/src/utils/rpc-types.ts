export type Address = string;

export type TransactionHash = string;

export class Secret extends String {
  constructor(value: string) {
    super(value);
  }

  toString() {
    return '***';
  }

  toJSON() {
    return '***';
  }
}
