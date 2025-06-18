import { Divider, HStack, useColorMode, VStack, type StackProps } from "@chakra-ui/react";
import { useEffect, type ReactNode } from "react";
import { useLocation } from "react-router-dom";

interface Props extends StackProps {
    children?: ReactNode;
}

const AppHeader = ({ children, ...rest }: Props) => {
    const location = useLocation();
    const { setColorMode } = useColorMode();
    const isAdmin = location.pathname.startsWith("/admin");

    useEffect(() => {
        setColorMode(isAdmin ? "dark" : "light");
    }, [isAdmin, setColorMode]);

    const bgColor = isAdmin ? "palette.600" : "palette.200";
    const dividerColor = isAdmin ? "palette.50" : "palette.700";
    return (
        <VStack w={"100%"} gap={0} flexShrink={0}>
            <HStack
                flexShrink={0}
                bg={bgColor}
                h={"40px"}
                w={"100%"}
                paddingX={"16px"}
                justifyContent={"center"}
                {...rest}
            >
                {children}
            </HStack>
            <Divider bg={dividerColor} height={0.4}/>
        </VStack>
    );
};

export default AppHeader;