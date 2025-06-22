export interface OrderItem {
    id: string;
    quantity: number;
    productId: string;
    productName: string;
    priceAtOrderTime: number;
    orderId?: string;
    isAttendedTo: boolean; // allows nihude know what items she's attended to, it defaults to false
}