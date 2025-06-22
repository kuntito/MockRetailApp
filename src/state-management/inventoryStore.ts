import { create } from "zustand";
import type { ActionResult } from "../hooks/useActionWithToast";
import type { Product } from "../models/Product";
import { dummyProducts } from "../dummyData/dummyProducts";

interface InventoryStore {
    inventory: Map<string, Product>;
    addToInventory: (product: Product) => ActionResult;
    modifyInventoryItem: (
        productId: string,
        updates: Partial<Product>
    ) => ActionResult;
    deleteInventoryItem: (productId: string) => ActionResult;
}

const useInventoryStore = create<InventoryStore>((set, get) => {
    const inventory = new Map<string, Product>();
    dummyProducts.forEach(product => {
        inventory.set(product.id, product);
    });

    const addToInventory = (product: Product): ActionResult => {
        // TODO validate product
        if (!product.name.trim()) {
            return { success: false, message: "name cannot be blank!" };
        }
        if (product.price <= 0) {
            return {
                success: false,
                message: "price must be greater than zero",
            };
        }

        set((store) => {
            const newInventory = new Map(store.inventory);
            newInventory.set(product.id, product);

            return {
                ...store,
                inventory: newInventory,
            };
        });

        return { success: true, message: `${product.name} added to inventory` };
    };

    const modifyInventoryItem = (
        itemId: string,
        updates: Partial<Product>
    ): ActionResult => {
        const currItem = get().inventory.get(itemId);
        if (!currItem) {
            return { success: false, message: "item not in inventory" };
        }

        // TODO ensure modification is valid
        if (updates.price !== undefined && updates.price <= 0) {
            return {
                success: false,
                message: "price must be greater than zero",
            };
        }

        set((store) => {
            const newInventory = new Map(store.inventory);
            const modifiedItem = {
                ...currItem,
                ...updates
            }
            newInventory.set(itemId, modifiedItem);

            return {
                ...store,
                inventory: newInventory
            }
        })

        return {
            success: true,
            message: `${currItem.name} updated!`
        }
    };

    const deleteInventoryItem = (itemId: string) => {
        const currItem = get().inventory.get(itemId);
        if (!currItem) {
            return { success: false, message: "item not in inventory" };
        }

        set((store) => {
            const newInventory = new Map(store.inventory);
            newInventory.delete(itemId);

            return {
                ...store,
                inventory: newInventory
            }
        })

        return {
            success: true,
            message: `${currItem.name} deleted!`
        }
    }

    return {
        inventory: inventory,
        addToInventory: addToInventory,
        modifyInventoryItem: modifyInventoryItem,
        deleteInventoryItem: deleteInventoryItem,
    };
});

export default useInventoryStore;
