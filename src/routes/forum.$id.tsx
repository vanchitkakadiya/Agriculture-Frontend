import { createFileRoute } from '@tanstack/react-router'
import ForumQuestionDetailPage from "../pages/forum/ForumQuestionDetailPage.tsx";

export const Route = createFileRoute('/forum/$id')({
  component: ForumQuestionDetailPage,
})


