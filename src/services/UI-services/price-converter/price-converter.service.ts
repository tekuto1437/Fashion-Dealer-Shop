import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class PriceConverterService {
  constructor() {}

  fromCentsToDollars(cents: number): string {
    return (cents / 100).toFixed(2);
  }
}
