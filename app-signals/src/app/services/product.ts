import { signal } from '@angular/core';
import { IProduct } from '../interfaces/product';

export class ProductService {
  private $listProducts = signal<IProduct[]>([
    { id: 1, name: 'Apple - iPhone 15 128GB (Unlocked)', price: 799, stock: 2 },
    { id: 2, name: 'Samsung - Galaxy S24 128GB (Unlocked)', price: 799, stock: 2 },
    { id: 3, name: 'Google - Pixel 8 128GB (Unlocked)', price: 699, stock: 2 },
    { id: 4, name: 'Apple - MacBook Air 13-inch M3 8GB 256GB SSD', price: 1099, stock: 2 },
    {
      id: 5,
      name: 'Dell - XPS 13 13.4-inch FHD+ Laptop - Intel Core Ultra 7',
      price: 1299,
      stock: 2,
    },
    {
      id: 6,
      name: 'HP - Envy 16 16-inch Laptop - Intel Core i7 - 16GB - 1TB SSD',
      price: 1199,
      stock: 2,
    },
    { id: 7, name: 'Lenovo - Yoga 7i 14-inch 2-in-1 Laptop - Intel Core i5', price: 849, stock: 2 },
    {
      id: 8,
      name: 'ASUS - ROG Zephyrus G14 14-inch Gaming Laptop - Ryzen 9 - RTX 4060',
      price: 1599,
      stock: 2,
    },
    { id: 9, name: 'Apple - iPad Air 11-inch M2 Wi-Fi 128GB', price: 599, stock: 2 },
    { id: 10, name: 'Samsung - Galaxy Tab S9 11-inch 128GB', price: 799, stock: 2 },
    { id: 11, name: 'Amazon - Fire HD 10 Tablet 32GB', price: 139, stock: 2 },
    { id: 12, name: 'Sony - PlayStation 5 Console (Slim)', price: 499, stock: 2 },
    { id: 13, name: 'Microsoft - Xbox Series X 1TB Console', price: 499, stock: 2 },
    { id: 14, name: 'Nintendo - Switch OLED Model', price: 349, stock: 2 },
    { id: 15, name: 'Meta - Quest 3 128GB VR Headset', price: 499, stock: 2 },
    { id: 16, name: 'LG - 65-inch C4 Series OLED 4K UHD Smart webOS TV', price: 1799, stock: 2 },
    { id: 17, name: 'Samsung - 55-inch S90D OLED 4K Smart TV', price: 1599, stock: 2 },
    { id: 18, name: 'Sony - 65-inch BRAVIA 8 OLED 4K HDR Google TV', price: 1999, stock: 2 },
    { id: 19, name: 'TCL - 65-inch Q7 QLED 4K Smart Google TV', price: 749, stock: 2 },
    { id: 20, name: 'Hisense - 55-inch U7 Series Mini-LED 4K TV', price: 699, stock: 2 },
    {
      id: 21,
      name: 'Bose - QuietComfort Ultra Wireless Noise Cancelling Headphones',
      price: 429,
      stock: 2,
    },
    {
      id: 22,
      name: 'Sony - WH-1000XM5 Wireless Noise Cancelling Headphones',
      price: 399,
      stock: 2,
    },
    {
      id: 23,
      name: 'Apple - AirPods Pro 2nd generation with MagSafe Case (USB-C)',
      price: 249,
      stock: 2,
    },
    { id: 24, name: 'JBL - Charge 5 Portable Bluetooth Speaker', price: 179, stock: 2 },
    { id: 25, name: 'Sonos - Era 100 Smart Speaker', price: 249, stock: 2 },
    { id: 26, name: 'Apple - Watch Series 10 GPS 42mm Aluminum Case', price: 399, stock: 2 },
    { id: 27, name: 'Samsung - Galaxy Watch7 44mm BT', price: 329, stock: 2 },
    { id: 28, name: 'Fitbit - Charge 6 Fitness Tracker', price: 159, stock: 2 },
    { id: 29, name: 'Garmin - Forerunner 265 GPS Running Smartwatch', price: 449, stock: 2 },
    { id: 30, name: 'Ring - Video Doorbell Pro 2', price: 249, stock: 2 },
    { id: 31, name: 'Google - Nest Doorbell (Battery)', price: 179, stock: 2 },
    { id: 32, name: 'Arlo - Pro 5S 2K Spotlight Camera (2-Pack)', price: 399, stock: 2 },
    {
      id: 33,
      name: 'Blink - Outdoor 4 Wireless Security Camera System (3-Camera)',
      price: 249,
      stock: 2,
    },
    { id: 34, name: 'TP-Link - Kasa Smart Wi-Fi Plug Mini (2-Pack)', price: 24, stock: 2 },
    { id: 35, name: 'Dyson - V15 Detect Extra Cordless Vacuum', price: 749, stock: 2 },
    { id: 36, name: 'iRobot - Roomba Combo j9+ Robot Vacuum and Mop', price: 999, stock: 2 },
    { id: 37, name: 'Ninja - Foodi 10-qt 6-in-1 DualZone Air Fryer', price: 199, stock: 2 },
    { id: 38, name: 'Keurig - K-Supreme Plus Single Serve Coffee Maker', price: 189, stock: 2 },
    {
      id: 39,
      name: 'Instant Pot - Duo Plus 9-in-1 Electric Pressure Cooker 6-Qt',
      price: 129,
      stock: 2,
    },
    {
      id: 40,
      name: 'KitchenAid - Artisan Series 5-Quart Tilt-Head Stand Mixer',
      price: 449,
      stock: 2,
    },
    {
      id: 41,
      name: 'Canon - EOS R50 Mirrorless Camera with RF-S 18-45mm Lens',
      price: 799,
      stock: 2,
    },
    {
      id: 42,
      name: 'Sony - Alpha a6700 Mirrorless Camera with 16-50mm Lens',
      price: 1499,
      stock: 2,
    },
    { id: 43, name: 'GoPro - HERO13 Black Action Camera', price: 399, stock: 2 },
    { id: 44, name: 'DJI - Mini 4 Pro Drone with RC 2', price: 959, stock: 2 },
    { id: 45, name: 'SanDisk - Extreme Portable SSD 1TB', price: 109, stock: 2 },
    { id: 46, name: 'WD - My Passport 2TB External USB-C Hard Drive', price: 79, stock: 2 },
    { id: 47, name: 'Logitech - MX Master 3S Wireless Performance Mouse', price: 99, stock: 2 },
    {
      id: 48,
      name: 'Razer - Huntsman V3 Pro TKL Wired Optical Gaming Keyboard',
      price: 219,
      stock: 2,
    },
    { id: 49, name: 'Anker - 737 Power Bank 24,000mAh 140W', price: 149, stock: 2 },
    {
      id: 50,
      name: 'Belkin - BoostCharge Pro 3-in-1 Wireless Charging Stand',
      price: 149,
      stock: 2,
    },
  ]);
  private $itemsInCart = signal<(IProduct & { quantity: number })[]>([]);

