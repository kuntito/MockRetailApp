import { VStack } from "@chakra-ui/react";
import { useState } from "react";
import productsData from "../../data/productsData";
import type { Product } from "../../models/Product";
import ScrollableList from "../general/ScrollableList";
import AddToCartDialog from "./AddToCartDialog";
import ProductListItem from "./ProductListItem";

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

    const data = productsData.slice(0, 3);
    return (
        <VStack w={"100%"} height={"100%"}>
            <ScrollableList
                data={data}
                renderItem={(product, idx) => (
                    <ProductListItem
                        key={idx}
                        product={product}
                        onClick={() => onProductClick(product)}
                    />
                )}
            />
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
