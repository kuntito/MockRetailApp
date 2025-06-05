import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogCloseButton,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogOverlay,
    HStack,
} from "@chakra-ui/react";
import { useRef } from "react";

interface Props {
    isOpen: boolean;
    onDismiss: () => void;
    body?: React.ReactNode;
    footer?: React.ReactNode;
}

const AppDialog = ({ isOpen, onDismiss, body, footer }: Props) => {
    const cancelRef = useRef<HTMLButtonElement>(null);

    return (
        <AlertDialog
            motionPreset="scale"
            leastDestructiveRef={cancelRef}
            onClose={onDismiss}
            isOpen={isOpen}
            isCentered
            size={"sm"}
        >
            <AlertDialogOverlay />
            <AlertDialogContent>
                <AlertDialogCloseButton />
                <AlertDialogBody pt={"32px"}>{body}</AlertDialogBody>
                <AlertDialogFooter>
                    <HStack
                        w={"100%"}
                        justifyContent={"center"}
                        bg={"2px solid red"}
                    >
                        {footer}
                    </HStack>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default AppDialog;
