import { Box, Image } from "@chakra-ui/react";
import CartIcon from "../../assets/ic_cart.svg";
import useCartStore from "../../state-management/cartStore";
import { Link } from "react-router-dom";

const CartBadge = () => {
    const cartItems = useCartStore((s) => s.state.cartItems);
    const itemsInCart = cartItems.size;
    // console.log(`cart: ${cartItems}`);
    // console.log(`items in cart: ${itemsInCart}\n\n`);

    const badgeSize = "16px";
    return (
        <Box position={"relative"}>
            <Link to="/checkout">
                <Image src={CartIcon} cursor={"pointer"} onClick={() => {}} />
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
