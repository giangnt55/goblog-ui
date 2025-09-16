import { Route, Routes, Navigate, Outlet, useLocation } from 'react-router-dom';
import LoginPage from '../features/auth/LoginPage';
import { useAuth } from '../hooks/useAuth';
import LandingPage from '@/features/landing/LandingDemoPage';


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