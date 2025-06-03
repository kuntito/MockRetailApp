import { HStack, Text } from "@chakra-ui/react";
import type { Product } from "../../models/Product";
import CurrencyText from "../general/CurrencyText";
import useCartStore from "../../state-management/cartStore";

interface Props {
    product: Product;
    onClick: () => void;
}

const ProductListItem = ({ product, onClick }: Props) => {
    const cartItem = useCartStore((s) => s.state.cartItems.get(product.id));
    const isInCart = cartItem !== undefined;

    const fontWeight = isInCart ? "semibold" : "normal";
    const price = isInCart ? cartItem.quantity * product.price : product.price;

    return (
        <HStack
            w={"100%"}
            // border={"2px solid red"}
        >
            <HStack flex={1}>
                <Text
                    cursor={"pointer"}
                    fontWeight={fontWeight}
                    onClick={onClick}
                >
                    {product.name}
                    {isInCart && ` (${cartItem.quantity})`}
                </Text>
            </HStack>
            {!isInCart && (
                <CurrencyText fontFamily={"monospace"} fontWeight={fontWeight}>
                    {price}
                </CurrencyText>
            )}
        </HStack>
    );
};

export default ProductListItem;
