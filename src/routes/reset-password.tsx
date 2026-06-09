/*
import { createFileRoute } from '@tanstack/react-router'
import AuthLayout from "../layouts/AuthLayout.tsx";
import ResetPassword from "../pages/auth/ResetPassword.tsx";

export const Route = createFileRoute('/reset-password')({
  component: () => (
        <AuthLayout>
            <ResetPassword />
        </AuthLayout>
    ),
})

*/
import {
    createFileRoute,
} from "@tanstack/react-router";

import ResetPassword from "../pages/auth/ResetPassword";
import AuthLayout from "../layouts/AuthLayout.tsx";

type ResetPasswordSearch = {
    token?: string;
};

export const Route =
    createFileRoute(
        "/reset-password"
    )({
        validateSearch: (
            search: Record<string, unknown>
        ): ResetPasswordSearch => {
            return {
                token:
                    typeof search.token ===
                    "string"
                        ? search.token
                        : "",
            };
        },

        component: RouteComponent,
    });

function RouteComponent() {
    return (
        <AuthLayout>
            <ResetPassword/>
        </AuthLayout>
    );
}