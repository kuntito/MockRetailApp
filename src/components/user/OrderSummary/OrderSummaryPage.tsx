import { Center, HStack, Text, VStack } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import useActionWithToast from "../../../hooks/useActionWithToast";
import useCartStore from "../../../state-management/cartStore";
import useOrderApiStore from "../../../state-management/orderApiStore";
import AppButton from "../../general/AppButton";
import AppHeader from "../../general/AppHeader";
import CurrencyText from "../../general/CurrencyText";
import ItemList from "../../general/ItemList";
import OrderListItem from "./comp/OrderListItem";

const OrderSummaryPage = () => {
    const getCartItems = useCartStore((s) => s.getCartItems);
    const orderItems = getCartItems();

    const navigate = useNavigate();
    
    // const clearCart = useCartStore((s) => s.clearCart);
    // const placeOrder = useOrderApiStore((s) => s.placeOrder);
    // const onOrderSuccess = () => {
    //     clearCart();
    //     navigate("/");
    // };

    // const executeAction = useActionWithToast(() => onOrderSuccess());

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

    const handlePlaceOrder = () => {
        // const dummyCustomerInfo: CustomerInfo = getRandomCustomer();
        // executeAction(() => placeOrder(dummyCustomerInfo, orderItems));

        // this point, we navigate to the customer info page
        navigate("/placeOrderCustInfo");
    };

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
                <AppButton
                    onClick={handlePlaceOrder}
                    bg={"palette.success"}
                    color={"palette.50"}
                >
                    Place Order
                </AppButton>
            </VStack>
        </VStack>
    );
};

export default OrderSummaryPage;
