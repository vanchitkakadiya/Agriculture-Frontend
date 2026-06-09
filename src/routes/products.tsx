import {createFileRoute, Outlet} from '@tanstack/react-router'
import ProtectedRoute from "../components/protected/ProtectedRoute.tsx";
import MainLayout from "../layouts/MainLayout.tsx";
export const Route = createFileRoute('/products')({
    component: ProductsLayout
})

function ProductsLayout() {

    return (
        <ProtectedRoute>

            <MainLayout>

                <Outlet />

            </MainLayout>

        </ProtectedRoute>
    );
}
