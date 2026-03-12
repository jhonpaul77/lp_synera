import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import IndexPage from './pages/IndexPage';
import RegistrasiPage from './pages/RegistrasiPage';
import AgreementPage from './pages/AgreementPage';
export default function App() {
    return (_jsx(Router, { children: _jsxs("div", { className: "min-h-screen bg-bg text-text", children: [_jsx(Navbar, {}), _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(IndexPage, {}) }), _jsx(Route, { path: "/registrasi", element: _jsx(RegistrasiPage, {}) }), _jsx(Route, { path: "/agreement", element: _jsx(AgreementPage, {}) })] })] }) }));
}
//# sourceMappingURL=App.js.map