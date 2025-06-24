import { HStack, Text } from "@chakra-ui/react";
import type { CartItem } from "../../../../models/CartItem";
import type { Product } from "../../../../models/Product";
import useCartStore from "../../../../state-management/cartStore";
import CurrencyText from "../../../general/CurrencyText";

interface Props {
    product: Product;
    onProductClick: () => void;
}

// this component has two views.
// one where the product is in cart
// another when the product is unselected.
const ProductListItem = ({ product, onProductClick }: Props) => {
    const cart = useCartStore(s => s.cart);
    const cartItem = cart.get(product.id);

    return cartItem ? (
        <ProductInCart cartItem={cartItem} onClick={onProductClick} />
    ) : (
        <ProductNotInCart product={product} onClick={onProductClick} />
    );
};

export default ProductListItem;

interface ProductInCartProps {
    cartItem: CartItem;
    onClick: () => void;
}

const ProductInCart = ({ cartItem, onClick }: ProductInCartProps) => {
    return (
        <HStack w={"100%"} fontWeight={"semibold"}>
            <Text flex={1} cursor={"pointer"} onClick={onClick}>
                {`${cartItem.productName} (${cartItem.quantity})`}
            </Text>
        </HStack>
    );
};

interface ProductNotInCartProps {
    product: Product;
    onClick: () => void;
}

const ProductNotInCart = ({ product, onClick }: ProductNotInCartProps) => {
    return (
        <HStack w={"100%"}>
            <Text flex={1} cursor={"pointer"} onClick={onClick}>
                {product.name}
            </Text>
            <CurrencyText>{product.price}</CurrencyText>
        </HStack>
    );
};
