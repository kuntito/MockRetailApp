import { HStack, Text } from "@chakra-ui/react";
import type { Product } from "../../../../models/Product";
import CurrencyText from "../../../general/CurrencyText";
import EditInventoryItemDialog from "./EditInventoryItemDialog";
import { useState } from "react";

interface Props {
    product: Product;
}

const InventoryListItem = ({ product }: Props) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const onDismiss = () => {
        setIsDialogOpen(false);
    };

    const opacity = product.availability ? 1 : 0.5;

    return (
        <>
            <HStack opacity={opacity} w={"100%"}>
                <Text
                    cursor={"pointer"}
                    onClick={() => setIsDialogOpen(true)}
                    flex={1}
                >
                    {product.name}
                </Text>
                <CurrencyText>{product.price}</CurrencyText>
            </HStack>
            <EditInventoryItemDialog
                isOpen={isDialogOpen}
                onDismiss={onDismiss}
                initItem={product}
            />
        </>
    );
};

export default InventoryListItem;