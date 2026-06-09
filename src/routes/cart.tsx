import {createFileRoute} from '@tanstack/react-router'
import MainLayout from "../layouts/MainLayout.tsx";
import CartPage from "../pages/cart/CartPage.tsx";

export const Route = createFileRoute('/cart')({
    component: () => (
        <MainLayout>
            <CartPage/>
        </MainLayout>
    ),
})

