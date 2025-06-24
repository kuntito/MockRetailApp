import type { Product } from "../models/Product";

export const INVENTORY_STORAGE_KEY = "inventory";

export const saveInventory = (products: Map<string, Product>) => {
    localStorage.setItem(
        INVENTORY_STORAGE_KEY,
        JSON.stringify(Array.from(products.entries()))
    )
}

export const getStoredInventory = (): Map<string, Product> => {
    const storedInventory = localStorage.getItem(INVENTORY_STORAGE_KEY);
    return storedInventory
        ? new Map(JSON.parse(storedInventory))
        : new Map<string, Product>();
}