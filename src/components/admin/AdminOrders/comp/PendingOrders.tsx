import useAdminOrderStore from "../../../../state-management/adminOrderStore";
import ItemList from "../../../general/ItemList";
import PendingOrderListItem from "./PendingOrderListItem";
import { Text } from "@chakra-ui/react";

const PendingOrders = () => {
    const pendingOrders = useAdminOrderStore((s) => s.pendingOrders);
    const data = Array.from(pendingOrders.values());

    if (data.length === 0) {
        return <Text textAlign={"center"}>no pending orders</Text>
    }

    return (
        <ItemList
            data={data}
            renderItem={(item, idx) => (
                <PendingOrderListItem order={item} key={idx} />
            )}
        />
    );
};

export default PendingOrders;
