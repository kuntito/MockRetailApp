import { Divider, VStack } from "@chakra-ui/react";
import { type ReactNode } from "react";

interface Props<T> {
    data: T[];
    renderItem: (item: T, idx: number) => ReactNode;
    header?: ReactNode;
}

// this component displays a scrollable list of components
// what does it need to be reusable?
// a list of components
// the ScrollableList needs components
const ScrollableList = <T,>({ data, renderItem, header }: Props<T>) => {
    const edgePadding = 4;
    return (
        <VStack w={"100%"} height={"100%"} gap={0}>
            <VStack
                // border={"2px solid red"}
                w={"100%"}
                h={"100%"}
                // border={"2px solid yellow"}
                sx={{
                    "& > *:first-child": { pt: edgePadding },
                    "& > *:last-child": { pb: edgePadding },
                }}
                divider={<Divider />}
            >
                {header}
                {data.map((item, idx) => renderItem(item, idx))}
            </VStack>
        </VStack>
    );
};

export default ScrollableList;
