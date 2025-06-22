import { HStack, Text } from "@chakra-ui/react";
import type { OrderItem } from "../../../../models/OrderItem";

interface Props {
    orderItem: OrderItem;
}

const CompletedOrderItemListItem = ({ orderItem }: Props ) => {
    return (
        <HStack w={"100%"} gap={"16px"} pe={"4px"}>
            <Text>x{orderItem.quantity}</Text>
            <Text flex={1}>{orderItem.productName}</Text>
        </HStack>
    );
};

export default CompletedOrderItemListItem;
