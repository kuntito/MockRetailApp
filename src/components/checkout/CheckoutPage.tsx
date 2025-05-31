import { Box, HStack, Text, VStack } from "@chakra-ui/react";
import orderItemsData from "../../data/orderData";
import AppButton from "../general/AppButton";
import CurrencyText from "../general/CurrencyText";
import Header from "../general/Header";
import OrderListItem from "./OrderListItem";
import ScrollableList from "../general/ScrollableList";

const CheckoutPage = () => {
    const data = orderItemsData.slice(0, 19);
    const total = orderItemsData.reduce(
        (sum, oi) => sum + oi.quantity * oi.unitPrice,
        0
    );
    return (
        <VStack gap={0} h={"100%"}>
            <Header justifyContent={"center"}>
                <Text>Order Summary</Text>
            </Header>
            <VStack h={"100%"} w={"100%"} minH={0} gap={"16px"} py={"16px"} px={"16px"}>
                <Box
                    borderRadius={"lg"}
                    border={"0.3px solid"}
                    borderColor={"palette.200"}
                    minH={0}
                    overflow={"auto"}
                    flex={1}
                    h={"100%"}
                    w={"100%"}
                >
                    <ScrollableList
                        data={data}
                        renderItem={(orderItem, idx) => (
                            <OrderListItem orderItem={orderItem} key={idx} />
                        )}
                    />
                    {/* {data.map((x, idx) => (
                        
                    ))} */}
                </Box>
                <VStack>
                    <HStack>
                        <Text lineHeight={1}>Total:</Text>
                        <CurrencyText fontSize={"0.9rem"}>{total}</CurrencyText>
                    </HStack>
                    <AppButton bg={"palette.success"} color={"palette.50"}>Pay</AppButton>
                </VStack>
            </VStack>
        </VStack>
    );
};

export default CheckoutPage;
