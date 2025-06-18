import { VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import AppButton from "../../general/AppButton";


const AdminDashboard = () => {
    return (
        <VStack w={"100%"} h={"100%"} justifyContent={"center"}>
            <Link to={"/admin/inventory"}>
                <AppButton>inventory</AppButton>
            </Link>
            <Link to={"/admin/orders"}>
                <AppButton>orders</AppButton>
            </Link>
        </VStack>
    );
};

export default AdminDashboard;
