import { Route, Routes, Navigate, Outlet, useLocation } from 'react-router-dom';
import LoginPage from '../features/auth/LoginPage';
import { useAuth } from '../hooks/useAuth';
import LandingPage from '@/features/landing/LandingDemoPage';
import { ButtonExamples } from '@/features/ui/ButtonUsage';
import { CardExamples } from '@/features/ui/CardUsage';
import TableExamples from '@/components/ui/table/TableUsage';


function ProtectedRoute() {
    const location = useLocation();
    const { user, isLoading } = useAuth();

    if (isLoading) return <div>Loading...</div>;

    if (!user) {
        return <Navigate to="/login" replace state={{ from: location }} />;
    }

    return <Outlet />;
}


export function AppRoutes() {
    return (
        <Routes>
            {/* Public */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
           
            {/*UI resource*/}
            <Route path="/ui-button" element={<ButtonExamples  />} />
            <Route path="/ui-card" element={<CardExamples  />} />
            <Route path="/ui-table" element={<TableExamples  />} />


            {/* Protected */}
            <Route element={<ProtectedRoute />}>
                {/* <Route path="/" element={<Navigate to="/" replace />} /> */}
                {/* <Route path="/users" element={<UsersPage />} /> */}
            </Route>


            {/* 404 */}
            <Route path="*" element={<div>Not Found</div>} />
        </Routes>
    );
}