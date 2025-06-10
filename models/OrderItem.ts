export interface OrderItem {
    id: string;
    quantity: number;
    productId: string;
    priceAtOrderTime: number;
    orderId: string | null;
}