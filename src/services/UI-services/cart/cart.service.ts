import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { PurchaseService } from 'src/services/API-services/purchase/purchase.service';

@Injectable({
  providedIn: "root"
})
export class CartService {

  constructor(
    private _purchaseService: PurchaseService
  ) {}

  public isCartShown: boolean = false;
  public cartProducts: BehaviorSubject<any> = new BehaviorSubject([]);
  public cartProductTotalPrice: BehaviorSubject<number> = new BehaviorSubject(0);

  public toggleCartVisibility() {
    this.isCartShown = !this.isCartShown;
  }

  public addToCart(product: any) {
    let productAlreadyInCart = this.cartProducts.value.find((cartProduct: any) => cartProduct.id === product.id);
    if(productAlreadyInCart) {
      productAlreadyInCart.counter++
      this.cartProducts.next([...this.cartProducts.value]);
      return;
    }

    const newCartProduct = {
      ...product,
      counter: 1
    }

    this.cartProducts.next([...this.cartProducts.value, newCartProduct]);
    this.cartProductTotalPrice.next(this.cartProducts.value.map((product: any) => product.counter * product.price));
  }

  public calculateTotalCartPrice() {
    this.cartProductTotalPrice.next(
      this.cartProducts.value.reduce(
        (product: number, nextProduct: any) => product + (nextProduct.counter * nextProduct.price),
        0
      )
    );
  }

  public makePurchase() {
    const purchaseData = {
      totalCost: this.cartProductTotalPrice.value,
      products: {
        list: this.cartProducts.value
      },
      userEmail: localStorage.getItem('userEmailForBackend') ?? ''
    }
    this._purchaseService.makePurchase(purchaseData)
      .pipe(
        tap(() => this.clearCart())
      )
      .subscribe();
  }

  public clearCart() {
    this.cartProductTotalPrice.next(0);
    this.cartProducts.next([]);
  }
}
