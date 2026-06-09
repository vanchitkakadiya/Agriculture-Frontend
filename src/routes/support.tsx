import { createFileRoute } from '@tanstack/react-router'
import ProtectedRoute from "../components/protected/ProtectedRoute.tsx";
import MainLayout from "../layouts/MainLayout.tsx";
import SupportPage from "../pages/support/SupportPage.tsx";

export const Route = createFileRoute('/support')({
  component: ()=>(
      <ProtectedRoute>
          <MainLayout>
              <SupportPage/>
          </MainLayout>
      </ProtectedRoute>
  ),
})

