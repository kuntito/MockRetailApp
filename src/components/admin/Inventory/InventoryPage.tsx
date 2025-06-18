import { HStack, Text, VStack } from "@chakra-ui/react";
import { dummyProducts } from "../../../dummyData/dummyProducts";
import AppHeader from "../../general/AppHeader";
import ItemList from "../../general/ItemList";
import InventoryListItem from "./comp/InventoryListItem";
import AppButton from "../../general/AppButton";
import { useState } from "react";
import AddToInventoryDialog from "./comp/AddToInventoryDialog";
import useInventoryStore from "../../../state-management/inventoryStore";

const InventoryPage = () => {
    const inventory = useInventoryStore(s => s.inventory);
    const data = Array.from(inventory.values());
    // const data = dummyProducts;

    const [isDiagOpen, setIsDiagOpen] = useState(false);
    const onDismiss = () => {
        setIsDiagOpen(false);
    };

    return (
        <VStack h={"100%"} pb={"16px"}>
            <AppHeader>
                <Text>Inventory</Text>
            </AppHeader>
            <VStack
                // border={"2px"}
                w={"100%"}
                h={"100%"}
                ps={"16px"}
                overflow={"auto"}
            >
                <ItemList
                    data={data}
                    renderItem={(item, idx) => (
                        <InventoryListItem product={item} key={idx} />
                    )}
                />
            </VStack>
            <HStack px={"16px"} w={"100%"} justifyContent={"end"}>
                <AppButton onClick={() => setIsDiagOpen(true)}>
                    add item
                </AppButton>
            </HStack>
            {isDiagOpen && (
                <AddToInventoryDialog
                    isOpen={isDiagOpen}
                    onDismiss={onDismiss}
                />
            )}
        </VStack>
    );
};

export default InventoryPage;
