import { FormControl, FormLabel, HStack, VStack } from "@chakra-ui/react";
import type { ReactNode } from "react";

interface Props {
    label: string;
    inputComp: ReactNode;
}

const InventoryInputField = ({ label, inputComp }: Props) => {
    return (
        <FormControl>
            <HStack gap={"16px"}>
                <VStack align={"start"} w={"100%"} gap={0}>
                    <FormLabel margin={0} fontWeight={"normal"}>
                        {label}
                    </FormLabel>
                </VStack>
                {inputComp}
            </HStack>
        </FormControl>
    );
};

export default InventoryInputField;
