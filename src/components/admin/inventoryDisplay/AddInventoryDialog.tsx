import { Text, useToast, VStack } from "@chakra-ui/react";
import { useState } from "react";
import useInventoryStore from "../../../state-management/inventoryStore";
import AppButton from "../../general/AppButton";
import AppDialog from "../../general/AppDialog";
import CurrencyIF from "../../general/CurrencyIF";
import TextIF from "../../general/TextInputField";

interface Props {
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
const AddInventoryDialog = ({ isOpen, onDismiss }: Props) => {
    // const [newItem, setNewItem] = useState<Product>(defaultProduct);
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const resetState = () => {
        setName("");
        setPrice(0);
    };

    const isAddDisabled = !name.trim() || price <= 0;

    const toast = useToast();
    const showToast = (description: string, status: ToastStatus) => {
        toast({
            description: description,
            status: status,
            isClosable: true,
            position: "top",
        });
    };

    const addItem = useInventoryStore((s) => s.addItem);
    const handleAddToInventory = () => {
        const res = addItem({
            id: "",
            name: name,
            price: price,
            availability: true,
        });

        const description = res
            ? `"${name}" added to inventory`
            : "an error occurred";
        const status = res ? "success" : "error";

        showToast(description, status);

        if (res) {
            onDismiss();
            resetState();
        }
    };

    return (
        <AppDialog
            isOpen={isOpen}
            onDismiss={onDismiss}
            body={
                <VStack>
                    <Text>add to inventory</Text>
                    <VStack>
                        <TextIF
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
                    disabled={isAddDisabled}
                >
                    add item
                </AppButton>
            }
        />
    );
};

export default AddInventoryDialog;
