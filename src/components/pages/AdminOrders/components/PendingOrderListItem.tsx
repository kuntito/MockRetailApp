import { HStack, Text, VStack } from "@chakra-ui/react";
import type { Order } from "../../../../models/Order";
import { useNavigate } from "react-router-dom";
import { formatIsoDate } from "../../../../utils/formatIsoDate";

interface Props {
    order: Order;
}

const PendingOrderListItem = ({ order }: Props) => {
    const navigate = useNavigate();
    const onClick = () => {
        navigate(`pendingOrderDetails/${order.id}`);
    };

    

    return (
        <VStack onClick={onClick} cursor={"pointer"} w={"100%"} gap={0}>
            <HStack w={"100%"}>
                <Text align={"start"} flex={1}>
                    {order.customerName}
                </Text>
                <Text>£{order.totalCost.toFixed(2)}</Text>
            </HStack>
            <HStack w={"100%"}>
                <Text fontSize={"md"} align={"start"} flex={1}>
                    {order.itemCount} item{order.itemCount > 1 ? "s" : ""}
                </Text>
                <Text fontSize={"small"} fontFamily={"mono"}>
                    {formatIsoDate(order.dateTime)}
                </Text>
            </HStack>
        </VStack>
    );
};

export default PendingOrderListItem;
