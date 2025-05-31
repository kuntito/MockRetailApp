export interface OrderItem {
    id: string;
    product_id: string;
    product_name: string; // name at time of purchase
    unitPrice: number; // price at time of purchase
    quantity: number;
}
