import { Box, HStack, Text, VStack } from "@chakra-ui/react";
import Header from "../general/Header";
import ScrollableList from "../general/ScrollableList";

import useInventoryStore from "../../state-management/inventoryStore";
import AppButton from "../general/AppButton";
import InventoryListItem from "./InventoryListItem";
import AddInventoryDialog from "./AddInventoryDialog";
import { useState } from "react";

const InventoryPage = () => {
    const inventory = useInventoryStore(s => s.items);
    const data = Array.from(inventory.values());
 
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const onDismiss = () => {
        setIsDialogOpen(false);
    }
    
    const onInventoryItemClick = () => {

    };

    const handleAddButtonClick = () => {
        setIsDialogOpen(true);
    }

    return (
        <VStack gap={0} height={"100%"}>
            <Header justifyContent={"center"}>
                <Text>Admin Dashboard</Text>
            </Header>
            <VStack w={"100%"} h={"100%"} minHeight={0} py={"16px"} px={"10px"}>
                <Box
                    borderRadius={"lg"}
                    border={"0.3px solid"}
                    borderColor={"palette.700"}
                    overflow={"auto"}
                    w={"100%"}
                    h={"100%"}
                    alignContent={"center"}
                    justifyItems={"center"}
                >
                    {data.length ? <ScrollableList
                        data={data}
                        renderItem={(product, idx) => (
                            <InventoryListItem
                                key={idx}
                                product={product}
                                onClick={onInventoryItemClick}
                            />
                        )}
                    /> : <Text> no items </Text>}
                    
                </Box>
                <HStack
                    justifyContent={"end"}
                    // border={"2px solid red"}
                    w={"100%"}
                >
                    <AppButton onClick={handleAddButtonClick} bg={"palette.600"}>add item</AppButton>
                    <AddInventoryDialog isOpen={isDialogOpen} onDismiss={onDismiss} />
                </HStack>
            </VStack>
        </VStack>
    );
};

export default InventoryPage;
