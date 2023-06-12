import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class IsLoggedUserService {
  constructor() {}

  public isLoggedInUser: BehaviorSubject<string>  = new BehaviorSubject<string>('');

  public checkIfUserLoggedIn(): boolean {
    return this.isLoggedInUser.value.length > 0;
  }

  public getAccessToken(): void {
    this.isLoggedInUser.next(localStorage.getItem('userAccessToken') ?? '');
  }
}
