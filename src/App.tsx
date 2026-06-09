import './App.css'
import "./lib/i18n";
import {RouterProvider} from "@tanstack/react-router";
import {router} from "./router.tsx";
import {CartProvider} from "./context/CartContext.tsx";

function App() {

    return (
        <CartProvider>
            <RouterProvider router={router}/>
        </CartProvider>

    )
}

export default App
