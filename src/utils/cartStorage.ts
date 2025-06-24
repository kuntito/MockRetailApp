import type { Cart } from "../state-management/cartStore";

const CART_STORAGE_KEY = "shopping-cart";

export const saveCartToStorage = (cart: Cart): void => {
    try {
        const cartArray = Array.from(cart.entries());
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartArray));
    } catch (error) {
        console.log("failed to save cart", error);
    }
}

export const loadCartFromStorage = (): Cart => {
    try {
        const stored = localStorage.getItem(CART_STORAGE_KEY);
        if (stored) {
            const cartArray = JSON.parse(stored);
            return new Map(cartArray);
        }
    } catch (error) {
        console.log("error loading cart from storage", error);
    }

    return new Map();
}

export const clearCartStorage = (): void => {
    localStorage.removeItem(CART_STORAGE_KEY);
}