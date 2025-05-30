import { Divider, VStack } from "@chakra-ui/react";
import { useState } from "react";
import productsData from "../../data/productsData";
import type { Product } from "../../models/Product";
import ProductListItem from "./ProductListItem";
import AddToCartDialog from "./AddToCartDialog";

const ProductList = () => {
    const [isOpen, setIsOpen] = useState(true);
    const onDismiss = () => {
        setIsOpen(false);
    };

    const [currProduct, setCurrProduct] = useState<Product | undefined>();
    const onProductClick = (product: Product) => {
        setCurrProduct(product);
        setIsOpen(true);
    };

    const onAddToCart = () => {};

    const edgePadding = 4;
    return (
        <VStack w={"100%"} height={"100%"}>
            <VStack
                // border={"2px solid red"}
                w={"100%"}
                flex={1}
                minH={0}
                overflow={"auto"}
                // border={"2px solid yellow"}
                sx={{
                    "& > *:first-child": { pt: edgePadding },
                    "& > *:last-child": { pb: edgePadding },
                }}
                divider={<Divider />}
            >
                {productsData.map((p, idx) => (
                    <ProductListItem
                        key={idx}
                        product={p}
                        onClick={() => onProductClick(p)}
                    />
                ))}
            </VStack>
            {currProduct && (
                <AddToCartDialog
                    isOpen={isOpen}
                    onDismiss={onDismiss}
                    product={currProduct}
                    onAddToCart={onAddToCart}
                />
            )}
        </VStack>
    );
};

export default ProductList;
