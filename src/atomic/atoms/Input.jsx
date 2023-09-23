import React from "react";
import classNames from "classnames";
import {twMerge} from "tailwind-merge";

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
    <label
      className={classNames(
        'flex gap-2 w-full text-sm', {
        'flex-row-reverse': isInputRadio,
        'flex-col': !isInputRadio
      })}
    >
      {label && <span>{label}</span>}
      <input
        className={twMerge(classNames(
          'accent-zinc-200 px-2 text-sm py-1 rounded', {
          'focus:outline-none focus:ring-1': !isInputRadio,
          'focus:ring-red-500': !isInputRadio && errorMessage,
          'focus:ring-zinc-400': !isInputRadio && !errorMessage,
        }), className)}
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
