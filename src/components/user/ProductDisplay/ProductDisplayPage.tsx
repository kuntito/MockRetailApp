import { Text, VStack } from "@chakra-ui/react";
import AppHeader from "../../general/AppHeader";
import CartBadge from "./comp/CartBadge";
import ProductListItem from "./comp/ProductListItem";
import { dummyProducts } from "../../../dummyData/dummyProducts";
import ItemList from "../../general/ItemList";
import type { Product } from "../../../models/Product";
import { useState } from "react";
import AddToCartDialog from "./comp/AddToCartDialog";
import EditCartItemDialog from "./comp/EditCartItemDialog";
import useCartStore from "../../../state-management/cartStore";

const ProductDisplayPage = () => {
    const data = dummyProducts;

    // for product item dialog
    const [isDiagOpen, setDiagOpen] = useState(false);
    const onDismiss = () => {
        setDiagOpen(false);
    };

    const [activeProduct, setActiveProduct] = useState<Product | undefined>();

    // the dialog displays the active product's properties
    const onProductClick = (product: Product) => {
        console.log("active product ", product.name);

        setActiveProduct(product);
        setDiagOpen(true);
    };

    const checkProductInCart = useCartStore((s) => s.checkProductInCart);

    return (
        <VStack h={"100%"}>
            <AppHeader>
                <Text flex={1} textAlign={"center"}>
                    Nihude Store
                </Text>
                <CartBadge />
            </AppHeader>
            <VStack
                // border={"2px"}
                w={"100%"}
                h={"100%"}
                ps={"16px"}
                overflow={"auto"}
            >
                <ItemList
                    data={data}
                    renderItem={(item, idx) => (
                        <ProductListItem
                            product={item}
                            key={idx}
                            onProductClick={() => onProductClick(item)}
                        />
                    )}
                />
            </VStack>
            {activeProduct &&
                (checkProductInCart(activeProduct.id) ? (
                    <EditCartItemDialog
                        isOpen={isDiagOpen}
                        onDismiss={onDismiss}
                        product={activeProduct}
                    />
                ) : (
                    <AddToCartDialog
                        isOpen={isDiagOpen}
                        onDismiss={onDismiss}
                        product={activeProduct}
                    />
                ))}
        </VStack>
    );
};

export default ProductDisplayPage;