  public listProducts = this.$listProducts.asReadonly();
  public itemsInCart = this.$itemsInCart.asReadonly();

  private reduceStock(productId: number) {
    const product = this.listProducts().find((p) => p.id === productId);
    if (product && product.stock > 0) {
      product.stock -= 1;

      const products = this.listProducts();
      const index = products.findIndex((p) => p.id === productId);
      if (index !== -1) {
        this.$listProducts.update((prev) => {
          const updatedProducts = [...prev];
          updatedProducts[index] = { ...updatedProducts[index], stock: product.stock };
          return updatedProducts;
        });
      }
    }
  }

  public addToCart(product: IProduct) {
    const existingProduct = this.itemsInCart().find((item) => item.id === product.id);
    if (existingProduct) {
      this.$itemsInCart.update((prev) =>
        prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
        ),
      );
    } else {
      this.$itemsInCart.update((prev) => [...prev, { ...product, quantity: 1 }]);
    }

    this.reduceStock(product.id);
  }

  public removeFromCart(productId: number) {
    const productInCart = this.itemsInCart().find((item) => item.id === productId);
    if (productInCart) {
      this.$itemsInCart.update((prev) => prev.filter((item) => item.id !== productId));
      const product = this.listProducts().find((p) => p.id === productId);
      if (product) {
        product.stock += productInCart.quantity;
        const products = this.listProducts();
        const index = products.findIndex((p) => p.id === productId);
        if (index !== -1) {
          this.$listProducts.update((prev) => {
            const updatedProducts = [...prev];
            updatedProducts[index] = { ...updatedProducts[index], stock: product.stock };
            return updatedProducts;
          });
        }
      }
    }
  }
}
