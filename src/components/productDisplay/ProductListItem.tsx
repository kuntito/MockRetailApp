import { HStack, Text } from "@chakra-ui/react";
import type { Product } from "../../models/Product";
import CurrencyText from "../general/CurrencyText";


interface Props {
    product: Product;
    onClick: () => void;
    isInCart?: boolean;
}

const ProductListItem = ({ product, onClick, isInCart = false }: Props) => {
    const fontWeight = isInCart ? "semibold" : "normal";

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
                </Text>
            </HStack>
            <CurrencyText fontFamily={"monospace"} fontWeight={fontWeight}>{product.price}</CurrencyText>
        </HStack>
    );
};

export default ProductListItem;
