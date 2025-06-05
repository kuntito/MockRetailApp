import { createBrowserRouter } from "react-router-dom";
import AppLayout from "./components/general/AppLayout";
import CheckoutPage from "./components/checkout/CheckoutPage";
import ProductDisplayPage from "./components/productDisplay/ProductDisplayPage";
import InventoryPage from "./components/inventoryDisplay/InventoryPage";


const router = createBrowserRouter([
    {
        path: "/",
        element: <AppLayout />,
        children: [
            {index: true, element: <ProductDisplayPage />},
            {path: 'checkout', element: <CheckoutPage />}
        ]
    },
    {
        path: "/admin/",
        element: <AppLayout />,
        children: [
            {index: true, element: <InventoryPage />}
        ]
    }
])

export default router;