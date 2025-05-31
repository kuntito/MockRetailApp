import { Box, VStack } from "@chakra-ui/react";
import Header from "../general/Header";
import ProductList from "./ProductList";
import CartBadge from "../general/CartBadge";

const ProductDisplayPage = () => {
    return (
        <VStack gap={0} height={"100%"}>
            <Header>
                <Box flex={1} />
                <CartBadge />
            </Header>
            <Box
                paddingStart={"16px"}
                overflow={"auto"}
                // border={"2px solid red"}
                w={"100%"}
            >
                <ProductList />
            </Box>
        </VStack>
    );
};

export default ProductDisplayPage;
