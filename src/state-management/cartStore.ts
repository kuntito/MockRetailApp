import { create } from "zustand";
import type { OrderItem } from "../models/OrderItem";

interface CartState {
    cartItems: Map<string, OrderItem>;
    orderId: number;
}

// what methods do i need
// i want to know if an item is in cart
// i want to modify items in cart
//      new items
//      modify existing items
//      delete items
interface CartStore {
    state: CartState;
    addToCart: (
        productId: string,
        productName: string,
        unitPrice: number,
        quantity: number
    ) => boolean;
    modifyQuantity: (product_id: string, newQuantity: number) => boolean;
    removeItem: (product_id: string) => boolean;
}

const useCartStore = create<CartStore>((set, get) => {
    const defaultState: CartState = {
        cartItems: new Map<string, OrderItem>(),
        orderId: 0,
    };

    const addToCart = (
        productId: string,
        productName: string,
        unitPrice: number,
        quantity: number
    ) => {
        console.log(`${productName} cart`);

        if (get().state.cartItems.has(productId)) {
            return false; // item already exists
        }

        set((store) => {
            const orderItem = {
                id: store.state.orderId.toString(),
                productId,
                productName,
                unitPrice,
                quantity,
            };

            const newCartItems = new Map(store.state.cartItems);
            newCartItems.set(productId, orderItem);

            // const productNames = Array.from(newCartItems.values()).map(
            //     (item) => item.productName
            // );
            // console.log("Products in cart:", productNames);

            return {
                state: {
                    ...store.state,
                    cartItems: newCartItems,
                    orderId: store.state.orderId + 1,
                },
            };
        });

        return true;
    };

    const modifyQuantity = (productId: string, newQuantity: number) => {
        const cartItem = get().state.cartItems.get(productId);
        if (!cartItem) return false;

        if (newQuantity <= 0) {
            return removeItem(productId);
        }

        set((store) => {

            const newCart = new Map(store.state.cartItems);
            newCart.set(productId, {
                ...cartItem,
                quantity: newQuantity
            });

            return {
                state: {
                    ...store.state,
                    cartItems: newCart
                }
            }
        })

        return true;
    };

    const removeItem = (productId: string) => {
        let isRemoved = false;


        set((store) => {
            if (!store.state.cartItems.has(productId)) return store;

            const newCart = new Map(store.state.cartItems);
            newCart.delete(productId);
            isRemoved = true;

            return {
                state: {
                    ...store.state,
                    cartItems: newCart
                }
            }
        })

        return isRemoved;
    };

    return {
        state: defaultState,
        addToCart: addToCart,
        modifyQuantity: modifyQuantity,
        removeItem: removeItem,
    };
});

export default useCartStore;
