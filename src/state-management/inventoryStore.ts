// what do i need?
// a list of the items
// function to add item
// modify item
// remove item

import { create } from "zustand";
import type { Product } from "../models/Product";
import productsData from "../data/productsData";

interface InventoryStore {
    items: Map<string, Product>;
    addItem: (product: Product) => boolean;
    modifyItem: (id: string, updates: Partial<Product>) => boolean;
    removeItem: (id: string) => boolean;
}

// modifyItem(productId, { availability: true });

const useInventoryStore = create<InventoryStore>((set, get) => {
    // const defaultItems = new Map<string, Product>();

    // TODO should be obtained from API
    // const defaultItems = new Map<string, Product>(
    //     productsData.map(product => [product.id, product])
    // );

    const defaultItems = new Map<string, Product>(
        productsData.slice(0,1).map(product => [product.id, product])
    );

    const addItem = (product: Product) => {
        if (!product.name.trim()) return false;
        if (product.price <= 0) return false;

        set((store) => {
            const newItems = new Map(store.items);
            newItems.set(product.id, product);

            return {
                items: newItems
            }
        })

        return true;
    };

    const modifyItem = (itemId: string, updates: Partial<Product>) => {

        const inventoryItem = get().items.get(itemId);
        if (!inventoryItem) return false; // item not in inventory
        if ("price" in updates && updates.price! <= 0) return false;

        console.log(updates);
        

        set((store) => {
            const newItems = new Map(store.items);
            newItems.set(
                itemId,
                {
                    ...inventoryItem,
                    ...updates
                }
            );

            return {
                items: newItems
            }
        })

        return true;
    };

    const removeItem = (itemId: string) => {
        if(!get().items.has(itemId)) {
            return false; // item does not exist
        }

        set((store) => {
            const newItems = new Map(store.items);
            newItems.delete(itemId);

            return {
                items: newItems
            }
        })

        return true;
    }

    return {
        items: defaultItems,
        addItem: addItem,
        modifyItem: modifyItem,
        removeItem: removeItem
    }
});


export default useInventoryStore;