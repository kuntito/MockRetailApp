import { HStack, Text } from "@chakra-ui/react";
import type { OrderItem } from "../../models/OrderItem";
import PrefixedText from "../general/PrefixedText";
import CurrencyText from "../general/CurrencyText";

interface Props {
    orderItem: OrderItem;
}

const OrderListItem = ({ orderItem }: Props) => {
    const orderCost = orderItem.quantity * orderItem.unitPrice;
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

// export const OrderListHeader = () => {
//     return (
//         <HStack w={"100%"} fontSize={"1rem"} >
//             <Text>qty</Text>
//             <Text flex={1}>item name</Text>
//             <Text>total cost</Text>
//         </HStack>
//     );
// };

export default OrderListItem;
