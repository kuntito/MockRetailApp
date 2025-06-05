// import { HStack, VStack, Text, Switch } from "@chakra-ui/react";
// import type { Product } from "../../models/Product";
// import CurrencyText from "../general/CurrencyText";
// import { useEffect, useState } from "react";
// import useInventoryStore from "../../state-management/inventoryStore";

// interface Props {
//     product: Product;
//     onClick: () => void;
// }

// const InventoryListItem = ({ product, onClick }: Props) => {


//     const modifyItem = useInventoryStore(s => s.modifyItem)

//     const handleAvailabilityChange = (e: any) => {
//         const flag: boolean = e.target.checked;
//         // if i alter the state of the switch
//         // it should reflect in the product.
//         // since the product is a state, it should trigger a
//         // recomposition
//         modifyItem(product.id, { availability: flag })
//         console.log("modify called", flag);
        
//     };

//     return (
//         <HStack w={"100%"} ps={"16px"} pe={"8px"}>
//             <VStack align={"start"} w={"100%"}>
//                 <Text>{product.name}</Text>
//                 <CurrencyText>{product.price}</CurrencyText>
//             </VStack>
//             <Switch
//                 isChecked={product.availability}
//                 // isChecked={avail}
//                 onChange={handleAvailabilityChange}
//                 colorScheme="green"
//             />
//         </HStack>
//     );
// };

// export default InventoryListItem;
