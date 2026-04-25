import { Component, input, output } from '@angular/core';
import { IProduct } from '../interfaces/product';
import { CartItem } from '../cart-item/cart-item';

@Component({
  selector: 'app-cart',
  imports: [CartItem],
  templateUrl: './cart.html',
  styleUrl: './cart.scss',
})
export class Cart {
  cart = input.required<(IProduct & {quantity: number})[]>()
  onRemove = output<number>()

  removeItem(productId: number) {
    this.onRemove.emit(productId);
  }
}
