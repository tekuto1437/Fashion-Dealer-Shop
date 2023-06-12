import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class PurchaseService {
  constructor(
    private readonly http: HttpClient
  ) {}

  private readonly superSecretLinkToBackend: string = 'http://localhost:4201';

  public makePurchase(purchaseData: any) {
    return this.http.post(`${this.superSecretLinkToBackend}/purchases/create`, purchaseData);
  }
}
