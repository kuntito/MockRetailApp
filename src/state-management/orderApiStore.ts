import { create } from "zustand";
import type { ActionResult } from "../hooks/useActionWithToast";
import type { Order } from "../models/Order";
import type { OrderItem } from "../models/OrderItem";
import { getCurDateTime } from "../misc_functions/getCurrentDateTime";
import type { CustomerInfo } from "../models/CustomerInfo";
import { devtools } from "zustand/middleware";

interface OrderApiStore {
    orders: Map<string, Order>;
    orderItems: Map<string, OrderItem>;

    placeOrder: (
        customerInfo: CustomerInfo,
        orderItems: OrderItem[]
    ) => ActionResult;
    toggleOrderItemCheck: (orderItemId: string) => ActionResult;
    markOrderAsComplete: (orderId: string) => ActionResult;
}

// const useOrderApiStore = create<OrderApiStore>((set) => {
//     const orders = new Map<string, Order>();
//     const orderItems = new Map<string, OrderItem>();

//     const placeOrder = (
//         customerInfo: CustomerInfo,
//         orderItems: OrderItem[]
//     ): ActionResult => {
//         if (orderItems.length === 0) {
//             return { success: false, message: "no items in cart" };
//         }

//         const curDateTime = getCurDateTime();
//         const orderId = curDateTime;

//         const totalOrderCost = orderItems.reduce(
//             (sum, oi) => sum + oi.quantity * oi.priceAtOrderTime,
//             0
//         );
//         const order: Order = {
//             id: orderId,
//             custName: customerInfo.name,
//             custAddress: customerInfo.postCode,
//             custPhone: customerInfo.phoneNumber,
//             dateTime: curDateTime,
//             totalCost: totalOrderCost,
//             itemCount: orderItems.length,
//         };

//         set((store) => {
//             // what am i doing, creating an order object
//             // and inserting that order object into `store.orders`
//             const newOrders = new Map(store.orders);
//             newOrders.set(orderId, order);

//             // then i'd add `orderId` to each orderItem
//             // and add each orderItem to `store.orderItems`
//             const newOrderItems = new Map(store.orderItems);
//             for (const oi of orderItems) {
//                 oi.orderId = orderId;
//                 newOrderItems.set(oi.id, oi);
//             }

//             return {
//                 ...store,
//                 orders: newOrders,
//                 orderItems: newOrderItems,
//             };
//         });

//         // this way `store.orders` serves as the API collection
//         // and `store.orderItems` serves as the OrderItems collection

//         return { success: true, message: "order successful" };
//     };

//     return {
//         orders: orders,
//         orderItems: orderItems,
//         placeOrder: placeOrder,
//     };
// });

const ORDERS_STORAGE_KEY = "orders";
const ORDER_ITEMS_STORAGE_KEY = "orderItems";

const getStoredOrders = (): Map<string, Order> => {
    const storedOrders = localStorage.getItem(ORDERS_STORAGE_KEY);
    return storedOrders
        ? new Map(JSON.parse(storedOrders))
        : new Map<string, Order>();
};

const getStoredOrderItems = (): Map<string, OrderItem> => {
    const storedOrderItems = localStorage.getItem(ORDER_ITEMS_STORAGE_KEY);
    return storedOrderItems
        ? new Map(JSON.parse(storedOrderItems))
        : new Map<string, OrderItem>();
};

const saveOrders = (orders: Map<string, Order>) => {
    localStorage.setItem(
        ORDERS_STORAGE_KEY,
        JSON.stringify(Array.from(orders.entries()))
    );
};

const saveOrderItems = (orderItems: Map<string, OrderItem>) => {
    localStorage.setItem(
        ORDER_ITEMS_STORAGE_KEY,
        JSON.stringify(Array.from(orderItems.entries()))
    );
};

const useOrderApiStore = create<OrderApiStore>()(
    devtools(
        (set, get) => {
            const orders = getStoredOrders();
            const orderItems = getStoredOrderItems();

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
                orderItems: OrderItem[]
            ): ActionResult => {
                if (orderItems.length === 0) {
                    return { success: false, message: "no items in cart" };
                }

                const curDateTime = getCurDateTime();
                const orderId = curDateTime;

                const totalOrderCost = orderItems.reduce(
                    (sum, oi) => sum + oi.quantity * oi.priceAtOrderTime,
                    0
                );
                const order: Order = {
                    id: orderId,
                    custName: customerInfo.name,
                    custAddress: customerInfo.postCode,
                    custPhone: customerInfo.phoneNumber,
                    dateTime: curDateTime,
                    totalCost: totalOrderCost,
                    itemCount: orderItems.length,
                    isMarkedComplete: false,
                };

                set((store) => {
                    // what am i doing, creating an order object
                    // and inserting that order object into `store.orders`
                    const newOrders = new Map(store.orders);
                    newOrders.set(orderId, order);

                    // then i'd add `orderId` to each orderItem
                    // and add each orderItem to `store.orderItems`
                    const newOrderItems = new Map(store.orderItems);
                    for (const oi of orderItems) {
                        oi.orderId = orderId;
                        newOrderItems.set(oi.id, oi);
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
                    message: `${order.custName}'s order complete`,
                };
            };

            return {
                orders: orders,
                orderItems: orderItems,
                placeOrder: placeOrder,
                toggleOrderItemCheck: toggleOrderItemCheck,
                markOrderAsComplete: markOrderAsComplete,
            };
        },
        {
            name: "order api store",
            // Add serialize options
            serialize: {
                options: {
                    map: true,
                },
            },
        }
    )
);

export default useOrderApiStore;
