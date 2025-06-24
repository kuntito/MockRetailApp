import { Tab, type TabProps } from "@chakra-ui/react";
import type { FC } from "react";


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

export default AppTab;