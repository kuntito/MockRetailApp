import { Box, Text, VStack } from "@chakra-ui/react";
import AppHeader from "../../general/AppHeader";
import TextInputField from "../../general/TextInputField";
import { useEffect, useState } from "react";
import AppButton from "../../general/AppButton";
import { Link } from "react-router-dom";

type CustomerInfoForm = {
    name: string;
    postCode: string;
    phoneNumber: string;
};

// TODO properly validate form
const validateCustForm = (form: CustomerInfoForm): boolean => {
    const nameIsValid = form.name.trim().length > 0;
    const postCodeIsValid = form.name.trim().length > 0;
    const phoneIsValid = form.phoneNumber.trim().length > 0;

    return nameIsValid && postCodeIsValid && phoneIsValid;
};

const PlaceOrderCustInfo = () => {
    const [custForm, setCustForm] = useState<CustomerInfoForm>({
        name: "",
        postCode: "",
        phoneNumber: "",
    });

    const [isFormValid, setFormValid] = useState(false);
    useEffect(() => {
        const validationCheck = validateCustForm(custForm);

        setFormValid(validationCheck);
    }, [custForm]);

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
                        <TextInputField
                            label="your name"
                            value={custForm.name}
                            onChange={(newName) => {
                                setCustForm({
                                    ...custForm,
                                    name: newName,
                                });
                            }}
                            isVertical
                        />
                        <TextInputField
                            label="post code"
                            value={custForm.postCode}
                            onChange={(newPostCode) => {
                                setCustForm({
                                    ...custForm,
                                    postCode: newPostCode,
                                });
                            }}
                            isVertical
                        />
                        <TextInputField
                            label="phone number"
                            value={custForm.phoneNumber}
                            onChange={(newPhoneNumber) => {
                                setCustForm({
                                    ...custForm,
                                    phoneNumber: newPhoneNumber,
                                });
                            }}
                            isVertical
                        />
                    </VStack>
                    <Link to={"/placeOrderPayInfo"}>
                        <AppButton disabled={!isFormValid}>
                            make payment
                        </AppButton>
                    </Link>
                </VStack>
            </VStack>
        </VStack>
    );
};

export default PlaceOrderCustInfo;
