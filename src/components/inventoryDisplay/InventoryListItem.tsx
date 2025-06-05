import { HStack, Text } from "@chakra-ui/react";
import CurrencyText from "../general/CurrencyText";
import type { Product } from "../../models/Product";
import { useState } from "react";
import EditInventoryItemDialog from "./EditInventoryItemDialog";

interface Props {
    product: Product;
    onClick: () => void;
}

const InventoryListItem = ({ product, onClick }: Props) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const onDismiss = () => {
        setIsDialogOpen(false);
    };

    const opacity = product.availability ? 1 : 0.5
    return (
        <>
            <HStack opacity={opacity} w={"100%"} ps={"16px"}>
                <HStack flex={1}>
                    <Text cursor={"pointer"} onClick={() => {
                        onClick();
                        setIsDialogOpen(true);
                    }}>
                        {product.name}
                    </Text>
                </HStack>
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
