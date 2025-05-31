import { Divider, HStack, VStack, type StackProps } from "@chakra-ui/react";
import type { ReactNode } from "react";

interface Props extends StackProps {
    children?: ReactNode;
}

const Header = ({ children, ...rest }: Props) => {
    return (
        <VStack w={"100%"} gap={0} flexShrink={0}>
            <HStack
                flexShrink={0}
                bg={"palette.200"}
                h={"40px"}
                w={"100%"}
                paddingX={"16px"}
                {...rest}
            >
                {children}
            </HStack>
            <Divider bg={"palette.700"} height={0.5}/>
        </VStack>
    );
};

export default Header;
