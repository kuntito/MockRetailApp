import type { TextProps } from "@chakra-ui/react";
import PrefixedText from "./PrefixedText";

interface Props extends TextProps {
    children: number;
}

const CurrencyText = ({ children, ...rest }: Props) => {
    const amount = children.toFixed(2);
    return (
        <PrefixedText
            prefix="£"
            textWidth={"3.5rem"}
            fontFamily={"monospace"}
            {...rest}
        >
            {amount}
        </PrefixedText>
    );
};

export default CurrencyText;
