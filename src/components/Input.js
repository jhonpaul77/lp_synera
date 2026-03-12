import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export function Input({ label, error, required, className = '', ...props }) {
    return (_jsxs("div", { className: "flex flex-col gap-2", children: [label && (_jsxs("label", { className: "text-xs font-semibold text-text-2 flex items-center gap-1", children: [label, required && _jsx("span", { className: "text-cyan text-sm", children: "*" })] })), _jsx("input", { className: `input-base ${error ? 'border-red focus:border-red' : ''} ${className}`, ...props }), error && _jsx("span", { className: "text-xs text-red", children: error })] }));
}
//# sourceMappingURL=Input.js.map