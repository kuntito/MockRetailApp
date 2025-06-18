import { VStack, Text, Center, HStack } from "@chakra-ui/react";
import AppHeader from "../../general/AppHeader";
import useCartStore from "../../../state-management/cartStore";
import OrderListItem from "./comp/OrderListItem";
import ItemList from "../../general/ItemList";
import { Link } from "react-router-dom";
import { dummyOrderItems } from "../../../dummyData/dummyOrderItems";
import AppButton from "../../general/AppButton";
import CurrencyText from "../../general/CurrencyText";

const OrderSummaryPage = () => {
    const getCartItems = useCartStore((s) => s.getCartItems);
    const orderItems = getCartItems();

    // const orderItems = dummyOrderItems;

    if (orderItems.length === 0) {
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

    const totalOrderCost = orderItems.reduce(
        (sum, oi) => sum + oi.quantity * oi.priceAtOrderTime,
        0
    );
    return (
        <VStack h={"100%"} pb={"16px"}>
            <AppHeader>
                <Text>OrderSummary</Text>
            </AppHeader>
            <VStack
                // border={"2px"}
                w={"100%"}
                h={"100%"}
                ps={"16px"}
                overflow={"auto"}
            >
                <ItemList
                    data={orderItems}
                    renderItem={(item, idx) => (
                        <OrderListItem orderItem={item} key={idx} />
                    )}
                />
            </VStack>
            <VStack>
                <HStack>
                    <Text lineHeight={1}>Total:</Text>
                    <CurrencyText fontSize={"0.9rem"}>
                        {totalOrderCost}
                    </CurrencyText>
                </HStack>
                <Link to={"/placeOrderCustInfo"}>
                    <AppButton bg={"palette.success"} color={"palette.50"}>
                        Place Order
                    </AppButton>
                </Link>
            </VStack>
        </VStack>
    );
};

export default OrderSummaryPage;
