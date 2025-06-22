import { Box, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import AppButton from "../../general/AppButton";
import AppHeader from "../../general/AppHeader";
import VerticalTextInputField from "../../general/VerticalTextInputField";
import { useNavigate } from "react-router-dom";
import type { CustomerInfo } from "../../../models/CustomerInfo";

// TODO properly validate form
const validateCustForm = (form: CustomerInfo): boolean => {
    const nameIsValid = form.name.trim().length > 0;
    const postCodeIsValid = form.name.trim().length > 0;
    const phoneIsValid = form.phoneNumber.trim().length > 0;

    return nameIsValid && postCodeIsValid && phoneIsValid;
};

const PlaceOrderCustInfoPage = () => {
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

    return (
        <VStack>
            <AppHeader>
                <Text>Placing Order: Info</Text>
            </AppHeader>
            <VStack paddingX={"16px"} w={"100%"} h={"100%"} align={"start"}>
                <Text>to deliver your items, can i get your info</Text>
                <Box h={"32px"} />
                <VStack w={"100%"}>
                    <VStack w={"100%"} gap={2}>
                        <VerticalTextInputField
                            label="your name"
                            value={custInfo.name}
                            onChange={(newName) => {
                                setCustInfo({
                                    ...custInfo,
                                    name: newName,
                                });
                            }}
                        />
                        <VerticalTextInputField
                            label="post code"
                            value={custInfo.postCode}
                            onChange={(newPostCode) => {
                                setCustInfo({
                                    ...custInfo,
                                    postCode: newPostCode,
                                });
                            }}
                        />
                        <VerticalTextInputField
                            label="phone number"
                            value={custInfo.phoneNumber}
                            onChange={(newPhoneNumber) => {
                                setCustInfo({
                                    ...custInfo,
                                    phoneNumber: newPhoneNumber,
                                });
                            }}
                        />
                    </VStack>
                    {ContinueToPayment(custInfo, isInfoValid)}
                </VStack>
            </VStack>
        </VStack>
    );
};

export default PlaceOrderCustInfoPage;

const ContinueToPayment = (custInfo: CustomerInfo, isInfoValid: boolean) => {
    const navigate = useNavigate();

    const params = new URLSearchParams({
        name: custInfo.name,
        postCode: custInfo.postCode,
        phoneNumber: custInfo.phoneNumber,
    });

    return (
        <AppButton
            disabled={!isInfoValid}
            onClick={() => navigate(`/placeOrderPayInfo?${params.toString()}`)}
        >
            make payment
        </AppButton>
    );
};
