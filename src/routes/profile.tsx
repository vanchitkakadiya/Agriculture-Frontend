import {createFileRoute} from '@tanstack/react-router'
import Profile from "../pages/auth/Profile.tsx";
import MainLayout from "../layouts/MainLayout.tsx";
import ProtectedRoute from "../components/protected/ProtectedRoute.tsx";

export const Route = createFileRoute('/profile')({
    component: () => (
        <ProtectedRoute>
            <MainLayout>
                <Profile/>
            </MainLayout>
        </ProtectedRoute>),
})

