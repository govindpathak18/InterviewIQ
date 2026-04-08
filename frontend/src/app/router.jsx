import { createBrowserRouter } from 'react-router-dom';
import { AppLayout } from '../components/layout/AppLayout';
import { ProtectedRoute, PublicOnlyRoute } from '../components/layout/ProtectedRoute';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { RegisterPage } from '../pages/RegisterPage';
import { DashboardPage } from '../pages/DashboardPage';
import { CreateInterviewPage } from '../pages/CreateInterviewPage';
import { InterviewResultPage } from '../pages/InterviewResultPage';
import { ProfilePage } from '../pages/ProfilePage';
import { PastInterviewsPage } from '../pages/PastInterviewsPage';
import { ResumeAnalyzerPage } from '../pages/ResumeAnalyzerPage';
import { SettingsPage } from '../pages/SettingsPage';
import { NotFoundPage } from '../pages/NotFoundPage';
import { PageWrapper } from '../components/layout/PageWrapper';

const wrapped = (Page) => (
  <PageWrapper>
    <Page />
  </PageWrapper>
);

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: wrapped(HomePage) },
      { path: 'login', element: <PublicOnlyRoute>{wrapped(LoginPage)}</PublicOnlyRoute> },
      { path: 'register', element: <PublicOnlyRoute>{wrapped(RegisterPage)}</PublicOnlyRoute> },
      { path: 'dashboard', element: <ProtectedRoute>{wrapped(DashboardPage)}</ProtectedRoute> },
      { path: 'interview', element: <ProtectedRoute>{wrapped(CreateInterviewPage)}</ProtectedRoute> },
      { path: 'interview/:id', element: <ProtectedRoute>{wrapped(InterviewResultPage)}</ProtectedRoute> },
      { path: 'profile', element: <ProtectedRoute>{wrapped(ProfilePage)}</ProtectedRoute> },
      { path: 'past-interviews', element: <ProtectedRoute>{wrapped(PastInterviewsPage)}</ProtectedRoute> },
      { path: 'resume-analyzer', element: <ProtectedRoute>{wrapped(ResumeAnalyzerPage)}</ProtectedRoute> },
      { path: 'settings', element: <ProtectedRoute>{wrapped(SettingsPage)}</ProtectedRoute> },
      { path: '*', element: wrapped(NotFoundPage) },
    ],
  },
]);
