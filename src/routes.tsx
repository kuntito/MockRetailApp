import { createBrowserRouter } from "react-router-dom";
import AppLayout from "./components/general/AppLayout";
import CheckoutPage from "./components/checkout/CheckoutPage";
import ProductDisplayPage from "./components/productDisplay/ProductDisplayPage";


const router = createBrowserRouter([
    {
        path: "/",
        element: <AppLayout />,
        children: [
            {index: true, element: <ProductDisplayPage />},
            {path: 'checkout', element: <CheckoutPage />}
        ]
    }
])

export default router;