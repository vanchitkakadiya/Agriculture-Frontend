import { createFileRoute } from '@tanstack/react-router'
import CheckoutPage from "../pages/checkout/CheckoutPage.tsx";

export const Route = createFileRoute('/checkout')({
  component: CheckoutPage,
})

