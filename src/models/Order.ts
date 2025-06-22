export interface Order {
    id: string;
    custName: string;
    custAddress: string;
    custPhone: string;
    dateTime: string;
    totalCost: number;
    itemCount: number;
    isMarkedComplete: boolean;
}
