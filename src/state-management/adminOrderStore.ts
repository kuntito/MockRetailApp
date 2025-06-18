import { create } from "zustand";
import type { Order } from "../models/Order";
import type { OrderItem } from "../models/OrderItem";
import ordersAPI from "../dummyData/dummyOrderItemsAPI";

interface AdminOrderStore {
    pendingOrders: Map<string, Order>;
    completedOrders: Map<string, Order>;
    getOrderItems: (orderId: string) => OrderItem[] | undefined;
}

const useAdminOrderStore = create<AdminOrderStore>((set, get) => {
    // TODO, i want to place the orders from OrdersAPI here
    const pendingOrders = new Map<string, Order>();
    const completedOrders = new Map<string, Order>();

    const getOrderItems = (orderId: string) => {
        // to get order items, need to know the orderId is valid
        // once valid, i need to query the ?
        // think this store should have a list of order items
        // once the user pays, the order is created and deets sent to the API
        // and this store retrieves from the API

        // however, for my interactive ui-first approach
        // when an order is made, i'd create a global collection of order item
        // and have this function query that list for relevant order ids
        // a map is better orderId => OrderItems[]

        const orderItems = ordersAPI.get(orderId);

        return orderItems;
    };

    return {
        pendingOrders: pendingOrders,
        completedOrders: completedOrders,
        getOrderItems: getOrderItems,
    };
});

export default useAdminOrderStore;
