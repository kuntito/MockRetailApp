import { Text, useToast, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import type { Product } from "../../models/Product";
import useInventoryStore from "../../state-management/inventoryStore";
import AppButton from "../general/AppButton";
import AppDialog from "../general/AppDialog";
import CurrencyIF from "../general/CurrencyIF";
import TextIF from "../general/TextIF";

interface Props {
    initItem: Product;
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

const EditInventoryItemDialog = ({ initItem, isOpen, onDismiss }: Props) => {
    const modifyItem = useInventoryStore((s) => s.modifyItem);
    const removeItem = useInventoryStore((s) => s.removeItem);

    const [name, setName] = useState(initItem.name);
    const [price, setPrice] = useState(initItem.price);

    useEffect(() => {
        setName(initItem.name);
        setPrice(initItem.price);
    }, [initItem]);

    const toast = useToast();
    const showToast = (description: string, status: ToastStatus) => {
        toast({
            description: description,
            status: status,
            isClosable: true,
            position: "top",
        });
    };

    const isItemUnchanged = name === initItem.name && price === initItem.price;
    const handleModifyItem = () => {
        const res = modifyItem(initItem.id, { name, price });

        const description = res ? `update successful!` : "an error occurred";
        const status = res ? "success" : "error";

        showToast(description, status);

        if (res) onDismiss();
    };

    const handleDeleteItem = () => {
        if (window.confirm(`delete ${initItem.name}?`)) {
            const res = removeItem(initItem.id);

            const description = res
                ? `"${initItem.name}" deleted!`
                : "item could not be deleted";
            const status = res ? "info" : "error";

            showToast(description, status);

            if (res) onDismiss();
        }
    };

    return (
        <AppDialog
            isOpen={isOpen}
            onDismiss={onDismiss}
            body={
                <VStack>
                    <Text fontWeight={"bold"}>edit item</Text>
                    <VStack>
                        <TextIF
                            label="name"
                            value={name}
                            onChange={(newName) => {
                                setName(newName);
                            }}
                        />
                        <CurrencyIF
                            label="price"
                            value={price}
                            onChange={(newPrice) => setPrice(newPrice)}
                        />
                    </VStack>
                </VStack>
            }
            footer={
                <VStack>
                    <AppButton
                        disabled={isItemUnchanged || price <= 0}
                        onClick={handleModifyItem}
                    >
                        update item
                    </AppButton>
                    <AppButton
                        onClick={handleDeleteItem}
                        bg={"palette.error"}
                        color={"palette.50"}
                    >
                        delete item
                    </AppButton>
                </VStack>
            }
        />
    );
};

export default EditInventoryItemDialog;
