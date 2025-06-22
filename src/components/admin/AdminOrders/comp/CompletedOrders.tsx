import { Text, VStack } from "@chakra-ui/react";
import type { Order } from "../../../../models/Order";
import ItemList from "../../../general/ItemList";
import CompletedOrderListItem from "./CompletedOrderListItem";

interface Props {
    completedOrders: Order[];
}

const CompletedOrders = ({ completedOrders: data }: Props) => {
    if (data.length === 0) {
        return <Text textAlign={"center"}>no completed orders</Text>;
    }

    return (
        <VStack h={"100%"}>
            <ItemList
                data={data}
                renderItem={(item, idx) => (
                    <CompletedOrderListItem order={item} key={idx} />
                )}
            />
        </VStack>
    );
};

export default CompletedOrders;
