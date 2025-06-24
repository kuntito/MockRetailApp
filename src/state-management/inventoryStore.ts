// this would fetch products from the api

import { create } from "zustand";
import type { Product } from "../models/Product";
import type { ActionResult } from "../types/ActionResult";
import { getUniqueId } from "../utils/getUniqueId";
import {
    getStoredInventory,
    INVENTORY_STORAGE_KEY,
    saveInventory,
} from "../utils/inventoryStorage";

// in our case dummy data
interface InventoryStore {
    itemMap: Map<string, Product>;
    // fetchItems: () => void;
    addToInventory: (productName: string, unitPrice: number) => ActionResult;
    modifyInventoryItem: (
        productId: string,
        updates: Partial<Product>
    ) => ActionResult;
    deleteInventoryItem: (productId: string) => ActionResult;
}

const useInventoryStore = create<InventoryStore>((set, get) => {
    const itemMap: Map<string, Product> = getStoredInventory();

    // Add storage event listener to update state when changes occur in other tabs
    window.addEventListener("storage", (e) => {
        if (e.key === INVENTORY_STORAGE_KEY) {
            set({ itemMap: getStoredInventory() });
        }
    });

    // const fetchItems = () => {
    //     set(() => {
    //         // const products = new Map<string, Product>(
    //         //     dummyProducts.map((p) => [p.id, p])
    //         // );

    //         const products = new Map<string, Product>();
    //         saveInventory(products);

    //         return {
    //             itemMap: products,
    //         };
    //     });
    // };

    const addToInventory = (
        productName: string,
        unitPrice: number
    ): ActionResult => {
        if (!productName.trim()) {
            return { success: false, message: "name cannot be blank! " };
        }

        if (unitPrice <= 0) {
            return {
                success: false,
                message: "price must be greater than zero",
            };
        }

        set((store) => {
            const newItemMap = new Map(store.itemMap);
            const product: Product = {
                id: getUniqueId(),
                name: productName,
                price: unitPrice,
                availability: true,
            };

            
            newItemMap.set(product.id, product);
            saveInventory(newItemMap);

            return {
                itemMap: newItemMap,
            };
        });


        return {
            success: true,
            message: `${productName} added to inventory`,
        };
    };

    const modifyInventoryItem = (
        productId: string,
        updates: Partial<Product>
    ): ActionResult => {
        const currItem = get().itemMap.get(productId);
        if (!currItem) {
            return {
                success: false,
                message: "item not in inventory",
            };
        }

        if (updates.price !== undefined && updates.price <= 0) {
            return {
                success: false,
                message: "price must be greater than zero",
            };
        }

        set((store) => {
            const newItems = new Map(store.itemMap);
            const modifiedItem = {
                ...currItem,
                ...updates,
            };

            
            newItems.set(productId, modifiedItem);
            saveInventory(newItems);

            return {
                ...store,
                itemMap: newItems,
            };
        });

        return {
            success: true,
            message: `${currItem.name} updated!`,
        };
    };

    const deleteInventoryItem = (productId: string): ActionResult => {
        const currItem = get().itemMap.get(productId);
        if (!currItem) {
            return {
                success: false,
                message: "item not in inventory",
            };
        }

        set((store) => {
            const newItems = new Map(store.itemMap);
            newItems.delete(productId);

            saveInventory(newItems);

            return {
                ...store,
                itemMap: newItems,
            };
        });

        return {
            success: true,
            message: `${currItem.name} deleted!`,
        };
    };

    return {
        itemMap: itemMap,
        // fetchItems: fetchItems,
        addToInventory: addToInventory,
        modifyInventoryItem: modifyInventoryItem,
        deleteInventoryItem: deleteInventoryItem,
    };
});

export default useInventoryStore;
