import React from "react";

// eslint-disable-next-line react/display-name
export const Input = React.forwardRef(({
  label,
  className,
  errorMessage,
  type,
  ...rest
}, ref) => {
  const isInputRadio = type === 'radio'
  return (
    <label className={`text-sm flex ${isInputRadio ? 'flex-row-reverse' : 'flex-col'} gap-2 w-full`}>
      {label && <span>{label}</span>}
      <input
        className={`accent-zinc-200 px-2 text-sm py-1 rounded ${
          isInputRadio ? '': 'focus:outline-none focus:ring-1'
        } ${
          isInputRadio
            ? ''
            : errorMessage ? 'focus:ring-red-500' : 'focus:ring-zinc-400'
        } ${className}`}
        autoFocus
        type={type}
        ref={ref}
        {...rest}
      />
      {errorMessage && (
        <span className="text-red-500">
          {errorMessage}
        </span>
      )}
    </label>
  )
})
