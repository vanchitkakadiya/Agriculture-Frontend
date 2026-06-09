//src/routes/index.tsx
import {createFileRoute} from "@tanstack/react-router";

import Home from "../pages/Home";
import MainLayout from "../layouts/MainLayout.tsx";
import ProtectedRoute from "../components/protected/ProtectedRoute.tsx";

const HomePage = () => {
    return (
        <ProtectedRoute>
            <MainLayout>
                <Home/>
            </MainLayout>
        </ProtectedRoute>
    );
};


export const Route = createFileRoute("/")({
    component: HomePage,
});