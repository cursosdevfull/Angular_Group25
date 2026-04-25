import { Component, computed, effect, linkedSignal, signal } from '@angular/core';
import { ListProduct } from './list-product/list-product';
import { Cart } from './cart/cart';
import { IProduct } from './interfaces/product';

@Component({
  selector: 'app-root',
  imports: [ListProduct, Cart],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  cart = signal<(IProduct & {quantity: number})[]>([]);
/*   operator1 = signal(30)
  operator2 = signal(50)

  sum = computed(() => this.operator1() + this.operator2())

  linkedSum = linkedSignal(() => this.operator1() + this.operator2())

  constructor() {
    effect(() => {
      console.log('Sum has changed:', this.sum())
    })
  } */

    addToCart(product: IProduct) {
      const existingProduct = this.cart().find(item => item.id === product.id);
      if (existingProduct) {
        this.cart.update(prev =>
          prev.map(item =>
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
          )
        );
      } else {
        this.cart.update(prev => [...prev, { ...product, quantity: 1 }]);
      }
    }

    removeItemCart(productId: number) {
      this.cart.update(prev => prev.filter(item => item.id !== productId));
    }
}
