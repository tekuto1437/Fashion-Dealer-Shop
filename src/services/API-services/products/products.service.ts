import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductsService {
  constructor(
    private http: HttpClient
  ) {}

  private readonly superSecretLinkToBackend: string = 'http://localhost:4201';

  public findPage(page: string, perPage: string): Observable<object> {
    return this.http.get(`${this.superSecretLinkToBackend}/products/find-page?page=${page}&perPage=${perPage}`);
  }
}
