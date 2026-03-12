interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    error?: string;
    required?: boolean;
    options: {
        value: string;
        label: string;
    }[];
}
export declare function Select({ label, error, required, options, className, ...props }: SelectProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=Select.d.ts.map