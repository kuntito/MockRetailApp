// `productName`, `unitPrice` are all properties of product
// it appears redundant since we can obtain the product with it's id.
// however, productName and unitPrice can change after order is made

// we want to know the actual name and price when it was ordered
export interface OrderItem {
    id: string;
    productId: string;
    productName: string; 
    unitPrice: number;
    quantity: number;
    orderId: string;
    isAttendedTo: boolean;
}