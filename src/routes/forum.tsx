import {createFileRoute, Outlet} from '@tanstack/react-router'
import ProtectedRoute from "../components/protected/ProtectedRoute.tsx";
import MainLayout from "../layouts/MainLayout.tsx";

export const Route = createFileRoute('/forum')({
  component: ForumLayout,
})

function ForumLayout() {

    return (
        <ProtectedRoute>

            <MainLayout>

                <Outlet />

            </MainLayout>

        </ProtectedRoute>
    );
}