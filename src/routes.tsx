import { createBrowserRouter } from "react-router-dom";
import AppLayout from "./components/general/AppLayout";
import App from "./App";


const router = createBrowserRouter([
    {
        path: "/",
        element: <AppLayout />,
        children: [{index: true, element: <App />}]
    }
])

export default router;