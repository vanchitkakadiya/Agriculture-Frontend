import {createFileRoute} from '@tanstack/react-router'
import BlogDetailPage from "../pages/blog/BlogDetailPage.tsx";

export const Route = createFileRoute('/blogs/$id')({
    component: BlogDetailPage,
})

