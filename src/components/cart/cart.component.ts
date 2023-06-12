import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/services/UI-services/cart/cart.service';
import { PriceConverterService } from 'src/services/UI-services/price-converter/price-converter.service';

@Component({
  selector: 'app-cart',
  templateUrl: 'cart.component.html',
  styleUrls: ['cart.component.scss']
})

export class CartComponent implements OnInit {
  constructor(
    private _cartService: CartService,
    public _priceConverter: PriceConverterService
  ) {}

  public cartList: any[] = []
  public totalCartPrice!: number;

  ngOnInit() {
    this._cartService.cartProductTotalPrice.subscribe((price) => {
      this.totalCartPrice = price;
    })
    this._cartService.cartProducts.subscribe((cartList) => {
      this.cartList = cartList;
    })
    this._cartService.calculateTotalCartPrice();
  }

  increaseCounter(newCounter: any) {
    const { counter, id } = newCounter;
    let changedProduct = this.cartList.find((product) => product.id === id);
    changedProduct.counter = counter;
    this._cartService.calculateTotalCartPrice();
  }

  decreaseCounter(newCounter: any) {
    const { counter, id } = newCounter;
    let changedProduct = this.cartList.find((product) => product.id === id);
    changedProduct.counter = counter;
    if(changedProduct.counter === 0) {
      this.cartList =this.cartList.filter((product) => product.counter > 0);
      this._cartService.cartProducts.next(this.cartList.filter((product) => product.counter > 0));
    }
    this._cartService.calculateTotalCartPrice();
  }

  public makePurchase() {
    this._cartService.makePurchase()
    this._cartService.cartProductTotalPrice.next(0);
    this._cartService.cartProducts.next([]);
  }
}
