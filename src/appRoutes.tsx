import { createBrowserRouter } from "react-router-dom";
import ProductDisplayPage from "./components/pages/productDisplay/ProductDisplayPage";
import AppLayout from "./components/general/AppLayout";
import CheckoutPage from "./components/pages/checkout/CheckoutPage";
import CustomerInfoPage from "./components/pages/CustomerInfo/CustomerInfoPage";
import AdminDashboardPage from "./components/pages/AdminDashboard/AdminDashboardPage";
import AdminInventoryPage from "./components/pages/AdminInventory/AdminInventoryPage";
import AdminOrdersPage from "./components/pages/AdminOrders/AdminOrdersPage";
import PendingOrderDetailsPage from "./components/pages/PendingOrderDetails/PendingOrderDetailsPage";
import CompletedOrderDetailsPage from "./components/pages/CompletedOrderDetails/CompletedOrderDetailsPage";

const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <AppLayout />,
        children: [
            { index: true, element: <ProductDisplayPage /> },
            { path: "checkout", element: <CheckoutPage /> },
            { path: "checkout/customerInfo", element: <CustomerInfoPage /> },
        ],
    },
    {
        path: "admin",
        element: <AppLayout />,
        children: [
            { index: true, element: <AdminDashboardPage /> },
            { path: "inventory", element: <AdminInventoryPage /> },
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

export default appRouter;
