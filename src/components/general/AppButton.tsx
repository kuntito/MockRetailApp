import { Button, type ButtonProps } from "@chakra-ui/react";


const AppButton = ({ children, ...rest }: ButtonProps) => {
    return <Button flexShrink={0} minW={"64px"} borderRadius={100} {...rest}>
        {children}
    </Button>;
};

export default AppButton;
