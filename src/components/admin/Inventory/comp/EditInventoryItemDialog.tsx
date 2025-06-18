import { useEffect, useState } from "react";
import AppDialog from "../../../general/AppDialog";
import type { Product } from "../../../../models/Product";
import { VStack, Text, HStack, Switch } from "@chakra-ui/react";
import CurrencyIF from "../../../general/CurrencyIF";
import TextInputField from "../../../general/TextInputField";
import AppButton from "../../../general/AppButton";
import useActionWithToast from "../../../../hooks/useActionWithToast";
import useInventoryStore from "../../../../state-management/inventoryStore";

interface Props {
    initItem: Product;
    isOpen: boolean;
    onDismiss: () => void;
}

type InventoryForm = Pick<Product, "name" | "price" | "availability">;

const isFormValid = (form: InventoryForm): boolean => {
    return form.name.trim() !== "" && form.price > 0;
};

const EditInventoryItemDialog = ({ initItem, isOpen, onDismiss }: Props) => {
    const [inventoryForm, setInventoryForm] = useState<InventoryForm>({
        name: initItem.name,
        price: initItem.price,
        availability: initItem.availability,
    });

    useEffect(() => {
        setInventoryForm({
            name: initItem.name,
            price: initItem.price,
            availability: initItem.availability,
        });
    }, [initItem, isOpen]);

    const isItemChanged =
        inventoryForm.name !== initItem.name ||
        inventoryForm.price !== initItem.price ||
        inventoryForm.availability !== initItem.availability;
    const isItemValid = isFormValid(inventoryForm);
    const isEditValid = isItemChanged && isItemValid;

    const executeAction = useActionWithToast(onDismiss);

    const modifyInventoryItem = useInventoryStore((s) => s.modifyInventoryItem);
    const handleModifyItem = () => {
        executeAction(
            () => modifyInventoryItem(initItem.id, inventoryForm),
            "info"
        );
    };

    const deleteInventoryItem = useInventoryStore((s) => s.deleteInventoryItem);
    const handleDeleteItem = () => {
        if (window.confirm(`remove '${initItem.name}' from inventory?`)) {
            executeAction(() => deleteInventoryItem(initItem.id), "info");
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
                        <TextInputField
                            label="name"
                            value={inventoryForm.name}
                            onChange={(newName) => {
                                setInventoryForm({
                                    ...inventoryForm,
                                    name: newName,
                                });
                            }}
                        />
                        <CurrencyIF
                            label="price"
                            value={inventoryForm.price}
                            onChange={(newPrice) =>
                                setInventoryForm({
                                    ...inventoryForm,
                                    price: newPrice,
                                })
                            }
                        />
                    </VStack>
                    <HStack>
                        <Text>is available</Text>
                        <Switch
                            isChecked={inventoryForm.availability}
                            onChange={(e) =>
                                setInventoryForm({
                                    ...inventoryForm,
                                    availability: e.target.checked,
                                })
                            }
                            colorScheme="green"
                        />
                    </HStack>
                </VStack>
            }
            footer={
                <VStack>
                    <AppButton
                        onClick={handleModifyItem}
                        disabled={!isEditValid}
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
