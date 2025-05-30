import { Button, type ButtonProps } from "@chakra-ui/react";


const AppButton = ({ children, ...rest }: ButtonProps) => {
    return <Button borderRadius={100} {...rest}>
        {children}
    </Button>;
};

export default AppButton;
