import { Box, Button, HStack, Text, VStack } from "@chakra-ui/react";
import orderItemsData from "./data/orderData";
import OrderListItem from "./components/checkout/OrderListItem";
import AppButton from "./components/general/AppButton";
import CurrencyText from "./components/general/CurrencyText";
import Header from "./components/general/Header";

const TG = () => {
    // i want to replicate the situation
    // a container
    // with two things
    // a box that overflows and a button underneath

    // i want to confirm that the overflow="auto" is what pushes the button outside the component

    // it does cause the problem but the solution here is applying
    // minH={0}
    // overflow={"auto"}
    // on the box, but for some reason, it doesn't work for my use case.

    const arr = new Array(100).fill(0);
    const data = orderItemsData.slice(0, 19);
    return (
        <VStack h={"100%"} w={"100%"}>
            <Header justifyContent={"center"}>
                <Text>Order Summary</Text>
            </Header>
            <Box
                minH={0}
                overflow={"auto"}
                flex={1}
                h={"100%"}
                w={"100%"}
                border={"2px solid red"}
            >
                {/* {arr.map((_) => (
                    <Text>some line</Text>
                ))} */}
                {data.map((x, idx) => (
                    <OrderListItem orderItem={x} key={idx} />
                ))}
            </Box>
            <VStack border={"2px"}>
                <HStack>
                    <Text lineHeight={1}>Total:</Text>
                    <CurrencyText fontSize={"0.9rem"}>{23}</CurrencyText>
                </HStack>
                <AppButton>Pay</AppButton>
            </VStack>
        </VStack>
    );
};

export default TG;
