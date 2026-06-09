// src/routes/forum.ask.tsx
import {
    createFileRoute,
} from "@tanstack/react-router";

import AskQuestionPage from "../pages/forum/AskQuestionPage";

export const Route =
    createFileRoute(
        "/forum/ask"
    )({
        component: () => (

            <AskQuestionPage/>
        ),
    });