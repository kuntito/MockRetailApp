import type { TextProps } from "@chakra-ui/react";
import { HStack, Text } from "@chakra-ui/react";

interface Props extends TextProps {
    children: number;
}

const CurrencyText = ({children, ...rest}: Props) => {
    return (
        <HStack
            gap={0.5}
            // border={"2px solid"}
        >
            <Text {...rest}>£</Text>
            <Text {...rest} width={"3.5rem"}>{children.toFixed(2)}</Text>
        </HStack>
    );
};

export default CurrencyText;
