import { Box, HStack, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { isStringNotEmpty } from "../../../misc_functions/isStringNotEmpty";
import AppButton from "../../general/AppButton";
import AppHeader from "../../general/AppHeader";
import VerticalTextInputField from "../../general/VerticalTextInputField";

type CardInfo = {
    nameOnCard: string;
    cardNumber: string;
    expiryDate: string;
    cvv: string;
};

// TODO
const validateCardInfo = (cardInfo: CardInfo): boolean => {
    for (const field in cardInfo) {
        const value = cardInfo[field as keyof CardInfo];
        if (!isStringNotEmpty(value)) {
            return false;
        }
    }
    return true;
};

const PlaceOrderPayInfo = () => {
    const [cardInfo, setCardInfo] = useState<CardInfo>({
        nameOnCard: "",
        cardNumber: "",
        expiryDate: "",
        cvv: "",
    });

    const [isInfoValid, setIsInfoValid] = useState(false);
    useEffect(() => {
        const validationCheck = validateCardInfo(cardInfo);
        setIsInfoValid(validationCheck);
    }, [cardInfo]);

    return (
        <VStack>
            <AppHeader>
                <Text>Placing Order: Payment</Text>
            </AppHeader>
            <VStack p={"16px"} w={"100%"} h={"100%"}>
                <Text w={"100%"}>card details, please:</Text>
                <Box h={"24px"} />
                <VStack w={"100%"}>
                    <VerticalTextInputField
                        value={cardInfo.nameOnCard}
                        onChange={(newNameOnCard) => {
                            setCardInfo({
                                ...cardInfo,
                                nameOnCard: newNameOnCard,
                            });
                        }}
                        label="name on card"
                    />
                    <VerticalTextInputField
                        value={cardInfo.cardNumber}
                        onChange={(newCardNumber) => {
                            setCardInfo({
                                ...cardInfo,
                                cardNumber: newCardNumber,
                            });
                        }}
                        label="card number"
                    />
                    <Box h={"12px"} />
                    <HStack>
                        <VerticalTextInputField
                            label="expiry date"
                            subLabel="month/year"
                            value={cardInfo.expiryDate}
                            onChange={(newExpiryDate) => {
                                setCardInfo({
                                    ...cardInfo,
                                    expiryDate: newExpiryDate,
                                });
                            }}
                        />
                        <VerticalTextInputField
                            label="CVV"
                            subLabel="3 digit code behind your card"
                            value={cardInfo.cvv}
                            onChange={(newCVV) => {
                                setCardInfo({
                                    ...cardInfo,
                                    cvv: newCVV,
                                });
                            }}
                        />
                    </HStack>
                </VStack>
                <Box h={"12px"} />
                {PlaceOrderButton(isInfoValid)}
            </VStack>
        </VStack>
    );
};

export default PlaceOrderPayInfo;

const PlaceOrderButton = (isInfoValid: boolean) => {
    const navigate = useNavigate();

    const handlePayment = () => {
        // this where you call the place order function
        const success = true;
        if (success) {
            navigate("/orderPlaced");
        }
    };

    return (
        <AppButton disabled={!isInfoValid} onClick={handlePayment}>
            pay
        </AppButton>
    );
};
