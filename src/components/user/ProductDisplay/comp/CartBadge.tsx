import { Box, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import useCartStore from "../../../../state-management/cartStore";

const CartBadge = () => {
    const getTotalCartItems = useCartStore(s => s.getTotalCartItems)
    const itemsInCart = getTotalCartItems();
    // console.log(`cart: ${cartItems}`);
    // console.log(`items in cart: ${itemsInCart}\n\n`);

    const badgeSize = "16px";
    return (
        <Box position={"relative"}>
            <Link to="/orderSummary">
                <Image
                    src={"/assets/ic_cart.svg"}
                    cursor={"pointer"}
                    onClick={() => {}}
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
