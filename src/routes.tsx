import { createBrowserRouter } from "react-router-dom";
import AdminDashboard from "./components/admin/adminDashboard/adminDashboard";
import AdminOrdersPage from "./components/admin/AdminOrders/AdminOrdersPage";
import CompletedOrderDetailsPage from "./components/admin/AdminOrders/CompletedOrderDetailsPage";
import PendingOrderDetailsPage from "./components/admin/AdminOrders/PendingOrderDetailsPage";
import InventoryPage from "./components/admin/Inventory/InventoryPage";
import AppLayout from "./components/general/AppLayout";
import OrderSummaryPage from "./components/user/OrderSummary/OrderSummaryPage";
import PlaceOrderCustInfoPage from "./components/user/PlacingOrder/PlaceOrderCustInfoPage";
import PlaceOrderPayInfoPage from "./components/user/PlacingOrder/PlaceOrderPayInfoPage";
import ProductDisplayPage from "./components/user/ProductDisplay/ProductDisplayPage";
// import PlaceOrderPayInfo from "./components/user/PlacingOrder/PlaceOrderPayInfo";
// import OrderPlaced from "./components/user/PlacingOrder/OrderPlaced";

const router = createBrowserRouter([
    {
        path: "/",
        element: <AppLayout />,
        children: [
            { index: true, element: <ProductDisplayPage /> },
            { path: "orderSummary", element: <OrderSummaryPage /> },
            { path: "placeOrderCustInfo", element: <PlaceOrderCustInfoPage /> },
            { path: "placeOrderPayInfo", element: <PlaceOrderPayInfoPage /> },
            // { path: "orderPlaced", element: <OrderPlaced /> },
        ],
    },
    {
        path: "/admin/",
        element: <AppLayout />,
        children: [
            { index: true, element: <AdminDashboard /> },
            { path: "inventory", element: <InventoryPage /> },
            { path: "orders", element: <AdminOrdersPage /> },
            {
                path: "orders/pendingOrderDetails/:orderId",
                element: <PendingOrderDetailsPage />,
            },
            {
                path: "orders/completedOrderDetails/:orderId",
                element: <CompletedOrderDetailsPage />,
            },
        ],
    },
]);

export default router;
