import {
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Text,
    VStack,
    type TabProps,
} from "@chakra-ui/react";
import React, { type FC } from "react";
import AppHeader from "../../general/AppHeader";
import PendingOrders from "./comp/PendingOrders";
import CompletedOrers from "./comp/CompletedOrders";

const AdminOrdersPage = () => {
    return (
        <VStack>
            <AppHeader>
                <Text>Orders</Text>
            </AppHeader>
            <Tabs>
                <TabList>
                    <AppTab>
                        <Text>pending</Text>
                    </AppTab>
                    <AppTab>
                        <Text>completed</Text>
                    </AppTab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <PendingOrders />
                    </TabPanel>
                    <TabPanel>
                        <CompletedOrers />
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
