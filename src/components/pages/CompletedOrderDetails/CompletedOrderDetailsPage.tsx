import { useParams } from "react-router-dom";
import useMockApiStore from "../../../state-management/mockApiStore";
import Page from "../../general/Page";
import { HStack, Text, Image, VStack } from "@chakra-ui/react";
import type { Order } from "../../../models/Order";
import type { OrderItem } from "../../../models/OrderItem";
import ItemList from "../../general/ItemList";
import CompletedOrderItemListItem from "./components/CompletedOrderItemListItem";

const CompletedOrderDetailsPage = () => {
    const { orderId } = useParams<{ orderId: string }>();
    const allOrders = useMockApiStore((s) => s.orders);
    const allOrderItems = Array.from(
        useMockApiStore((s) => s.orderItems).values()
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

    return (
        <Page
            title={`${order.customerName}'s order`}
            content={<Content order={order} orderItems={orderItems} />}
        />
    );
};

export default CompletedOrderDetailsPage;

interface OrderDetailsProps {
    order: Order;
    orderItems: OrderItem[];
}

const Content = ({ order, orderItems }: OrderDetailsProps) => {
    return <VStack
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
                <Text>{order.customerPostCode}</Text>
            </HStack>
            <HStack w={"100%"}>
                <Image src="/assets/ic_phone.svg" />
                <Text>{order.customerPhone}</Text>
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
                    <CompletedOrderItemListItem orderItem={item} key={idx} />
                )}
            />
        </VStack>
    </VStack>;
};
