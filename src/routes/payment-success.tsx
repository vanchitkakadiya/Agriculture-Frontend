import { createFileRoute } from '@tanstack/react-router'
import PaymentSuccessPage from "../pages/payment/PaymentSuccessPage.tsx";

export const Route = createFileRoute('/payment-success')({
  component: PaymentSuccessPage,
})