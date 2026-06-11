import {createFileRoute} from '@tanstack/react-router'
import ForumListPage from "../pages/forum/ForumListPage.tsx";

export const Route = createFileRoute('/forum/')({
    component: ForumListPage,
})

