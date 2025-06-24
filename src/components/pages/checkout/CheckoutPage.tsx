import { HStack, Text, VStack } from "@chakra-ui/react";
import Page from "../../general/Page";
import ItemList from "../../general/ItemList";
import CartItemListItem from "./components/CartItemListItem";
import useCartStore from "../../../state-management/cartStore";
import AppButton from "../../general/AppButton";
import CurrencyText from "../../general/CurrencyText";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
    return <Page title={"checkout"} content={<Content />} />;
    // return <Content />;
};

export default CheckoutPage;

const Content = () => {
    const cart = useCartStore((s) => s.cart);
    const cartItems = Array.from(cart.values());

    const subTotal = cartItems.reduce((sum, ci) => {
        return sum + ci.quantity * ci.unitPrice;
    }, 0);

    const navigate = useNavigate();
    const handleEnterDetails = () => {
        navigate("customerInfo")
    }

    return (
        <VStack h={"100%"} w={"100%"} pb={"16px"}>
            <VStack w={"100%"} h={"100%"} ps={"16px"} overflow={"auto"}>
                <ItemList
                    data={cartItems}
                    renderItem={(item, idx) => (
                        <CartItemListItem key={idx} cartItem={item} />
                    )}
                />
            </VStack>
            <HStack>
                <Text lineHeight={1}>Total:</Text>
                <CurrencyText fontSize={"0.9rem"}>{subTotal}</CurrencyText>
            </HStack>
            <AppButton onClick={handleEnterDetails} bg={"palette.success"} color={"palette.50"}>
                continue
            </AppButton>
        </VStack>
    );
};
