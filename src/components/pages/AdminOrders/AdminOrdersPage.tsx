import { Badge, TabList, TabPanel, TabPanels, Tabs, Text } from "@chakra-ui/react";
import { useSearchParams } from "react-router-dom";
import type { Order } from "../../../models/Order";
import useMockApiStore from "../../../state-management/mockApiStore";
import Page from "../../general/Page";
import AppTab from "./components/AppTab";
import CompletedOrders from "./components/CompletedOrders";
import PendingOrders from "./components/PendingOrders";

const AdminOrdersPage = () => {
    return <Page title="Orders" content={<Content />} />;
};

export default AdminOrdersPage;

const Content = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const tabParam = searchParams.get("tab");
    const currentTabIndex = tabParam === "completed" ? 1 : 0;

    const handleTabChange = (idx: number) => {
        const newTab = idx === 0 ? "pending" : "completed";
        setSearchParams({ tab: newTab });
    };

    const allOrdersMap = useMockApiStore(s => s.orders);
    const allOrders = Array.from(allOrdersMap.values());

    const { pendingOrders, completedOrders } = allOrders.reduce(
        (acc, order) => {
            if (order.isMarkedComplete) {
                acc.completedOrders.push(order);
            } else {
                acc.pendingOrders.push(order);
            }
        
            return acc;
        },
        { pendingOrders: [] as Order[], completedOrders: [] as Order[]}
    )

    const pendingOrdersCount = pendingOrders.length;
    const completedOrdersCount = completedOrders.length;

    return (
        <Tabs
            align="center"
            w={"100%"}
            h={"100%"}
            index={currentTabIndex}
            onChange={handleTabChange}
        >
            <TabList>
                <AppTab>
                    <Text>pending</Text>
                    {pendingOrdersCount > 0 && currentTabIndex === 0 && (
                        <Badge borderRadius={"full"}>
                            {pendingOrdersCount}
                        </Badge>
                    )}
                </AppTab>
                <AppTab>
                    <Text>completed</Text>
                    {completedOrdersCount > 0 && currentTabIndex === 1 && (
                        <Badge borderRadius={"full"}>
                            {completedOrdersCount}
                        </Badge>
                    )}
                </AppTab>
            </TabList>
            <TabPanels
                    h={"78%"} // for some reason, 78% works, 100% causes the container to exceed it's parent's boundaries
                    overflow={"auto"}
                >
                    <TabPanel h={"100%"}>
                        <PendingOrders pendingOrders={pendingOrders} />
                    </TabPanel>
                    <TabPanel>
                        <CompletedOrders completedOrders={completedOrders} />
                    </TabPanel>
                </TabPanels>
        </Tabs>
    );
};
