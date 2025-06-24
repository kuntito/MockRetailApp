import { Box, Input, Text, VStack } from "@chakra-ui/react";
import Page from "../../general/Page";
import CustomerInputField from "./components/CustomerInputField";
import type { CustomerInfo } from "../../../types/CustomerInfo";
import { useEffect, useState } from "react";
import AppButton from "../../general/AppButton";
import useActionWithToast from "../../../utils/useActionWithToast";
import useCartStore from "../../../state-management/cartStore";
import { useNavigate } from "react-router-dom";
import useMockApiStore from "../../../state-management/mockApiStore";

// TODO properly validate form
const validateCustForm = (form: CustomerInfo): boolean => {
    const nameIsValid = form.name.trim().length > 0;
    const postCodeIsValid = form.name.trim().length > 0;
    const phoneIsValid = form.phoneNumber.trim().length > 0;

    return nameIsValid && postCodeIsValid && phoneIsValid;
};

const CustomerInfoPage = () => {
    return <Page title={"Customer Info"} content={<Content />} />;
};

export default CustomerInfoPage;

const Content = () => {
    const [custInfo, setCustInfo] = useState<CustomerInfo>({
        name: "",
        postCode: "",
        phoneNumber: "",
    });

    const [isInfoValid, setIsInfoValid] = useState(false);
    useEffect(() => {
        const validationCheck = validateCustForm(custInfo);

        setIsInfoValid(validationCheck);
    }, [custInfo]);

    const {cart, clearCart} = useCartStore(s => s);
    const cartItems = Array.from(cart.values());

    const navigate = useNavigate();
    const onOrderSuccess = () => {
        clearCart();
        navigate("/");
    }
    const executeAction = useActionWithToast(onOrderSuccess);
    const placeOrder = useMockApiStore(s => s.placeOrder);

    const handlePlaceOrder = () => {
        executeAction(() => placeOrder(
            custInfo,
            cartItems
        ))
    }

    return (
        <VStack padding={"16px"} w={"100%"} h={"100%"}>
            <Text w={"100%"}>to deliver your items, i'd need your info:</Text>
            <Box h={"32px"} />
            <VStack w={"100%"} gap={2}>
                <CustomerInputField
                    label="your name"
                    inputComp={
                        <Input
                            type="text"
                            value={custInfo.name}
                            onChange={(e) => {
                                setCustInfo({
                                    ...custInfo,
                                    name: e.target.value,
                                });
                            }}
                        />
                    }
                />
                <CustomerInputField
                    label="post code"
                    inputComp={
                        <Input
                            type="text"
                            value={custInfo.postCode}
                            onChange={(e) => {
                                setCustInfo({
                                    ...custInfo,
                                    postCode: e.target.value,
                                });
                            }}
                        />
                    }
                />
                <CustomerInputField
                    label="phone number"
                    inputComp={
                        <Input
                            type="text"
                            value={custInfo.phoneNumber}
                            onChange={(e) => {
                                setCustInfo({
                                    ...custInfo,
                                    phoneNumber: e.target.value,
                                });
                            }}
                        />
                    }
                />
            </VStack>
            <Box h={"32px"} />
            <AppButton
                disabled={!isInfoValid}
                bg={"palette.success"}
                color={"palette.50"}
                onClick={handlePlaceOrder}
            >
                place order
            </AppButton>
        </VStack>
    );
};
