import { Component, input, output } from '@angular/core';
import { IProduct } from '../interfaces/product';

@Component({
  selector: 'app-cart-item',
  imports: [],
  templateUrl: './cart-item.html',
  styleUrl: './cart-item.scss',
})
export class CartItem {
  item = input<IProduct & {quantity: number}>()
  onRemove = output<number>()

  removeItem() {
    const it = this.item();
    if (it) {
      console.log('Removing item from cart:', it);
      this.onRemove.emit(it.id);
    }
  }
}
