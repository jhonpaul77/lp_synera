interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  required?: boolean
}

export function Input({
  label,
  error,
  required,
  className = '',
  ...props
}: InputProps) {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label className="text-xs font-semibold text-text-2 flex items-center gap-1">
          {label}
          {required && <span className="text-cyan text-sm">*</span>}
        </label>
      )}
      <input
        className={`input-base ${error ? 'border-red focus:border-red' : ''} ${className}`}
        {...props}
      />
      {error && <span className="text-xs text-red">{error}</span>}
    </div>
  )
}
