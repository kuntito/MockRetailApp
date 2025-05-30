import { Box, Center, VStack } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Header from "./Header";

const AppLayout = () => {
    return (
        <Center w={"100vw"} h={"100vh"}>
            <VStack gap={0} borderWidth={2} height={"480px"} width={"360px"}>
                <Header />
                <Box padding={"16px"} overflow={"hidden"}>
                    <Outlet />
                </Box>
            </VStack>
        </Center>
    );
};

export default AppLayout;
