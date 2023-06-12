import { Component, OnInit } from '@angular/core';
import { CartService } from "../../services/UI-services/cart/cart.service";
import { Router } from "@angular/router";
import { IsLoggedUserService } from 'src/services/UI-services/logged-user/logged-user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: 'navbar.component.html',
  styleUrls: ['navbar..component.scss']
})

export class NavbarComponent implements OnInit {
  constructor(
    private readonly _isLoggedInUser: IsLoggedUserService,
    public  readonly  _cartService: CartService,
    public readonly _router: Router,
  ) {}

  public isLoggedIn = this._isLoggedInUser.checkIfUserLoggedIn();

  ngOnInit() {
    this._router.events.subscribe(() => {
      this._isLoggedInUser.getAccessToken()
      this.isLoggedIn = this._isLoggedInUser.checkIfUserLoggedIn();
    })

    this._isLoggedInUser.isLoggedInUser.subscribe((value) => {
      this.isLoggedIn = this._isLoggedInUser.checkIfUserLoggedIn();
    })
  }

  public toggleCartVisibility() {
    this._cartService.toggleCartVisibility();
  }

  public moveToLoginPage() {
    this._router.navigateByUrl('login');
  }

  public moveToMainPage() {
    this._router.navigateByUrl('');
  }

  public logout() {
    localStorage.removeItem('userAccessToken');
    this._isLoggedInUser.getAccessToken();
    this._cartService.isCartShown = false;
  }
}
