import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { PriceConverterService } from 'src/services/UI-services/price-converter/price-converter.service';

@Component({
  selector: 'cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss']
})
export class CartItemComponent implements OnInit {
  constructor(
    public _priceConverter: PriceConverterService
  ) {}

  ngOnInit() {
    console.log(this.images)
  }

  public bucketURL: string = 'http://localhost:9000';

  @Input('id') public id!: number;

  @Input('title') public title!: string;

  @Input('description') public description!: string;

  @Input('price') public price!: number;

  @Input('properties') public properties!: any;

  @Input('counter') public counter!: number;

  @Input('images') public images!: any[];

  @Output('increaseCounter') increaseCounterEmitter = new EventEmitter<any>()

  @Output('decreaseCounter') decreaseCounterEmitter = new EventEmitter<any>()

  public increaseCounter() {
    this.increaseCounterEmitter.emit({ counter: this.counter + 1, id: this.id });
  }

  public decreaseCounter() {
    this.decreaseCounterEmitter.emit({ counter: this.counter - 1, id: this.id });
  }

}
