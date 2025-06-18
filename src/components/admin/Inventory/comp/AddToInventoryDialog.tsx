import { VStack, Text } from "@chakra-ui/react";
import AppDialog from "../../../general/AppDialog";
import TextInputField from "../../../general/TextInputField";
import CurrencyIF from "../../../general/CurrencyIF";
import { useState } from "react";
import AppButton from "../../../general/AppButton";
import useActionWithToast from "../../../../hooks/useActionWithToast";
import useInventoryStore from "../../../../state-management/inventoryStore";
import type { Product } from "../../../../models/Product";
import { getCurDateTime } from "../../../../misc_functions/getCurrentDateTime";

interface Props {
    isOpen: boolean;
    onDismiss: () => void;
}

const AddToInventoryDialog = ({ isOpen, onDismiss }: Props) => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const resetState = () => {
        setName("");
        setPrice(0);
    };

    const isProductValid = price > 0 && name.trim();

    const customOnDismiss = () => {
        onDismiss();
        resetState();
    };

    const addToInventory = useInventoryStore((s) => s.addToInventory);
    const executeAction = useActionWithToast(customOnDismiss);
    const handleAddToInventory = () => {
        const newProduct: Product = {
            id: getCurDateTime(),
            name: name,
            price: price,
            availability: true,
        };
        executeAction(() => addToInventory(newProduct));
    };

    return (
        <AppDialog
            isOpen={isOpen}
            onDismiss={customOnDismiss}
            body={
                <VStack>
                    <Text>add to inventory</Text>
                    <VStack>
                        <TextInputField
                            label="name"
                            value={name}
                            onChange={(name) => setName(name)}
                        />
                        <CurrencyIF
                            label="price"
                            value={price}
                            onChange={(price) => setPrice(price)}
                        />
                    </VStack>
                </VStack>
            }
            footer={
                <AppButton
                    onClick={handleAddToInventory}
                    disabled={!isProductValid}
                >
                    add to inventory
                </AppButton>
            }
        />
    );
};

export default AddToInventoryDialog;
