import type { Order } from "../models/Order";
import type { OrderItem } from "../models/OrderItem";

export const ORDERS_STORAGE_KEY = "orders";
export const ORDER_ITEMS_STORAGE_KEY = "orderItems";

export const getStoredOrders = (): Map<string, Order> => {
    const storedOrders = localStorage.getItem(ORDERS_STORAGE_KEY);
    return storedOrders
        ? new Map(JSON.parse(storedOrders))
        : new Map<string, Order>();
};

export const getStoredOrderItems = (): Map<string, OrderItem> => {
    const storedOrderItems = localStorage.getItem(ORDER_ITEMS_STORAGE_KEY);
    return storedOrderItems
        ? new Map(JSON.parse(storedOrderItems))
        : new Map<string, OrderItem>();
};

export const saveOrders = (orders: Map<string, Order>) => {
    localStorage.setItem(
        ORDERS_STORAGE_KEY,
        JSON.stringify(Array.from(orders.entries()))
    );
};

export const saveOrderItems = (orderItems: Map<string, OrderItem>) => {
    localStorage.setItem(
        ORDER_ITEMS_STORAGE_KEY,
        JSON.stringify(Array.from(orderItems.entries()))
    );
};