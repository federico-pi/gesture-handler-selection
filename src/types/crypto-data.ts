export interface CurrentCryptoData {
  bpi: Bpi;
  chartName: string;
  disclaimer: string;
  time: Time;
}

export interface Bpi {
  EUR: CurrencyObject;
  GBP: CurrencyObject;
  USD: CurrencyObject;
}

export interface CurrencyObject {
  code: CurrencyCode;
  description: string;
  rate: string;
  rate_float: number;
  symbol: CurrencySymbol;
}

export interface Time {
  updated: string;
  updatedISO: string;
  updateduk: string;
}

export type CurrencySymbol = '&euro;' | '&pound;' | '&#36;';

export type CurrencyCode = keyof Bpi;
