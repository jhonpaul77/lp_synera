import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export function Select({ label, error, required, options, className = '', ...props }) {
    return (_jsxs("div", { className: "flex flex-col gap-2", children: [label && (_jsxs("label", { className: "text-xs font-semibold text-text-2 flex items-center gap-1", children: [label, required && _jsx("span", { className: "text-cyan", children: "*" })] })), _jsxs("select", { className: `input-base appearance-none bg-no-repeat pr-8 ${error ? 'border-red focus:border-red' : ''} ${className}`, style: {
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2371717a' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`,
                    backgroundPosition: 'right 0.75rem center',
                }, ...props, children: [_jsx("option", { value: "", children: "Pilih..." }), options.map((opt) => (_jsx("option", { value: opt.value, children: opt.label }, opt.value)))] }), error && _jsx("span", { className: "text-xs text-red", children: error })] }));
}
//# sourceMappingURL=Select.js.map