import { Text, VStack } from "@chakra-ui/react";
import { useState } from "react";
import useActionWithToast from "../../../../hooks/useActionWithToast";
import type { Product } from "../../../../models/Product";
import useCartStore from "../../../../state-management/cartStore";
import AppButton from "../../../general/AppButton";
import AppDialog from "../../../general/AppDialog";
import CurrencyText from "../../../general/CurrencyText";
import QuantityStepper from "../../../general/QuantityStepper";

interface Props {
    product: Product;
    isOpen: boolean;
    onDismiss: () => void;
}

const AddToCartDialog = ({ product, isOpen, onDismiss }: Props) => {
    const cart = useCartStore(s => s.cart);
    const isProductInCart = cart.has(product.id);
    // the dialog is populated with the product's properties
    // the user can modify the quantity
    // which would determine the total cost

    const [quantity, setQuantity] = useState(1);
    const totalCost = quantity * product.price;

    const addToCart = useCartStore((s) => s.addToCart);

    const executeAction = useActionWithToast(onDismiss);
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
