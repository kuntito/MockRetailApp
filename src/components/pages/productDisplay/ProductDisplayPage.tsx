import { Text, Center, VStack } from "@chakra-ui/react";
import { useState } from "react";
import type { Product } from "../../../models/Product";
import useCartStore from "../../../state-management/cartStore";
import useInventoryStore from "../../../state-management/inventoryStore";
import ItemList from "../../general/ItemList";
import Page from "../../general/Page";
import AddToCartDialog from "./components/AddToCartDialog";
import CartBadge from "./components/CartBadge";
import EditCartItemDialog from "./components/EditCartItemDialog";
import ProductListItem from "./components/ProductListItem";

const ProductDisplayPage = () => {
    return (
        <Page title={"products"} content={<Content />} icons={<CartBadge />} />
    );
};

const Content = () => {
    const { itemMap: items } = useInventoryStore((s) => s);
    const products = Array.from(items.values()).filter((p) => p.availability);

    // for product item dialog
    const [isDiagOpen, setDiagOpen] = useState(false);
    const onDismiss = () => {
        setDiagOpen(false);
    };

    const [activeProduct, setActiveProduct] = useState<Product | undefined>();
    const onProductClick = (prod: Product) => {
        setActiveProduct(prod);
        setDiagOpen(true);
    };

    return (
        <VStack h={"100%"} w={"100%"}>
            <VStack w={"100%"} h={"100%"} ps={"16px"} overflow={"auto"}>
                {products.length === 0 && (
                    <Center w={"100%"} h={"100%"}>
                        <Text>no products</Text>
                    </Center>
                )}
                <ItemList
                    data={products}
                    renderItem={(item, idx) => (
                        <ProductListItem
                            product={item}
                            onProductClick={() => onProductClick(item)}
                            key={idx}
                        />
                    )}
                />
            </VStack>
            {activeProduct && (
                <ProductDialog
                    product={activeProduct}
                    isDiagOpen={isDiagOpen}
                    onDismiss={onDismiss}
                />
            )}
        </VStack>
    );
};

export default ProductDisplayPage;

interface ProductDialogProps {
    product: Product;
    isDiagOpen: boolean;
    onDismiss: () => void;
}

const ProductDialog = ({
    product,
    isDiagOpen,
    onDismiss,
}: ProductDialogProps) => {
    const cart = useCartStore((s) => s.cart);
    const cartItem = cart.get(product.id);

    return cartItem ? (
        <EditCartItemDialog
            cartItem={cartItem}
            isOpen={isDiagOpen}
            onDismiss={onDismiss}
        />
    ) : (
        <AddToCartDialog
            product={product}
            isOpen={isDiagOpen}
            onDismiss={onDismiss}
        />
    );
};
