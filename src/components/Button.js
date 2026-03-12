import { jsx as _jsx } from "react/jsx-runtime";
export function Button({ variant = 'primary', size = 'md', className = '', children, ...props }) {
    const baseClasses = 'font-semibold rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed';
    const variants = {
        primary: 'bg-cyan text-bg hover:bg-cyan/90 hover:shadow-lg hover:shadow-cyan-glow',
        secondary: 'bg-surface border border-border-2 text-text hover:border-cyan hover:text-cyan',
        ghost: 'text-text-2 hover:text-text hover:bg-surface-2',
    };
    const sizes = {
        sm: 'px-5 py-2.5 text-xs font-semibold',
        md: 'px-6 py-2.5 text-sm',
        lg: 'px-8 py-3 text-base',
    };
    return (_jsx("button", { className: `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`, ...props, children: children }));
}
//# sourceMappingURL=Button.js.map