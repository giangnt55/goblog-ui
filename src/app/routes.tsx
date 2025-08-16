import { Route, Routes, Navigate, Outlet, useLocation } from 'react-router-dom';
import LoginPage from '../features/auth/LoginPage';
import { isAccessTokenValid } from '../lib/storage';


function ProtectedRoute() {
    const location = useLocation();
    if (!isAccessTokenValid()) {
        return <Navigate to="/login" replace state={{ from: location }} />;
    }
    return <Outlet />;
}


export function AppRoutes() {
    return (
        <Routes>
            {/* Public */}
            <Route path="/login" element={<LoginPage />} />


            {/* Protected */}
            <Route element={<ProtectedRoute />}>
                <Route path="/" element={<Navigate to="/users" replace />} />
                {/* <Route path="/users" element={<UsersPage />} /> */}
            </Route>


            {/* 404 */}
            <Route path="*" element={<div>Not Found</div>} />
        </Routes>
    );
}