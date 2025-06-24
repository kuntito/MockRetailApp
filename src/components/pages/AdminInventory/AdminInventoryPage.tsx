import { HStack, VStack } from "@chakra-ui/react";
import { useState } from "react";
import useInventoryStore from "../../../state-management/inventoryStore";
import AppButton from "../../general/AppButton";
import ItemList from "../../general/ItemList";
import Page from "../../general/Page";
import AddToInventoryDialog from "./components/AddToInventoryDialog";
import InventoryListItem from "./components/InventoryListItem";

const AdminInventoryPage = () => {
    return <Page title="inventory" content={<Content />} />;
};

export default AdminInventoryPage;

const Content = () => {
    const { itemMap } = useInventoryStore((s) => s);
    const items = Array.from(itemMap.values());


    const [isDiagOpen, setIsDiagOpen] = useState(false);
    const dismissDialog = () => {
        setIsDiagOpen(false);
    };

    return (
        <VStack w={"100%"} h={"100%"} pb={"16px"}>
            <VStack w={"100%"} h={"100%"} ps={"16px"} overflow={"auto"}>
                <ItemList
                    data={items}
                    renderItem={(item, idx) => (
                        <InventoryListItem key={idx} product={item} />
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
                    dismissDialog={dismissDialog}
                />
            )}
        </VStack>
    );
};
