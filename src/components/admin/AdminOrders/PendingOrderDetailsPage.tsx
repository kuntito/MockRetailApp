import { HStack, Image, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useActionWithToast from "../../../hooks/useActionWithToast";
import type { Order } from "../../../models/Order";
import type { OrderItem } from "../../../models/OrderItem";
import useOrderApiStore from "../../../state-management/orderApiStore";
import AppButton from "../../general/AppButton";
import AppHeader from "../../general/AppHeader";
import ItemList from "../../general/ItemList";
import AdminOrderItemListItem from "./comp/AdminOrderItemListItem";
import UnattendedItemsDialog from "./comp/UnattendedItemsDialog";

const PendingOrderDetailsPage = () => {
    const { orderId } = useParams<{ orderId: string }>();
    const allOrders = useOrderApiStore((s) => s.orders);
    const allOrderItems = Array.from(
        useOrderApiStore((s) => s.orderItems).values()
    );

    if (!orderId) {
        return <Text>this order doesn't exist</Text>;
    }

    const order = allOrders.get(orderId);
    const orderItems = allOrderItems.filter((item) => item.orderId === orderId);

    if (!order) {
        return <Text>can't find order</Text>;
    }

    if (orderItems.length === 0) {
        return <Text>order has no items</Text>;
    }

    return <OrderDetailsContent order={order} orderItems={orderItems} />;
};

const OrderDetailsContent = ({
    order,
    orderItems,
}: {
    order: Order;
    orderItems: OrderItem[];
}) => {
    const [isDialogOpen, setDialogOpen] = useState(false);
    const onDismiss = () => {
        setDialogOpen(false);
    };

    const navigate = useNavigate();

    const ifMarkCompleteSuccess = () => {
        onDismiss();
        navigate("/admin/orders");
    };
    const executeAction = useActionWithToast(ifMarkCompleteSuccess);

    const markOrderAsComplete = useOrderApiStore((s) => s.markOrderAsComplete);

    const handleMarkComplete = () => {
        const isEveryItemChecked = orderItems.every(
            (item) => item.isAttendedTo
        );

        if (isEveryItemChecked) {
            executeAction(() => markOrderAsComplete(order.id), "info");
        } else {
            setDialogOpen(true);
        }
    };

    return (
        <VStack w={"100%"} h={"100%"}>
            <AppHeader>
                <VStack gap={0}>
                    <Text fontSize={"0.9rem"}>{order.custName}'s order</Text>
                    <Text fontSize={"x-small"}>03-mar-2025</Text>
                </VStack>
            </AppHeader>
            <VStack
                w={"100%"}
                h={"100%"}
                px={"16px"}
                pt={"16px"}
                pb={"10px"}
                overflow={"hidden"}
            >
                <VStack
                    w={"100%"}
                    border={"1px solid"}
                    borderColor={"palette.500"}
                    borderRadius={"16px"}
                    padding={"16px"}
                >
                    <HStack w={"100%"}>
                        <Image src="/assets/ic_home.svg" />
                        <Text>{order.custAddress}</Text>
                    </HStack>
                    <HStack w={"100%"}>
                        <Image src="/assets/ic_phone.svg" />
                        <Text>{order.custPhone}</Text>
                    </HStack>
                </VStack>
                <VStack
                    // border={"2px solid red"}
                    w={"100%"}
                    h={"100%"}
                    overflow={"auto"}
                >
                    <ItemList
                        data={orderItems}
                        renderItem={(item, idx) => (
                            <AdminOrderItemListItem
                                orderItem={item}
                                key={idx}
                            />
                        )}
                    />
                </VStack>
                <AppButton onClick={handleMarkComplete}>
                    mark as complete
                </AppButton>
            </VStack>
            {isDialogOpen && (
                <UnattendedItemsDialog
                    isOpen={isDialogOpen}
                    onDismiss={onDismiss}
                    onMarkComplete={() =>
                        executeAction(
                            () => markOrderAsComplete(order.id),
                            "info"
                        )
                    }
                />
            )}
        </VStack>
    );
};

export default PendingOrderDetailsPage;
