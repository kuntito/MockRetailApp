import { Box, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import useCartStore from "../../../../state-management/cartStore";

const CartBadge = () => {
    const cart = useCartStore(s => s.cart);
    const itemsInCart = cart.size;
    
    const badgeSize = "16px";
    return (
        <Box position={"relative"}>
            <Link to="/checkout">
                <Image
                    src={"/assets/ic_cart.svg"}
                />
            </Link>
            {itemsInCart > 0 && (
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
                    {itemsInCart}
                </Box>
            )}
        </Box>
    );
};

export default CartBadge;
