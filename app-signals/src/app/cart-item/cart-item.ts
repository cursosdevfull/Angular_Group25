import { Component, Inject, input, output } from '@angular/core';
import { IProduct } from '../interfaces/product';
import { ProductService } from '../services/product';

@Component({
  selector: 'app-cart-item',
  imports: [],
  templateUrl: './cart-item.html',
  styleUrl: './cart-item.scss',
})
export class CartItem {
  item = input<IProduct & { quantity: number }>()
  onRemove = output<number>()

  //productService: ProductService

  /*   constructor(@Inject("ProvideProduct") productService: ProductService) {
      this.productService = productService;
    } */

  removeItem() {
    const it = this.item();
    if (it) {
      this.onRemove.emit(it.id);
    }
    /* const it = this.item();
    if (it) {
      console.log('Removing item from cart:', it);
      this.onRemove.emit(it.id);
      const prd = this.productService.listProducts.find(p => p.id === it.id);
      if (prd) {
        prd.stock += it.quantity;
      }

      console.log('Updated product stock:', prd);
      console.log("Current product list:", this.productService.listProducts);
    } */
  }
}
