import { Box, Center, useColorMode } from "@chakra-ui/react";
import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

const AppLayout = () => {
    const location = useLocation();
    const { setColorMode } = useColorMode();
    const isAdmin = location.pathname.startsWith("/admin");

    useEffect(() => {
        setColorMode(isAdmin ? "dark" : "light");
    }, [isAdmin, setColorMode]);

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