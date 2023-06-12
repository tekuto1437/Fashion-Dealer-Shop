import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/API-services/products/products.service';
import { lastValueFrom } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-grid-list',
  templateUrl: 'grid-list.component.html',
  styleUrls: ['grid-list.component.scss']
})

export class GridListComponent implements OnInit {
  constructor(
    private _productService: ProductsService,
    private _router: Router
  ) {}

  async ngOnInit() {
    this.currentPage = await lastValueFrom(this._productService.findPage('0', '12'));
    this.productList = this.currentPage.page;
    this.totalProductsCount = this.currentPage.totalProductsCount
  }

  public bucketURL: string = 'http://localhost:9001/browser/fashion-dealer-images';

  private currentPage: any = {};
  public totalProductsCount: number = 0;
  public productList: any[] = [];
  public perPage: number = 12;

  public async changePage(event: any) {
    const newPage = await lastValueFrom(this._productService.findPage(event.pageIndex.toString(), event.pageSize.toString())) as any;
    this.perPage = event.pageSize;
    this.productList = newPage.page;
    this.totalProductsCount = newPage.totalProductsCount;
  }

}
