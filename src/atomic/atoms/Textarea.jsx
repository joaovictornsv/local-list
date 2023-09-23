import React from "react";
import {twMerge} from "tailwind-merge";
import classNames from "classnames";

// eslint-disable-next-line react/display-name
export const Textarea = React.forwardRef(({
  label,
  className,
  errorMessage,
  ...rest
}, ref) => {
  return (
    <label className="text-sm flex flex-col gap-2 w-full">
      {label && <span>{label}</span>}
      <textarea
        className={twMerge(classNames(
          'text-sm bg-zinc-900 px-2 py-1 rounded',
          'focus:outline-none focus:ring-1', {
          'focus:ring-red-500': errorMessage,
          'focus:ring-zinc-400': !errorMessage
        }), className)}
        autoFocus
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
