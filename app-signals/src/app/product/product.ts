import { Component, input, Input, output, Output } from '@angular/core';
import { IProduct } from '../interfaces/product';

@Component({
  selector: 'app-product',
  imports: [],
  templateUrl: './product.html',
  styleUrl: './product.scss',
})
export class Product {
  product = input<IProduct>()
  onAddToCart = output<IProduct>()

  addToCart(product: IProduct) {
    console.log('Adding to cart:', product);
    if(product.stock <= 0) {
      console.warn('Product is out of stock:', product);
      return;
    }
    this.onAddToCart.emit(product);
  }
}
