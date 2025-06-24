import { Box, Text, VStack } from "@chakra-ui/react";
import { type ReactNode } from "react";
import AppHeader from "./AppHeader";

interface Props {
    title: string;
    content: ReactNode;
    icons?: ReactNode;
}

const Page = ({ title, content, icons }: Props) => {
    return (
        <VStack 
            h={"100%"}
            
        >
            <AppHeader textAlign={"center"}>
                {/* this allows the text to remain centered */}
                <Box opacity={0}>{icons}</Box>
                <Text flex={1}>{title}</Text>
                {icons}
            </AppHeader>
            <VStack w={"100%"} h={"100%"} overflow={"hidden"}>
                {content}
            </VStack>
        </VStack>
    ); 
};

export default Page;
