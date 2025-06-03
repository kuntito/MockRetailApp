export interface OrderItem {
    id: string;
    productId: string;
    productName: string; // name at time of purchase
    unitPrice: number; // price at time of purchase
    quantity: number;
}
