import { create } from "zustand";
import type { ActionResult } from "../hooks/useActionWithToast";
import { getCurDateTime } from "../misc_functions/getCurrentDateTime";
import type { OrderItem } from "../models/OrderItem";

interface CartStore {
    cart: Map<string, OrderItem>;
    addToCart: (
        productId: string,
        nameAtOrder: string,
        priceAtOrder: number,
        quantity: number
    ) => ActionResult;
    checkProductInCart: (productId: string) => boolean;
    getOrderItemFromCart: (productId: string) => OrderItem | undefined;
    getCartItems: () => OrderItem[];
    getTotalCartItems: () => number;
    modifyQuantity: (productId: string, newQuantity: number) => ActionResult;
    removeItemFromCart: (productId: string) => ActionResult;
    clearCart: () => ActionResult;
}

const useCartStore = create<CartStore>((set, get) => {
    const cart = new Map<string, OrderItem>();

    const addToCart = (
        productId: string,
        nameAtOrder: string,
        priceAtOrder: number,
        quantity: number
    ): ActionResult => {
        // TODO ensure the product is valid

        set((store) => {
            const orderItem: OrderItem = {
                id: getCurDateTime(), // TODO should be an API call
                quantity: quantity,
                productId: productId,
                productName: nameAtOrder,
                priceAtOrderTime: priceAtOrder,
                isAttendedTo: false,
            };

            const newCart = new Map(store.cart);
            newCart.set(productId, orderItem);

            return {
                ...store,
                cart: newCart,
            };
        });

        return { success: true, message: "product added successfully" };
    };

    const checkProductInCart = (productId: string) => {
        return get().cart.has(productId);
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

        const orderItem = get().cart.get(productId);
        if (orderItem === undefined) {
            return { success: false, message: `product not in cart` };
        }

        set((store) => {
            const newCart = new Map(store.cart);
            const newOrderItem = {
                ...orderItem,
                quantity: newQuantity,
            };
            newCart.set(productId, newOrderItem);

            return {
                ...store,
                cart: newCart,
            };
        });

        return {
            success: true,
            message: "quantity modified!",
        };
    };

    const getOrderItemFromCart = (productId: string): OrderItem | undefined => {
        const cart = get().cart;
        return cart.get(productId);
    };

    const removeItemFromCart = (productId: string): ActionResult => {
        const isProductInCart = get().checkProductInCart(productId);
        if (!isProductInCart) {
            return { success: false, message: `product is not in cart` };
        }

        set((store) => {
            const newCart = new Map(store.cart);
            newCart.delete(productId);

            return {
                ...store,
                cart: newCart,
            };
        });

        return {
            success: true,
            message: "item removed from cart.",
        };
    };

    const getTotalCartItems = () => {
        return get().cart.size;
    };

    const getCartItems = () => {
        return Array.from(get().cart.values());
    };

    const clearCart = (): ActionResult => {
        get().cart.clear();

        return {success: true, message: "cart cleared"};
    }

    return {
        cart: cart,
        addToCart: addToCart,
        checkProductInCart: checkProductInCart,
        modifyQuantity: modifyQuantity,
        getOrderItemFromCart: getOrderItemFromCart,
        removeItemFromCart: removeItemFromCart,
        getTotalCartItems: getTotalCartItems,
        getCartItems: getCartItems,
        clearCart: clearCart,
    };
});

export default useCartStore;
