import {
    createFileRoute,
} from "@tanstack/react-router";

import BlogListPage
    from "../pages/blog/BlogListPage";

export const Route =
    createFileRoute(
        "/blogs/"
    )({
        component:
            BlogListPage,
    });