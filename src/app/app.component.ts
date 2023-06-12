import { Component } from '@angular/core';
import {CartService} from "../services/UI-services/cart/cart.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public _cartService: CartService) {}
}
