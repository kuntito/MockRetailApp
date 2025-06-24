import { Text, VStack } from "@chakra-ui/react";
import { useState } from "react";
import type { Product } from "../../../../models/Product";
import useCartStore from "../../../../state-management/cartStore";
import AppButton from "../../../general/AppButton";
import AppDialog from "../../../general/AppDialog";
import CurrencyText from "../../../general/CurrencyText";
import QuantityStepper from "../../../general/QuantityStepper";
import useActionWithToast from "../../../../utils/useActionWithToast";

interface Props {
    product: Product;
    isOpen: boolean;
    onDismiss: () => void;
}

const AddToCartDialog = ({ product, isOpen, onDismiss }: Props) => {
    const { cart, addToCart } = useCartStore((s) => s);
    const isProductInCart = cart.has(product.id);

    const [quantity, setQuantity] = useState(1);
    const totalCost = quantity * product.price;

    const onAddToCartSuccess = () => {
        onDismiss();
    };

    const executeAction = useActionWithToast(onAddToCartSuccess);
    const handleAddToCart = () => {
        executeAction(() =>
            addToCart(product.id, product.name, product.price, quantity)
        );
    };

    if (isProductInCart) {
        return (
            <AppDialog
                isOpen={isOpen}
                onDismiss={onDismiss}
                body={<Text>product already in cart.</Text>}
            />
        );
    }

    return (
        <AppDialog
            isOpen={isOpen}
            onDismiss={onDismiss}
            body={
                <VStack>
                    <Text fontWeight={"bold"}>{product.name}</Text>
                    <CurrencyText>{totalCost}</CurrencyText>
                    <QuantityStepper
                        quantity={quantity}
                        setQuantity={setQuantity}
                    />
                </VStack>
            }
            footer={
                <AppButton onClick={handleAddToCart}>add to cart</AppButton>
            }
        />
    );
};

export default AddToCartDialog;
