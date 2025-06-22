import {
    Badge,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Text,
    VStack,
    type TabProps,
} from "@chakra-ui/react";
import { type FC } from "react";
import { useSearchParams } from "react-router-dom";
import type { Order } from "../../../models/Order";
import useOrderApiStore from "../../../state-management/orderApiStore";
import AppHeader from "../../general/AppHeader";
import CompletedOrders from "./comp/CompletedOrders";
import PendingOrders from "./comp/PendingOrders";

const AdminOrdersPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const tabParam = searchParams.get('tab');
    const currentTabIndex = tabParam === 'completed' ? 1 : 0;

    // const [currentTabIndex, setCurrentTabIndex] = useState(0);

    const handleTabChange = (idx: number) => {
        const newTab = idx === 0 ? 'pending' : 'completed';
        setSearchParams({ tab: newTab });
    }


    const allOrdersMap = useOrderApiStore((s) => s.orders);
    // const pendingOrders = Array.from(allOrdersMap.values()).filter(
    //     order => !order.isMarkedComplete
    // );
    // const completedOrders = // the orders marked complete

    const allOrdersArray = Array.from(allOrdersMap.values());
    const { pendingOrders, completedOrders } = allOrdersArray.reduce(
        (acc, order) => {
            if (order.isMarkedComplete) {
                acc.completedOrders.push(order);
            } else {
                acc.pendingOrders.push(order);
            }

            return acc;
        },
        { pendingOrders: [] as Order[], completedOrders: [] as Order[] }
    );
    const pendingOrdersCount = pendingOrders.length;
    const completedOrdersCount = completedOrders.length;

    return (
        <VStack h={"100%"}>
            <AppHeader>
                <Text>Orders</Text>
            </AppHeader>
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
        </VStack>
    );
};

const AppTab: FC<TabProps> = ({ children, ...props }) => (
    <Tab
        opacity={0.6}
        _selected={{
            opacity: 1,
            borderColor: "blue.500",
        }}
        transition="opacity 0.2s"
        {...props}
    >
        {children}
    </Tab>
);
export default AdminOrdersPage;
