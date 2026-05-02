import { Component, computed, Inject, Signal, WritableSignal } from '@angular/core';
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
  productService: ProductService;

  listProductsCart: Signal<(IProduct & { quantity: number })[]>;

  total = computed(() => {
    return this.listProductsCart().reduce((acc, item) => acc + item.price * item.quantity, 0);
  });

  constructor(@Inject('ProvideProduct') productService: ProductService) {
    this.productService = productService;
    this.listProductsCart = this.productService.itemsInCart;
  }

  removeItem(productId: number) {
    this.productService.removeFromCart(productId);
  }
}
