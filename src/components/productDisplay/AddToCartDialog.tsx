import { Text, useToast, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import type { Product } from "../../models/Product";
import AppButton from "../general/AppButton";
import AppDialog from "../general/AppDialog";
import CurrencyText from "../general/CurrencyText";
import QuantityStepper from "./QuantityStepper";
import useCartStore from "../../state-management/cartStore";

interface Props {
    product: Product;
    isOpen: boolean;
    onDismiss: () => void;
}

type ToastStatus =
    | "info"
    | "warning"
    | "success"
    | "error"
    | "loading"
    | undefined;
const AddToCartDialog = ({ product, isOpen, onDismiss }: Props) => {
    // this state should be initialized with a quantity
    // if item in cart, it should be the quantity of the item in cart

    // if item not in cart, it should be `1`
    // hence, we need to know if the item is in cart

    const { addToCart, modifyQuantity, removeItem } = useCartStore((s) => s);

    const cartItem = useCartStore((s) => s.state.cartItems.get(product.id));
    const initQuantity = cartItem?.quantity ?? 1;
    const [quantity, setQuantity] = useState(initQuantity);

    useEffect(() => {
        setQuantity(initQuantity);
    }, [product, initQuantity, isOpen]);

    const unitPrice = product.price;
    const [totalPrice, setTotalPrice] = useState(unitPrice);

    useEffect(() => {
        setTotalPrice(quantity * unitPrice);
    }, [quantity, unitPrice]);

    const isQuantityNotChanged = initQuantity === quantity;

    const toast = useToast();
    const showToast = (description: string, status: ToastStatus) => {
        toast({
            description: description,
            status: status,
            isClosable: true,
            position: "top",
        });
    };

    const handleAddToCart = () => {
        const res = addToCart(
            product.id,
            product.name,
            product.price,
            quantity
        );

        const description = res
            ? `"${product.name}" added to cart`
            : "an error occurred";
        const status = res ? "success" : "error";

        showToast(description, status);

        if (res) onDismiss();
    };

    const handleModifyQuantity = () => {
        const res = modifyQuantity(product.id, quantity);

        const description = res
            ? `"${product.name}" update to ${quantity} items`
            : "an error occurred";
        const status = res ? "info" : "error";

        showToast(description, status);

        if (res) onDismiss();
    };

    const handleRemoveFromCart = () => {
        const res = removeItem(product.id);

        const description = res
            ? `"${product.name}" removed from cart`
            : "an error occurred";
        const status = res ? "info" : "error";

        showToast(description, status);

        if (res) onDismiss();
    };

    return (
        <AppDialog
            isOpen={isOpen}
            // isOpen={true}
            onDismiss={onDismiss}
            body={
                <VStack>
                    <Text fontWeight={"bold"}>{product.name}</Text>
                    <CurrencyText>{totalPrice}</CurrencyText>
                    <QuantityStepper
                        quantity={quantity}
                        setQuantity={setQuantity}
                    />
                </VStack>
            }
            footer={
                cartItem ? (
                    ButtonsIfInCart(
                        handleModifyQuantity,
                        handleRemoveFromCart,
                        isQuantityNotChanged
                    )
                ) : (
                    <AppButton onClick={handleAddToCart}>add to cart</AppButton>
                )
            }
        />
    );
};

const ButtonsIfInCart = (
    onModifyQuantity: () => void,
    onRemoveFromCart: () => void,
    isQuantityNotChanged: boolean
) => {
    return (
        <VStack>
            <AppButton
                onClick={onModifyQuantity}
                disabled={isQuantityNotChanged}
            >
                modify quantity
            </AppButton>
            <AppButton
                onClick={onRemoveFromCart}
                bg={"palette.error"}
                color={"palette.50"}
            >
                remove from order
            </AppButton>
        </VStack>
    );
};

export default AddToCartDialog;
