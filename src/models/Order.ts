export interface Order {
    id: string;
    customerName: string;
    customerPostCode: string;
    customerPhone: string;
    dateTime: string;
    totalCost: number;
    itemCount: number;
    isMarkedComplete: boolean;
}