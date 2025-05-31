import CheckoutPage from "./components/checkout/CheckoutPage";
import ProductDisplay from "./components/productDisplay/ProductDisplayPage";
import TG from "./TG";

function App() {
    // TODO should add to cart dialog look different for items added to cart?
    // this is bordering on implementation detail
    // i'd say add cart first, then proceed...

    // return 
    return <>
        {/* <ProductDisplay /> */}
        <CheckoutPage />
        {/* <TG /> */}
    </> 
}

export default App;
