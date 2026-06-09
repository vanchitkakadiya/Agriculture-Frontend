//src/routes/login.tsx
import {createFileRoute} from '@tanstack/react-router'
import Login from "../pages/auth/Login.tsx";
import AuthLayout from "../layouts/AuthLayout.tsx";
import PublicRoute from "../components/protected/PublicRoute.tsx";

export const Route = createFileRoute('/login')({
    component: () => (
        <PublicRoute>
            <AuthLayout>
                <Login/>
            </AuthLayout>
        </PublicRoute>
    ),
})
