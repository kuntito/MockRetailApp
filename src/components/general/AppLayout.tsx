import { Box, Center } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
    return (
        <Center w={"100vw"} h={"100vh"}>
            <Box
                borderWidth={2}
                height={"480px"}
                width={"360px"}
            >
                <Outlet />
            </Box>
        </Center>
    );
};

export default AppLayout;
