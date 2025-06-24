import { FormControl, FormLabel, VStack } from "@chakra-ui/react";
import type { ReactNode } from "react";

interface Props {
    label: string;
    inputComp: ReactNode;
}

const CustomerInputField = ({ label, inputComp }: Props) => {
    return (
        <FormControl>
            <VStack gap={0}>
                <VStack align={"start"} w={"100%"} gap={0}>
                    <FormLabel margin={0} fontWeight={"normal"}>
                        {label}
                    </FormLabel>
                </VStack>
                {inputComp}
            </VStack>
        </FormControl>
    );
};

export default CustomerInputField;
