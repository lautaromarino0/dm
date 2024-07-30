import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface AuthGuardProps {
    children: ReactNode;
}

const AuthGuard = ({ children }:AuthGuardProps) => {
    const token = localStorage.getItem('token');

    if (!token) {
        return <Navigate to="/login" />;
    }

    return children;
};

export default AuthGuard;