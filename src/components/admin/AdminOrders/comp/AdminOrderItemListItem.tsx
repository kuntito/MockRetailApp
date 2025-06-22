import { Checkbox, HStack, Text } from "@chakra-ui/react";
import type { OrderItem } from "../../../../models/OrderItem";
import useOrderApiStore from "../../../../state-management/orderApiStore";

interface Props {
    orderItem: OrderItem;
}

const AdminOrderItemListItem = ({ orderItem }: Props) => {
    const toggleOrderItemCheck = useOrderApiStore(
        (s) => s.toggleOrderItemCheck
    );

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

export default AdminOrderItemListItem;
