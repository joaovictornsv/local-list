import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import { tv } from 'tailwind-variants';

const iconClassNames = tv({
  variants: {
    size: {
      sm: 'h-3',
      md: 'h-3',
    },
  },
});

const buttonClassNames = tv({
  base: 'inline-flex items-center justify-center w-full rounded-md py-1 px-2 text-sm font-normal gap-2',
  variants: {
    type: {
      primary:
        'text-zinc-900 hover:text-zinc-900 bg-zinc-200 border-none hover:bg-zinc-300 transition-colors duration-75 focus:outline-none',
      secondary:
        'text-zinc-200 hover:text-zinc-200 bg-zinc-950 border-none hover:bg-zinc-900 transition-colors duration-75 focus:outline-none',
      ghost:
        'text-zinc-200 hover:text-zinc-200 border-none bg-transparent focus:outline-none transition-colors duration-75 hover:bg-zinc-900',
      danger:
        'text-zinc-200 hover:text-zinc-200 border-none bg-red-600 focus:outline-none transition-colors duration-75 hover:bg-red-700',
    },
    size: {
      sm: 'py-1 px-1.5',
      md: 'py-1.5 px-2',
    },
    disabled: {
      true: 'opacity-50 pointer-events-none',
    },
  },
});

export const Wrapper = ({ to, children, ...rest }) => {
  if (to) {
    return (
      <Link to={to} target="_blank" {...rest}>
        {children}
      </Link>
    );
  }

  return <button {...rest}>{children}</button>;
};

export const Button = React.forwardRef(
  (
    {
      size = 'md',
      type = 'primary',
      isSubmit,
      icon,
      children,
      text,
      className,
      disabled,
      ...rest
    },
    ref,
  ) => {
    return (
      <Wrapper
        className={twMerge(
          buttonClassNames({ type, size, disabled }),
          className,
        )}
        ref={ref}
        type={isSubmit ? 'submit' : 'button'}
        {...rest}
      >
        {icon && (
          <FontAwesomeIcon className={iconClassNames({ size })} icon={icon} />
        )}
        {(text || children) && text ? text : children}
      </Wrapper>
    );
  },
);
