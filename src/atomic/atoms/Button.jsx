import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React from "react";
import {Link} from "react-router-dom";
import {twMerge} from "tailwind-merge";
import classNames from "classnames";

const BUTTON_SIZES = {
  sm: 'py-1 px-2',
  md: 'py-2 px-2',
  lg: 'py-3 px-3',
}

const ICON_SIZES = {
  sm: 'h-3',
  md: 'h-3',
}

const BUTTON_TYPES = {
  primary: 'text-zinc-900 hover:text-zinc-900 bg-zinc-200 border-none hover:bg-zinc-300 transition-colors duration-75 focus:outline-none',
  secondary: 'text-zinc-200 hover:text-zinc-200 bg-zinc-950 border-none hover:bg-zinc-900 transition-colors duration-75 focus:outline-none',
  ghost: 'text-zinc-200 hover:text-zinc-200 border-none bg-transparent focus:outline-none transition-colors duration-75 hover:bg-zinc-900',
  danger: 'text-zinc-200 hover:text-zinc-200 border-none bg-red-600 focus:outline-none transition-colors duration-75 hover:bg-red-700'
}

export const Wrapper = ({ to, children, ...rest }) => {
  if (to) {
    return (
      <Link to={to} target="_blank" {...rest}>
        {children}
      </Link>
    );
  }

  return (
    <button {...rest}>
      {children}
    </button>
  )
}

// eslint-disable-next-line react/display-name
export const Button = React.forwardRef(({
  size = 'md',
  type = 'primary',
  isSubmit,
  icon,
  children,
  text,
  className,
  ...rest
}, ref) => {
  const opacityClassName = 'disabled:opacity-50 disabled:pointer-events-none'
  const sizeClassName = BUTTON_SIZES[size]
  const iconSizeClassName = ICON_SIZES[size]
  const typeClassName = BUTTON_TYPES[type]

  return (
    <Wrapper
      className={twMerge(classNames(
        'inline-flex items-center justify-center',
        'w-full rounded-md py-1 px-2',
        'text-sm font-normal gap-2',
        opacityClassName,
        typeClassName,
        sizeClassName
      ), className)}
      ref={ref}
      type={isSubmit ? 'submit' : 'button'}
      {...rest}
    >
      {icon && <FontAwesomeIcon className={iconSizeClassName} icon={icon}/>}
      {(text || children) && text ? text : children}
    </Wrapper>
  )
})
