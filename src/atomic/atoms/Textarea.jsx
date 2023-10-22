import React from 'react';
import { twMerge } from 'tailwind-merge';
import classNames from 'classnames';

// eslint-disable-next-line react/display-name
export const Textarea = React.forwardRef(
  ({ label, className, errorMessage, ...rest }, ref) => {
    return (
      <label className="flex w-full flex-col gap-2 text-sm">
        {label && <span>{label}</span>}
        <textarea
          className={twMerge(
            classNames(
              'rounded bg-zinc-900 px-2 py-1 text-sm',
              'focus:outline-none focus:ring-1',
              {
                'focus:ring-red-500': errorMessage,
                'focus:ring-zinc-400': !errorMessage,
              },
            ),
            className,
          )}
          autoFocus
          ref={ref}
          {...rest}
        />
        {errorMessage && <span className="text-red-500">{errorMessage}</span>}
      </label>
    );
  },
);
