import {
    Box,
    Button,
    Center,
    HStack,
    Image,
    Text,
    VStack,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import ArrowBackIcon from "../../assets/ic_back.svg";
import useCartStore from "../../state-management/cartStore";
import AppButton from "../general/AppButton";
import CurrencyText from "../general/CurrencyText";
import Header from "../general/Header";
import ScrollableList from "../general/ScrollableList";
import OrderListItem from "./OrderListItem";

const CheckoutPage = () => {
    // const data = useCartStore(s => [...s.state.cartItems.values()]);
    const cartItems = useCartStore((s) => s.state.cartItems);
    const data = Array.from(cartItems.values());
    // const data = orderItemsData;
    // console.log(data);

    const navigate = useNavigate();

    if (data.length === 0) {
        return (
            <Center w={"100%"} h={"100%"}>
                <VStack>
                    <Text> no items in cart</Text>
                    <Link to="/">
                        <Text textDecor={"underline"}>add items</Text>
                    </Link>
                </VStack>
            </Center>
        );
    }

    const total = data.reduce((sum, oi) => sum + oi.quantity * oi.unitPrice, 0);

    return (
        <VStack gap={0} h={"100%"}>
            <Header justifyContent={"center"}>
                <Button
                    onClick={() => navigate(-1)}
                    position="absolute"
                    left="16px"
                    variant="ghost"
                    p={2}
                >
                    <Image src={ArrowBackIcon} w="16px" />
                </Button>
                <Text>Order Summary</Text>
            </Header>
            <VStack
                // h={"100%"}
                w={"100%"}
                minH={0}
                gap={"16px"}
                py={"16px"}
                px={"8px"}
            >
                <Box
                    borderRadius={"lg"}
                    border={"0.3px solid"}
                    borderColor={"palette.200"}
                    minH={0}
                    overflow={"auto"}
                    flex={1}
                    paddingX={"8px"}
                    // h={"100%"}
                    w={"100%"}
                >
                    <ScrollableList
                        data={data}
                        renderItem={(orderItem, idx) => (
                            <OrderListItem orderItem={orderItem} key={idx} />
                        )}
                    />
                </Box>
                <VStack>
                    <HStack>
                        <Text lineHeight={1}>Total:</Text>
                        <CurrencyText fontSize={"0.9rem"}>{total}</CurrencyText>
                    </HStack>
                    <AppButton bg={"palette.success"} color={"palette.50"}>
                        Pay
                    </AppButton>
                </VStack>
            </VStack>
        </VStack>
    );
};

export default CheckoutPage;
