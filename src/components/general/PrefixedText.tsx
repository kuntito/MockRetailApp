import type { TextProps } from "@chakra-ui/react";
import { HStack, Text } from "@chakra-ui/react";

interface Props extends TextProps {
    prefix: string;
    textWidth?: string;
    children: number | string;
}

const PrefixedText = ({ prefix, textWidth, children, ...rest }: Props) => {
    return (
        <HStack gap={0.5}>
            <Text lineHeight={1} {...rest}>{prefix}</Text>
            <Text  lineHeight={1} width={textWidth} {...rest}>
                {children}
            </Text>
        </HStack>
    );
};

export default PrefixedText;
