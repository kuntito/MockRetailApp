export interface OrderItem {
    id: string;
    quantity: number;
    productId: string;
    productName: string;
    priceAtOrderTime: number;
    orderId?: string;
}