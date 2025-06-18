import { createBrowserRouter } from "react-router-dom";
import AppLayout from "./components/general/AppLayout";
import ProductDisplayPage from "./components/user/ProductDisplay/ProductDisplayPage";
import OrderSummaryPage from "./components/user/OrderSummary/OrderSummaryPage";
import AdminDashboard from "./components/admin/adminDashboard/adminDashboard";
import InventoryPage from "./components/admin/Inventory/InventoryPage";
import AdminOrdersPage from "./components/admin/AdminOrders/AdminOrdersPage";
import PlaceOrderCustInfo from "./components/user/PlacingOrder/PlaceOrderCustInfo";
import PlaceOrderPayInfo from "./components/user/PlacingOrder/PlaceOrderPayInfo";
import OrderPlaced from "./components/user/PlacingOrder/OrderPlaced";

const router = createBrowserRouter([
    {
        path: "/",
        element: <AppLayout />,
        children: [
            { index: true, element: <ProductDisplayPage /> },
            { path: "orderSummary", element: <OrderSummaryPage /> },
            { path: "placeOrderCustInfo", element: <PlaceOrderCustInfo /> },
            { path: "placeOrderPayInfo", element: <PlaceOrderPayInfo /> },
            { path: "orderPlaced", element: <OrderPlaced /> },
        ],
    },
    {
        path: "/admin/",
        element: <AppLayout />,
        children: [
            { index: true, element: <AdminDashboard /> },
            { path: "inventory", element: <InventoryPage /> },
            { path: "orders", element: <AdminOrdersPage /> },
        ],
    },
]);

export default router;
