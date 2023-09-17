export interface CurrencyName {
  shortHand: string;
  name: string;
}

export interface ConvertPayload {
  // from & to must be the shorthand key of currencyName.
  from: string;
  to: string;
  value: string;
}

export interface Rate {
  currency: string;
  rate: number;
}

export interface LatestInfo {
  base: string;
  rates: Rate[];
}
