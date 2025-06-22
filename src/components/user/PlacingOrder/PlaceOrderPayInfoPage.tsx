import { Box, HStack, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { isStringNotEmpty } from "../../../misc_functions/isStringNotEmpty";
import type { CustomerInfo } from "../../../models/CustomerInfo";
import useCartStore from "../../../state-management/cartStore";
import useOrderApiStore from "../../../state-management/orderApiStore";
import AppButton from "../../general/AppButton";
import AppHeader from "../../general/AppHeader";
import VerticalTextInputField from "../../general/VerticalTextInputField";
import useActionWithToast from "../../../hooks/useActionWithToast";

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

const PlaceOrderPayInfoPage = () => {
    const [cardInfo, setCardInfo] = useState<CardInfo>({
        nameOnCard: "",
        cardNumber: "",
        expiryDate: "",
        cvv: "",
    });

    const [isCardInfoValid, setIsCardInfoValid] = useState(false);
    useEffect(() => {
        const validationCheck = validateCardInfo(cardInfo);
        setIsCardInfoValid(validationCheck);
    }, [cardInfo]);

    return (
        <VStack>
            <AppHeader>
                <Text>Placing Order: Payment</Text>
            </AppHeader>
            <VStack p={"16px"} w={"100%"} h={"100%"}>
                <VStack>
                    <Text>your order costs ???</Text>
                    <Text w={"100%"}>card details, please:</Text>
                </VStack>
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
                <PlaceOrderButton isCardInfoValid={isCardInfoValid} />
                {/* {PlaceOrderButton(true)} */}
            </VStack>
        </VStack>
    );
};

export default PlaceOrderPayInfoPage;

interface PlaceOrderProps {
    isCardInfoValid: boolean;
}

const PlaceOrderButton = ({ isCardInfoValid }: PlaceOrderProps) => {
    const [searchParams] = useSearchParams();
    const customerInfo: CustomerInfo = {
        name: searchParams.get("name") || "NA",
        postCode: searchParams.get("postCode") || "NA",
        phoneNumber: searchParams.get("phoneNumber") || "NA",
    };

    const navigate = useNavigate();
    const clearCart = useCartStore(s => s.clearCart);
    const onOrderSuccess = () => {
        clearCart();
        navigate("/");
    };    

    const executeAction = useActionWithToast(() => onOrderSuccess());

    const getCartItems = useCartStore((s) => s.getCartItems);
    const orderItems = getCartItems();

    const placeOrder = useOrderApiStore(s => s.placeOrder)
    const handlePayment = () => {
        const isPaymentSuccessful = true;
        if (isPaymentSuccessful) {
            executeAction(() => placeOrder(customerInfo, orderItems))
        }
    };

    return (
        <AppButton disabled={!isCardInfoValid} onClick={handlePayment}>
            pay
        </AppButton>
    );
};
