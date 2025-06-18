import { HStack, Text } from "@chakra-ui/react";
import type { Order } from "../../../../models/Order";
import useAdminOrderStore from "../../../../state-management/adminOrderStore";
import CurrencyText from "../../../general/CurrencyText";

interface Props {
    order: Order;
}

const PendingOrderListItem = ({ order }: Props) => {
    const getOrderItems = useAdminOrderStore((s) => s.getOrderItems);
    const orderItems = getOrderItems(order.id);

    if (!orderItems) {
        return <Text>{`error, order ${order.id} has no items`}</Text>;
    }

    const itemCount = orderItems.length;

    return (
        <HStack>
            <HStack>
                <Text>{order.custName}</Text>
                <CurrencyText>{order.totalAmount}</CurrencyText>
            </HStack>
            <HStack>
                <HStack>
                    <Text>${itemCount} item</Text>
                    <Text>{itemCount > 0 ? "s" : ""}</Text>
                </HStack>
                <Text fontFamily={"mono"}>03-mar-2025</Text>
            </HStack>
        </HStack>
    );
};

export default PendingOrderListItem;
