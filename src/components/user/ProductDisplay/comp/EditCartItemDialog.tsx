import { useState } from "react";
import type { Product } from "../../../../models/Product";
import useCartStore from "../../../../state-management/cartStore";
import AppDialog from "../../../general/AppDialog";
import { Text, VStack } from "@chakra-ui/react";
import AppButton from "../../../general/AppButton";
import CurrencyText from "../../../general/CurrencyText";
import QuantityStepper from "../../../general/QuantityStepper";
import useActionWithToast from "../../../../hooks/useActionWithToast";

interface Props {
    product: Product;
    isOpen: boolean;
    onDismiss: () => void;
}

const EditCartItemDialog = ({ product, isOpen, onDismiss }: Props) => {
    const cart = useCartStore((s) => s.cart);

    const orderItem = cart.get(product.id);
    const isProductInCart = orderItem !== undefined;

    const initQuantity = isProductInCart ? orderItem.quantity : 0;

    const [quantity, setQuantity] = useState(initQuantity);
    const totalCost = isProductInCart
        ? orderItem.quantity * orderItem.priceAtOrderTime
        : 0;

    const executeAction = useActionWithToast(onDismiss);

    const modifyQuantity = useCartStore((s) => s.modifyQuantity);
    const removeItemFromCart = useCartStore((s) => s.removeItemFromCart);

    // if for some reason, we call this when the product is not in cart
    if (!isProductInCart) {
        return (
            <AppDialog
                isOpen={isOpen}
                onDismiss={onDismiss}
                body={<Text>product not in cart</Text>}
            />
        );
    }

    const handleModifyQuantity = (productId: string, newQuantity: number) => {
        executeAction(() => modifyQuantity(productId, newQuantity), "info");
    };

    const handleRemoveFromCart = (productId: string) => {
        if (window.confirm(`remove ${product.name} from cart?`)) {
            executeAction(() => removeItemFromCart(productId), "info");
        }
    };

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
                <VStack>
                    <AppButton
                        onClick={() =>
                            handleModifyQuantity(product.id, quantity)
                        }
                        disabled={quantity === initQuantity}
                    >
                        modify quantity
                    </AppButton>
                    <AppButton
                        onClick={() => handleRemoveFromCart(product.id)}
                        bg={"palette.error"}
                        color={"palette.50"}
                    >
                        remove from order
                    </AppButton>
                </VStack>
            }
        />
    );
};

export default EditCartItemDialog;
