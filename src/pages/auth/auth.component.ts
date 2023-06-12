import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/API-services/auth/auth.service';
import { catchError, lastValueFrom, map, tap } from 'rxjs';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'auth-page',
  templateUrl: 'auth.component.html',
  styleUrls: ['auth.component.scss'],
})
export class AuthPageComponent implements OnInit {
  constructor(
    private _authService: AuthService,
    private readonly _router: Router
  ) {}
  ngOnInit() {}

  public email = new FormControl('', [
    Validators.required,
    Validators.email,
    Validators.max(20),
    Validators.min(5),
  ]);

  public password = new FormControl('', [
    Validators.required,
    Validators.pattern(
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{4,25}$/
    ),
    Validators.max(20),
    Validators.min(5),
  ]);

  public loginEmail: string = '';
  public loginPassword: string = '';
  public registerEmail: string = '';
  public registerPassword: string = '';
  public registerUsername: string = '';

  //If user wants to log in value should be true, otherwise he wants to register
  public isUserWantToLogIn: boolean = true;

  public showErrorMessage(): string {
    if (this.email.hasError('required')) return 'Email cannot be empty';

    if (this.email.hasError('email')) return 'Invalid email';

    if (this.email.hasError('max')) return 'Too long email address';

    if (this.email.hasError('min')) return 'Too short email address';

    return 'Something is wrong';
  }

  public showPasswordErrorMessage(): string {
    if (this.password.hasError('required')) return 'Password cannot be empty';

    if (this.password.hasError('pattern'))
      return 'Password must contain 1 digit, 1 symbol and 1 Upper & lower case character';

    if (this.password.hasError('max')) return 'Maximum password length is 20';

    if (this.password.hasError('min')) return 'At least must be a 5 characters';

    return 'Something is wrong with password';
  }

  public toggleUserForm() {
    if (this.isUserWantToLogIn) {
      this.registerEmail = '';
      this.registerPassword = '';
      this.registerUsername = '';
    } else {
      this.loginEmail = '';
      this.loginPassword = '';
    }
    this.isUserWantToLogIn = !this.isUserWantToLogIn;
  }

  public async signIn(event: any): Promise<void> {
    if (!this.loginEmail || !this.loginPassword) return;

    this._authService
      .signIn(this.loginEmail, this.loginPassword)
      .pipe(
        map(({ accessToken }) => accessToken),
        tap((accessToken) => {
          if (!accessToken) return;
          localStorage.setItem('userEmailForBackend', this.loginEmail);
          localStorage.setItem('userAccessToken', accessToken);
          this._router.navigateByUrl('/');
        }),
        catchError((error) => {
          throw error;
        })
      )
      .subscribe();
  }

  public async signUp(event: any): Promise<void> {
    if (!this.registerEmail || !this.registerPassword || !this.registerUsername)
      return;

    this._authService
      .signUp(this.registerEmail, this.registerPassword, this.registerUsername)
      .pipe(
        map(({ accessToken }) => accessToken),
        tap((accessToken) => {
          if (!accessToken) return;
          localStorage.setItem('userEmailForBackend', this.registerEmail);
          localStorage.setItem('userAccessToken', accessToken);
          this._router.navigateByUrl('/');
        }),
        catchError((error) => {
          throw error;
        })
      )
      .subscribe();
  }
}
