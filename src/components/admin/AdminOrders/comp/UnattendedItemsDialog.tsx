import { VStack, Text } from "@chakra-ui/react";
import AppDialog from "../../../general/AppDialog";
import AppButton from "../../../general/AppButton";

interface Props {
    isOpen: boolean;
    onDismiss: () => void;
    onMarkComplete: () => void;
}

const UnattendedItemsDialog = ({
    isOpen,
    onDismiss,
    onMarkComplete,
}: Props) => {
    return (
        <AppDialog
            isOpen={isOpen}
            onDismiss={onDismiss}
            body={
                <VStack>
                    <Text
                        fontSize={"lg"}
                        color={"palette.400"}
                        fontWeight={"medium"}
                    >
                        mark as complete?
                    </Text>
                    <Text>some items have not been attended to</Text>
                </VStack>
            }
            footer={
                <VStack>
                    <AppButton
                        bgColor={"palette.400"}
                        color={"palette.700"}
                        onClick={onDismiss}
                    >
                        recheck items
                    </AppButton>
                    <AppButton
                        bgColor={"palette.200"}
                        color={"palette.700"}
                        onClick={onMarkComplete}
                    >
                        go ahead
                    </AppButton>
                </VStack>
            }
        />
    );
};

export default UnattendedItemsDialog;
