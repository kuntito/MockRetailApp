import { useToast } from "@chakra-ui/react";

type ToastStatus =
    | "info"
    | "warning"
    | "success"
    | "error"
    | "loading"
    | undefined;

export type ActionResult = {
    success: boolean;
    message: string;
};

type ActionFunction = () => ActionResult;

const useActionWithToast = (onSuccess?: () => void) => {
    const toast = useToast();

    const showToast = (description: string, status: ToastStatus) => {
        toast({
            description,
            status,
            isClosable: true,
            position: "top",
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
