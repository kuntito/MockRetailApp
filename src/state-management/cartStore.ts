import { create } from "zustand";
import type { CartItem } from "../models/CartItem";
import type { ActionResult } from "../types/ActionResult";
import { clearCartStorage, loadCartFromStorage, saveCartToStorage } from "../utils/cartStorage";
import { getUniqueId } from "../utils/getUniqueId";

export type Cart = Map<string, CartItem>;

interface CartStore {
    cart: Cart;
    addToCart: (
        productId: string,
        productName: string,
        unitPrice: number,
        quantity: number
    ) => ActionResult;
    modifyQuantity: (
        productId: string,
        newQuantity: number
    ) => ActionResult;
    removeFromCart: (productId: string) => ActionResult;
    clearCart: () => ActionResult;
}

const useCartStore = create<CartStore>((set, get) => {
    const cart: Cart = loadCartFromStorage();

    const addToCart = (
        productId: string,
        productName: string,
        unitPrice: number,
        quantity: number
    ): ActionResult => {
        const currentCart = get().cart;
        if (currentCart.has(productId)) {
            return {
                success: false,
                message: "product already exists in cart",
            };
        }

        const cartItem: CartItem = {
            id: getUniqueId(),
            productId: productId,
            productName: productName,
            unitPrice: unitPrice,
            quantity: quantity,
        };

        const updatedCart = new Map(currentCart);
        updatedCart.set(productId, cartItem);

        try {
            // save to local storage
            saveCartToStorage(updatedCart);
        } catch (error) {
            console.log("failed to save to local storage:", error);
            return {
                success: false,
                message: "failed to add item to local storage",
            };
        }

        set({ cart: updatedCart });

        return { success: true, message: "product added successfully" };
    };

    const modifyQuantity = (
        productId: string,
        newQuantity: number
    ): ActionResult => {
        if (newQuantity <= 0) {
            return {
                success: false,
                message: "number should be greater than zero",
            };
        }

        const cart = get().cart;
        const cartItem = cart.get(productId);
        if (!cartItem) {
            return {
                success: false,
                message: `product not in cart`,
            };
        }

        const newCart = new Map(cart);
        const newCartItem: CartItem = {
            ...cartItem,
            quantity: newQuantity,
        };
        newCart.set(productId, newCartItem);

        try {
            saveCartToStorage(newCart);
        } catch (error) {
            console.log("failed to save to local storage:", error);
            return {
                success: false,
                message: "failed to add item to local storage",
            };
        }

        set({ cart: newCart });

        return {
            success: true,
            message: "quantity modified!",
        };
    };

    const removeFromCart = (productId: string): ActionResult => {
        const cart = get().cart;
        const cartItem = cart.get(productId);

        if (!cartItem) {
            return {
                success: false,
                message: "item is not in cart"
            }
        }


        const newCart = new Map(cart);
        newCart.delete(productId);

        try {
            saveCartToStorage(newCart);
        } catch (error) {
            console.log("failed to save to local storage:", error);
            return {
                success: false,
                message: "failed to add item to local storage",
            };
        }

        set({cart: newCart})

        return {
            success: true,
            message: `'${cartItem.productName}' removed from cart.`
        }
    }

    const clearCart = (): ActionResult => {
        try {
            clearCartStorage();
        } catch (error) {
            console.log("failed to clear cart", error);
            return {
                success: false,
                message: "failed to clear cart"
            }
        }

        get().cart.clear();

        return {success: true, message: "cart cleared"};
    }


    return {
        cart: cart,
        addToCart: addToCart,
        modifyQuantity: modifyQuantity,
        removeFromCart: removeFromCart,
        clearCart: clearCart,
    };
});

export default useCartStore;
