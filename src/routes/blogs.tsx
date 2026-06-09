import {
    createFileRoute,
    Outlet,
} from "@tanstack/react-router";

import ProtectedRoute
    from "../components/protected/ProtectedRoute";

import MainLayout
    from "../layouts/MainLayout";

export const Route =
    createFileRoute(
        "/blogs"
    )({
        component:
            BlogsLayout,
    });

function BlogsLayout() {

    return (
        <ProtectedRoute>

            <MainLayout>

                <Outlet />

            </MainLayout>

        </ProtectedRoute>
    );
}