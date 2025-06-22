import { HStack, Image, Text, VStack } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import type { Order } from "../../../models/Order";
import type { OrderItem } from "../../../models/OrderItem";
import useOrderApiStore from "../../../state-management/orderApiStore";
import AppHeader from "../../general/AppHeader";
import ItemList from "../../general/ItemList";
import CompletedOrderItemListItem from "./comp/CompletedOrderItemListItem";

const CompletedOrderDetailsPage = () => {
    const { orderId } = useParams<{ orderId: string }>();

    // i need the order information
    // hence, `allOrders` and `allOrderItems`
    const allOrders = useOrderApiStore((s) => s.orders);
    const allOrderItems = Array.from(
        useOrderApiStore((s) => s.orderItems).values()
    );

    if (!orderId) {
        return <Text>this order doesn't exist</Text>;
    }

    const order = allOrders.get(orderId);
    const orderItems = allOrderItems.filter((item) => item.orderId === orderId);

    if (!order) {
        return <Text>can't find order</Text>;
    }

    if (orderItems.length === 0) {
        return <Text>order has no items</Text>;
    }

    return <OrderDetailsContent order={order} orderItems={orderItems}/>;
};

export default CompletedOrderDetailsPage;

interface OrderDetailsProps {
    order: Order;
    orderItems: OrderItem[];
}

const OrderDetailsContent = ({ order, orderItems }: OrderDetailsProps) => {
    return (
        <VStack w={"100%"} h={"100%"}>
            <AppHeader>
                <VStack gap={0}>
                    <Text fontSize={"0.9rem"}>{order.custName}'s order</Text>
                    <Text fontSize={"x-small"}>03-mar-2025</Text>
                </VStack>
            </AppHeader>
            <VStack
                w={"100%"}
                h={"100%"}
                px={"16px"}
                pt={"16px"}
                pb={"10px"}
                overflow={"hidden"}
            >
                <HStack>
                    <Image src="/assets/ic_check.svg" />
                    <Text>Order Complete</Text>
                </HStack>
                <VStack
                    w={"100%"}
                    border={"1px solid"}
                    borderColor={"palette.500"}
                    borderRadius={"16px"}
                    padding={"16px"}
                >
                    <HStack w={"100%"}>
                        <Image src="/assets/ic_home.svg" />
                        <Text>{order.custAddress}</Text>
                    </HStack>
                    <HStack w={"100%"}>
                        <Image src="/assets/ic_phone.svg" />
                        <Text>{order.custPhone}</Text>
                    </HStack>
                </VStack>
                <VStack
                    // border={"2px solid red"}
                    w={"100%"}
                    h={"100%"}
                    overflow={"auto"}
                >
                    <ItemList
                        data={orderItems}
                        renderItem={(item, idx) => (
                            <CompletedOrderItemListItem
                                orderItem={item}
                                key={idx}
                            />
                        )}
                    />
                </VStack>
            </VStack>
        </VStack>
    );
};
