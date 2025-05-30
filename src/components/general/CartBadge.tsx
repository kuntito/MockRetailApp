import { Box, Image } from "@chakra-ui/react";
import CartIcon from "../../assets/ic_cart.svg";


const CartBadge = () => {
    const selectedItemsCount =9;
    

    const badgeSize = "16px";
    return (
        <Box position={"relative"}>
            <Image src={CartIcon} cursor={"pointer"} onClick={() => {}} />
            {(selectedItemsCount > 0) && (
                <Box
                    position={"absolute"}
                    top="-6px"
                    right="-6px"
                    bg="red.500"
                    color="white"
                    borderRadius="full"
                    width={badgeSize}
                    height={badgeSize}
                    fontFamily={"monospace"}
                    fontSize="xs"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    {selectedItemsCount}
                </Box>
            )}
        </Box>
    );
};

export default CartBadge;