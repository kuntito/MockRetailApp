import { Box, Divider, VStack } from "@chakra-ui/react";
import type { ReactNode } from "react";

interface Props<T> {
    data: T[];
    renderItem: (item: T, idx: number) => ReactNode;
}

const ItemList = <T,>({ data, renderItem }: Props<T>) => {
    return (
        <VStack w={"100%"} gap={0}>
            {data.length && <EdgePadding />}
            <VStack w={"100%"} divider={<Divider />}>
                {data.map((item, idx) => renderItem(item, idx))}
            </VStack>
            {data.length && <EdgePadding />}
        </VStack>
    );
};

const EdgePadding = () => {
    const edgePadding = 4;
    return <Box height={edgePadding} />;
};

export default ItemList;
