import { useState } from "react";
import useInventoryStore from "../../../../state-management/inventoryStore";
import useActionWithToast from "../../../../utils/useActionWithToast";
import AppDialog from "../../../general/AppDialog";
import {
    VStack,
    Text,
    InputGroup,
    Input,
    InputLeftElement,
} from "@chakra-ui/react";
import AppButton from "../../../general/AppButton";
import InventoryInputField from "./InventoryInputField";

interface Props {
    isOpen: boolean;
    dismissDialog: () => void;
}

const AddToInventoryDialog = ({ isOpen, dismissDialog }: Props) => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const resetState = () => {
        setName("");
        setPrice(0);
    };

    const isProductValid = price > 0 && name.trim();

    const onDismiss = () => {
        dismissDialog();
        resetState();
    };

    const addToInventory = useInventoryStore((s) => s.addToInventory);
    const executeAction = useActionWithToast(onDismiss);

    const handleAddToInventory = () => {
        executeAction(() => addToInventory(name, price));
    };

    return (
        <AppDialog
            isOpen={isOpen}
            onDismiss={onDismiss}
            body={
                <VStack>
                    <Text>add to inventory</Text>
                    <VStack>
                        <InventoryInputField
                            label="name"
                            inputComp={
                                <InputGroup>
                                    <Input
                                        w={"200px"}
                                        type="text"
                                        value={name}
                                        onChange={(e) => {
                                            setName(e.target.value);
                                        }}
                                    />
                                </InputGroup>
                            }
                        />
                        <InventoryInputField
                            label="price"
                            inputComp={
                                <InputGroup>
                                    <InputLeftElement
                                        pointerEvents={"none"}
                                        children="£"
                                    />
                                    <Input
                                        w={"200px"}
                                        pl={7}
                                        type="number"
                                        value={price === 0 ? "" : price}
                                        onChange={(e) => {
                                            const val = parseFloat(
                                                e.target.value
                                            );
                                            setPrice(isNaN(val) ? 0 : val);
                                        }}
                                    />
                                </InputGroup>
                            }
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
