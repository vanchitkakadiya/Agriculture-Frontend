import {createFileRoute} from '@tanstack/react-router'
import Signup from "../pages/auth/Signup.tsx";
import AuthLayout from "../layouts/AuthLayout.tsx";
import PublicRoute from "../components/protected/PublicRoute.tsx";

export const Route = createFileRoute('/signup')({
    component: () => (
        <PublicRoute>
            <AuthLayout>
                <Signup/>
            </AuthLayout>
        </PublicRoute>
    ),
})

