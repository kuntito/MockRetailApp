import { create } from "zustand";
import type { CartItem } from "../models/CartItem";
import type { Order } from "../models/Order";
import type { OrderItem } from "../models/OrderItem";
import type { ActionResult } from "../types/ActionResult";
import type { CustomerInfo } from "../types/CustomerInfo";
import {
    getStoredOrderItems,
    getStoredOrders,
    ORDER_ITEMS_STORAGE_KEY,
    ORDERS_STORAGE_KEY,
    saveOrderItems,
    saveOrders,
} from "../utils/apiOrderStorage";
import { getUniqueId } from "../utils/getUniqueId";

interface MockApiStore {
    orders: Map<string, Order>;
    orderItems: Map<string, OrderItem>;

    placeOrder: (
        customerInfo: CustomerInfo,
        cartItems: CartItem[]
    ) => ActionResult;

    toggleOrderItemCheck: (orderItemId: string) => ActionResult;
    markOrderAsComplete: (orderId: string) => ActionResult;
}

// what's the point of the local storage?
// to simulate the mongo db storage
// would you need this in the real app?
// nah, since i'd make a request and response
// the data from the response is what'd show up in the db

// perhaps, for performance purposes.
// i could .. but let's keep things simple
const useMockApiStore = create<MockApiStore>((set, get) => {
    const orders: Map<string, Order> = getStoredOrders();
    const orderItems: Map<string, OrderItem> = getStoredOrderItems();

    // Add storage event listener to update state when changes occur in other tabs
    window.addEventListener("storage", (e) => {
        if (e.key === ORDERS_STORAGE_KEY) {
            set({ orders: getStoredOrders() });
        }
        if (e.key === ORDER_ITEMS_STORAGE_KEY) {
            set({ orderItems: getStoredOrderItems() });
        }
    });

    const placeOrder = (
        customerInfo: CustomerInfo,
        cartItems: CartItem[]
    ): ActionResult => {
        if (cartItems.length === 0) {
            return { success: false, message: "no items in cart" };
        }

        const orderId = getUniqueId();

        const totalOrderCost = cartItems.reduce(
            (sum, ci) => sum + ci.quantity * ci.unitPrice,
            0
        );
        const order: Order = {
            id: orderId,
            customerName: customerInfo.name,
            customerPostCode: customerInfo.postCode,
            customerPhone: customerInfo.phoneNumber,
            dateTime: new Date().toISOString(),
            totalCost: totalOrderCost,
            itemCount: cartItems.length,
            isMarkedComplete: false,
        };

        set((store) => {
            const newOrders = new Map(store.orders);
            newOrders.set(orderId, order);


            const newOrderItems = new Map();
            for (const ci of cartItems) {

                const orderItem: OrderItem = {
                    id: ci.id,
                    productId: ci.productId,
                    productName: ci.productName,
                    unitPrice: ci.unitPrice,
                    quantity: ci.quantity,
                    orderId: orderId,
                    isAttendedTo: false,
                }

                newOrderItems.set(ci.id, orderItem);

            }

            // Save to localStorage
            saveOrders(newOrders);
            saveOrderItems(newOrderItems);

            return {
                ...store,
                orders: newOrders,
                orderItems: newOrderItems,
            };
        });

        // this way `store.orders` serves as the API collection
        // and `store.orderItems` serves as the OrderItems collection

        return { success: true, message: "order successful" };
    };

    const toggleOrderItemCheck = (
        orderItemId: string
    ): ActionResult => {
        const orderItem = get().orderItems.get(orderItemId);
        if (!orderItem) {
            return {
                success: false,
                message: "order item does not exist",
            };
        }

        set((store) => {
            const newOrderItems = new Map(store.orderItems);
            const newOrderItem: OrderItem = {
                ...orderItem,
                isAttendedTo: !orderItem.isAttendedTo,
            };

            newOrderItems.set(orderItemId, newOrderItem);

            // Save to localStorage after updating the store
            saveOrderItems(newOrderItems);

            return {
                orderItems: newOrderItems,
            };
        });

        return {
            success: true,
            message: "toggled!",
        };
    };

    const markOrderAsComplete = (orderId: string) => {
        const order = get().orders.get(orderId);
        if (!order) {
            return {
                success: false,
                message: "can't find order",
            };
        }

        set((store) => {
            const newOrders = new Map(store.orders);
            const modOrder: Order = {
                ...order,
                isMarkedComplete: true,
            };
            newOrders.set(order.id, modOrder);

            // Save to localStorage after updating the store
            saveOrders(newOrders);

            return {
                orders: newOrders,
            };
        });

        return {
            success: true,
            message: `${order.customerName}'s order complete`,
        };
    };

    return {
        orders: orders,
        orderItems: orderItems,
        placeOrder: placeOrder,
        toggleOrderItemCheck: toggleOrderItemCheck,
        markOrderAsComplete: markOrderAsComplete,
    }
});

export default useMockApiStore;