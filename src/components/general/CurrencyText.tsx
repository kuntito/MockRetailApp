import type { TextProps } from "@chakra-ui/react";
import PrefixedText from "./PrefixedText";

interface Props extends TextProps {
    children: number;
    textWidth?: string;
}

const CurrencyText = ({ children, textWidth, ...rest }: Props) => {
    const amount = children.toFixed(2);
    return (
        <PrefixedText
            prefix="£"
            textWidth={textWidth ? textWidth : "3.5rem"}
            fontFamily={"monospace"}
            {...rest}
        >
            {amount}
        </PrefixedText>
    );
};

export default CurrencyText;
