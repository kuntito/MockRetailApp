import { HStack, Text } from "@chakra-ui/react";
import type { Product } from "../../../../models/Product";
import CurrencyText from "../../../general/CurrencyText";
import useCartStore from "../../../../state-management/cartStore";

interface Props {
    product: Product;
    onProductClick: (product: Product) => void;
}

const ProductListItem = ({ product, onProductClick }: Props) => {
    const getOrderItemFromCart = useCartStore((s) => s.getOrderItemFromCart);
    const orderItem = getOrderItemFromCart(product.id);
    const isProductInCart = orderItem !== undefined;

    const handleProductClick = () => onProductClick(product);
    return (
        <>
            {isProductInCart
                ? ProductItemInCart(
                      product,
                      orderItem.quantity,
                      handleProductClick
                  )
                : ProductItemNotInCart(product, handleProductClick)}
        </>
    );
};

const ProductItemInCart = (
    product: Product,
    quantityInCart: number,
    onClick: () => void
) => {
    return (
        <HStack w={"100%"} fontWeight={"semibold"}>
            <Text flex={1} cursor={"pointer"} onClick={onClick}>
                {`${product.name} (${quantityInCart})`}
            </Text>
        </HStack>
    );
};

const ProductItemNotInCart = (product: Product, onClick: () => void) => {
    return (
        <HStack w={"100%"}>
            <Text flex={1} cursor={"pointer"} onClick={onClick}>
                {product.name}
            </Text>
            <CurrencyText>{product.price}</CurrencyText>
        </HStack>
    );
};

export default ProductListItem;
