import { Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import type { Product } from "../../models/Product";
import AppButton from "../general/AppButton";
import AppDialog from "../general/AppDialog";
import CurrencyText from "../general/CurrencyText";
import QuantityStepper from "./QuantityStepper";

interface Props {
    product: Product;
    isOpen: boolean;
    onDismiss: () => void;
    onAddToCart: () => void;
}

const AddToCartDialog = ({
    product,
    isOpen,
    onDismiss,
    onAddToCart,
}: Props) => {
    const [quantity, setQuantity] = useState(1);

    const unitPrice = product.price;
    const [totalPrice, setTotalPrice] = useState(unitPrice);

    useEffect(() => {
        setTotalPrice(quantity * unitPrice);
    }, [quantity, unitPrice]);

    return (
        <AppDialog
            isOpen={isOpen}
            onDismiss={onDismiss}
            body={
                <VStack>
                    <Text fontWeight={"bold"}>{product.name}</Text>
                    <CurrencyText>{totalPrice}</CurrencyText>
                </VStack>
            }
            footer={
                <VStack>
                    <QuantityStepper
                        quantity={quantity}
                        setQuantity={setQuantity}
                    />
                    <AppButton
                        onClick={() => {
                            onAddToCart();
                            onDismiss();
                        }}
                    >
                        add to cart
                    </AppButton>
                </VStack>
            }
        />
    );
};

export default AddToCartDialog;
