import { useToast } from "@chakra-ui/react";
import type { ActionResult } from "../types/ActionResult";

type ToastStatus =
    | "info"
    | "warning"
    | "success"
    | "error"
    | "loading"
    | undefined;

type ActionFunction = () => ActionResult;
const useActionWithToast = (onSuccess?: () => void) => {
    const toast = useToast();

    const showToast = (description: string, status: ToastStatus) => {
        toast({
            description,
            status,
            isClosable: true,
            position: "top",
            duration: 1000,
        });
    };

    const executeAction = (
        actionFn: ActionFunction,
        defaultSuccess: ToastStatus = "success"
    ) => {
        const { success, message } = actionFn();
        const toastStatus = success ? defaultSuccess : "error";
        showToast(message, toastStatus);

        if (success && onSuccess) onSuccess();
    };

    return executeAction;
};

export default useActionWithToast;
