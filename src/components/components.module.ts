import { NgModule } from '@angular/core';
import { NavbarComponent } from './navbar/navbar.component';
import { MenuComponent } from './menu/menu.component';
import { GridListComponent } from './grid-list/grid-list.component';
import { MaterialModule } from '../material/material.module';
import { CartComponent } from './cart/cart.component';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ProductCardComponent } from './product-card/product-card.component';
import { CartItemComponent } from './cart-item/cart-item.component';

@NgModule({
  imports: [MaterialModule, CommonModule],
  declarations: [
    NavbarComponent,
    MenuComponent,
    GridListComponent,
    CartComponent,
    ProductCardComponent,
    CartItemComponent
  ],
  exports: [MaterialModule, NavbarComponent, CartComponent, CommonModule],
  providers: [HttpClient],
})
export class ComponentsModule {}
