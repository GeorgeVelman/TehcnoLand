import { commerce } from "../src/lib/commerce";

export default class ProductService {
  static async fetchProducts() {
    const { data } = await commerce.products.list();
    return data;
  }

  static async fetchCart() {
    return await commerce.cart.retrieve();
  }

  static async handleAddToCart(productId, quantity) {
    const { cart } = await commerce.cart.add(productId, quantity);
    return cart;
  }

  static async handleUpdateCartQuantity(productId, quantity) {
    const { cart } = await commerce.cart.update(productId, { quantity });
    return cart;
  }

  static async handleRemoveFromCart(productId) {
    const { cart } = await commerce.cart.remove(productId);
    return cart;
  }

  static async handleEmptyCart() {
    const { cart } = await commerce.cart.empty();
    return cart;
  }
}
