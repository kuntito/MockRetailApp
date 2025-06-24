import { Text, VStack } from "@chakra-ui/react";
import { useState } from "react";
import type { CartItem } from "../../../../models/CartItem";
import AppButton from "../../../general/AppButton";
import AppDialog from "../../../general/AppDialog";
import CurrencyText from "../../../general/CurrencyText";
import QuantityStepper from "../../../general/QuantityStepper";
import useCartStore from "../../../../state-management/cartStore";
import useActionWithToast from "../../../../utils/useActionWithToast";

interface Props {
    cartItem: CartItem;
    isOpen: boolean;
    onDismiss: () => void;
}

const EditCartItemDialog = ({ cartItem, isOpen, onDismiss }: Props) => {
    const initQuantity = cartItem.quantity;
    const [quantity, setQuantity] = useState(initQuantity);

    const totalCost = cartItem.quantity * cartItem.unitPrice;

    const { modifyQuantity, removeFromCart } = useCartStore((s) => s);

    // dimiss dialog if action is successful
    const executeAction = useActionWithToast(onDismiss);
    const handleModifyQuantity = () => {
        executeAction(
            () => modifyQuantity(cartItem.productId, quantity),
            "info"
        );
    };

    const handleRemoveFromCart = () => {
        if (window.confirm(`remove ${cartItem.productName} from cart?`)) {
            executeAction(() => removeFromCart(cartItem.productId), "info");
        }
    };

    return (
        <AppDialog
            isOpen={isOpen}
            onDismiss={onDismiss}
            body={
                <VStack>
                    <Text fontWeight={"bold"}>{cartItem.productName}</Text>
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
                        onClick={handleModifyQuantity}
                        disabled={quantity === initQuantity}
                    >
                        modify quantity
                    </AppButton>
                    <AppButton
                        onClick={handleRemoveFromCart}
                        bg={"palette.error"}
                        color={"palette.50"}
                    >
                        remove from cart
                    </AppButton>
                </VStack>
            }
        />
    );
};

export default EditCartItemDialog;
