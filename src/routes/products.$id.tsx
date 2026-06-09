import { createFileRoute } from '@tanstack/react-router'
import ProductDetailPage from "../pages/product/ProductDetailPage.tsx";

export const Route = createFileRoute('/products/$id')({
  component: ProductDetailPage,

})


