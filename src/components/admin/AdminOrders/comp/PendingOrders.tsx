import { Text, VStack } from "@chakra-ui/react";
import type { Order } from "../../../../models/Order";
import ItemList from "../../../general/ItemList";
import PendingOrderListItem from "./PendingOrderListItem";

interface Props {
    pendingOrders: Order[];
}

const PendingOrders = ({pendingOrders: data}: Props) => {
    console.log(data);

    if (data.length === 0) {
        return <Text textAlign={"center"}>no pending orders</Text>;
    }

    return (
        <VStack h={"100%"}>
            <ItemList
                data={data}
                renderItem={(item, idx) => (
                    <PendingOrderListItem order={item} key={idx} />
                )}
            />
        </VStack>
    );
};

export default PendingOrders;
