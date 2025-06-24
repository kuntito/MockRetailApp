import { HStack, Checkbox, Text } from "@chakra-ui/react";
import useMockApiStore from "../../../../state-management/mockApiStore";
import type { OrderItem } from "../../../../models/OrderItem";

interface Props {
    orderItem: OrderItem;
}

const PendingOrderItemListItem = ({ orderItem }: Props) => {
    const toggleOrderItemCheck = useMockApiStore((s) => s.toggleOrderItemCheck);

    const opacity = orderItem.isAttendedTo ? 0.6 : 1;

    return (
        <HStack w={"100%"} gap={"16px"} pe={"4px"} opacity={opacity}>
            <Text>x{orderItem.quantity}</Text>
            <Text flex={1}>{orderItem.productName}</Text>
            <Checkbox
                isChecked={orderItem.isAttendedTo}
                onChange={() => {
                    toggleOrderItemCheck(orderItem.id);
                }}
            />
        </HStack>
    );
};

export default PendingOrderItemListItem;
