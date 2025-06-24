import { VStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import AppButton from '../../general/AppButton';
import Page from '../../general/Page';

const AdminDashboardPage = () => {
  return (
    <Page title='Nihude Dashboard' content={<Content />}/>
  )
}

export default AdminDashboardPage;


const Content = () => {
    return <VStack w={"100%"} h={"100%"} justifyContent={"center"}>
        <Link to={"inventory"}>
            <AppButton>inventory</AppButton>
        </Link>
        <Link to={"orders"}>
            <AppButton>orders</AppButton>
        </Link>
    </VStack>
}