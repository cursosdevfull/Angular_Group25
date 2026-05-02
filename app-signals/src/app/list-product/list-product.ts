import { Component, Inject, output } from '@angular/core';
import { IProduct } from '../interfaces/product';
import { Product } from '../product/product';
import { ProductService } from '../services/product';

@Component({
  selector: 'app-list-product',
  imports: [Product],
  templateUrl: './list-product.html',
  styleUrl: './list-product.scss',
})
export class ListProduct {
  //onAddToCart = output<IProduct>()

  productService: ProductService
  
  public listProducts: IProduct[]

  constructor(@Inject("ProvideProduct") productService: ProductService) {
    this.productService = productService;
    this.listProducts = this.productService.listProducts();
    this.listProducts.forEach(p => p.stock = 0)
  }


  public addToCart(product: IProduct) {
    this.productService.addToCart(product);
    //this.productService.reduceStock(product.id);
   /*  console.log('Product added to cart:', product);
    this.onAddToCart.emit(product);
    const prd = this.productService.listProducts.find(p => p.id === product.id);
    if (prd) {
      prd.stock -= 1;
    } */
  }
}
