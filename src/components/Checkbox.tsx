interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

export function Checkbox({ label, className = '', ...props }: CheckboxProps) {
  return (
    <label className="flex items-center gap-2 cursor-pointer">
      <input
        type="checkbox"
        className="w-4 h-4 rounded border border-border-2 bg-bg-2 accent-cyan cursor-pointer"
        {...props}
      />
      {label && <span className="text-sm text-text-2 hover:text-text">{label}</span>}
    </label>
  )
}
