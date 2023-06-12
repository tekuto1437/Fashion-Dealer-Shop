import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(
    private http: HttpClient,
  ) { }

  private readonly superSecretLinkToBackend: string = 'http://localhost:4201';

  signUp(email: string, password: string, username: string): Observable<any> {
    const requestBody = { email, password, username };
    return this.http.post(`${this.superSecretLinkToBackend}/auth/signup`, requestBody);
  }

  signIn(email: string, password: string): Observable<any> {
    const requestBody = { email, password };
    return this.http.post(`${this.superSecretLinkToBackend}/auth/signin`, requestBody);
  }

  logout() {}
}
