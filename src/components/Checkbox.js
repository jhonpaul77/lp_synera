import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export function Checkbox({ label, className = '', ...props }) {
    return (_jsxs("label", { className: "flex items-center gap-2 cursor-pointer", children: [_jsx("input", { type: "checkbox", className: "w-4 h-4 rounded border border-border-2 bg-bg-2 accent-cyan cursor-pointer", ...props }), label && _jsx("span", { className: "text-sm text-text-2 hover:text-text", children: label })] }));
}
//# sourceMappingURL=Checkbox.js.map