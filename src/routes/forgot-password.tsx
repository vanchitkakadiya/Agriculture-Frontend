import { createFileRoute } from '@tanstack/react-router'
import AuthLayout from "../layouts/AuthLayout.tsx";
import ForgotPassword from "../pages/auth/ForgotPassword.tsx";

export const Route = createFileRoute('/forgot-password')({
  component: () => (
        <AuthLayout>
            <ForgotPassword/>
        </AuthLayout>
    ),
})

