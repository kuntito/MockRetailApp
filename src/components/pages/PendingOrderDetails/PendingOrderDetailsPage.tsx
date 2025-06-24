import { HStack, Text, VStack, Image } from "@chakra-ui/react";
import Page from "../../general/Page";
import { useNavigate, useParams } from "react-router-dom";
import useMockApiStore from "../../../state-management/mockApiStore";
import type { Order } from "../../../models/Order";
import type { OrderItem } from "../../../models/OrderItem";
import AppButton from "../../general/AppButton";
import ItemList from "../../general/ItemList";
import PendingOrderItemListItem from "./components/PendingOrderItemListItem";
import UnattendedItemsDialog from "./components/UnattendedItemsDialog";
import { useState } from "react";
import useActionWithToast from "../../../utils/useActionWithToast";

const PendingOrderDetailsPage = () => {
    const { orderId } = useParams<{ orderId: string }>();
    const allOrders = useMockApiStore((s) => s.orders);
    const allOrderItems = Array.from(
        useMockApiStore((s) => s.orderItems).values()
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

    return (
        <Page
            title={`${order.customerName}'s order`}
            content={<Content order={order} orderItems={orderItems} />}
        />
    );
};

export default PendingOrderDetailsPage;

const Content = ({
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

    const markOrderAsComplete = useMockApiStore((s) => s.markOrderAsComplete);

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
                        <Text>{order.customerPostCode}</Text>
                    </HStack>
                    <HStack w={"100%"}>
                        <Image src="/assets/ic_phone.svg" />
                        <Text>{order.customerPhone}</Text>
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
                            <PendingOrderItemListItem
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
