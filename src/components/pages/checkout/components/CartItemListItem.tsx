import type { CartItem } from "../../../../models/CartItem";
import CurrencyText from "../../../general/CurrencyText";
import PrefixedText from "../../../general/PrefixedText";
import { Text, HStack } from "@chakra-ui/react";

interface Props {
    cartItem: CartItem;
}

const CartItemListItem = ({ cartItem }: Props) => {
    const totalCost = cartItem.quantity * cartItem.unitPrice;
    return (
        <HStack w={"100%"}>
            <PrefixedText
                // border={"2px solid red"}
                fontFamily={"monospace"}
                textWidth="1.2rem"
                prefix="x"
            >
                {cartItem.quantity}
            </PrefixedText>
            <Text flex={1}>{cartItem.productName}</Text>
            <CurrencyText>{totalCost}</CurrencyText>
        </HStack>
    );
};

export default CartItemListItem;
