import { Component, Inject, WritableSignal } from '@angular/core';
import { CartItem } from '../cart-item/cart-item';
import { IProduct } from '../interfaces/product';
import { ProductService } from '../services/product';

@Component({
  selector: 'app-cart',
  imports: [CartItem],
  templateUrl: './cart.html',
  styleUrl: './cart.scss',
})
export class Cart {
/*   cart = input.required<(IProduct & {quantity: number})[]>()
  onRemove = output<number>()

  removeItem(productId: number) {
    this.onRemove.emit(productId);
  } */

  productService: ProductService

  cart: WritableSignal<(IProduct & {quantity: number})[]>;

  constructor(@Inject("ProvideProduct") productService: ProductService) {
    this.productService = productService;
    this.cart = this.productService.cart;
  }

  removeItem(productId: number) {
    this.productService.removeFromCart(productId);
  }
}
