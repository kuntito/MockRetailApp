import { HStack, Text } from "@chakra-ui/react";
import type { OrderItem } from "../../../../models/OrderItem";
import CurrencyText from "../../../general/CurrencyText";
import PrefixedText from "../../../general/PrefixedText";

interface Props {
    orderItem: OrderItem;
}

const OrderListItem = ({ orderItem }: Props) => {
    const orderCost = orderItem.quantity * orderItem.priceAtOrderTime;
    return (
        <HStack w={"100%"}>
            <PrefixedText
                // border={"2px solid red"}
                fontFamily={"monospace"}
                textWidth="1.2rem"
                prefix="x"
            >
                {orderItem.quantity}
            </PrefixedText>
            <Text flex={1}>{orderItem.productName}</Text>
            <CurrencyText>{orderCost}</CurrencyText>
        </HStack>
    );
};

export default OrderListItem;
