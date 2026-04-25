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
    this.onAddToCart.emit(product);
  }
}
