import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import IndexPage from './pages/IndexPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import RegistrasiPage from './pages/RegistrasiPage';
import AgreementPage from './pages/AgreementPage';
const ProtectedRoute = ({ children }) => {
    const userRole = localStorage.getItem('userRole');
    const allowedRoles = ['admin', 'manager', 'supervisor'];
    if (!userRole || !allowedRoles.includes(userRole)) {
        return _jsx(Navigate, { to: "/login", replace: true });
    }
    return _jsx(_Fragment, { children: children });
};
export default function App() {
    return (_jsx(Router, { children: _jsxs(Routes, { children: [_jsx(Route, { path: "/login", element: _jsx(LoginPage, {}) }), _jsx(Route, { path: "/dashboard", element: _jsx(ProtectedRoute, { children: _jsx(DashboardPage, {}) }) }), _jsx(Route, { path: "*", element: _jsxs("div", { className: "min-h-screen bg-bg text-text", children: [_jsx(Navbar, {}), _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(IndexPage, {}) }), _jsx(Route, { path: "/registrasi", element: _jsx(RegistrasiPage, {}) }), _jsx(Route, { path: "/agreement", element: _jsx(AgreementPage, {}) })] })] }) })] }) }));
}
//# sourceMappingURL=App.js.map