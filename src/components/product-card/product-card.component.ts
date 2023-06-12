import { Component, Input, OnInit } from '@angular/core';
import { IsLoggedUserService } from '../../services/UI-services/logged-user/logged-user.service';
import { CartService } from 'src/services/UI-services/cart/cart.service';
import { PriceConverterService } from 'src/services/UI-services/price-converter/price-converter.service';

@Component({
  selector: 'product-card',
  templateUrl: 'product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})

export class ProductCardComponent implements OnInit {
  constructor(
    private _isLoggedUserService: IsLoggedUserService,
    private _cartService: CartService,
    public _priceConverter: PriceConverterService
  ) { }

  public isLoggedInUser!: boolean;
  public bucketURL: string = 'http://localhost:9000';

  ngOnInit() {
   this._isLoggedUserService.isLoggedInUser.subscribe((value) => {
    this.isLoggedInUser = this._isLoggedUserService.checkIfUserLoggedIn();
   })
  }

  public addToCart(event: any) {
    const product = {
      id: this.id,
      title: this.title,
      description: this.description,
      price: this.price,
      category: this.category,
      size: this.size,
      totalCounter: this.totalCounter,
      images: this.images
    }

    this._cartService.addToCart(product)
  }

  @Input('id') public id!: number;

  @Input('title') public title!: string;

  @Input('description') public description!: string;

  @Input('price') public price!: number;

  @Input('category') public category!: string;

  @Input('size') public size!: string;

  @Input('totalCounter') public totalCounter!: number;

  @Input('images') public images!: any[];
}
