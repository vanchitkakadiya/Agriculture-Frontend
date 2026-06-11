import { createFileRoute } from '@tanstack/react-router'
import PaymentPage from "../pages/payment/PaymentPage.tsx";

export const Route = createFileRoute('/payment')({
  component: PaymentPage,
})
