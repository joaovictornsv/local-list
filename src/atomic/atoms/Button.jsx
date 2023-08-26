import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const BUTTON_SIZES = {
  sm: 'py-1 px-2',
  md: 'py-2 px-2',
  lg: 'py-3 px-3',
}

const ICON_SIZES = {
  sm: 'h-2',
  md: 'h-3',
}

const BUTTON_TYPES = {
  primary: 'text-zinc-200 bg-zinc-950 border-none hover:bg-zinc-900 focus:bg-zinc-800 transition-colors duration-75 focus:outline-none focus:ring-1 focus:ring-zinc-400',
  ghost: 'text-zinc-200 border-none bg-transparent focus:bg-zinc-800 focus:outline-none transition-colors duration-75 hover:bg-zinc-900',
  outline: 'text-zinc-200 border-zinc-700 bg-transparent focus:bg-zinc-800 focus:outline-none transition-colors duration-75 hover:bg-zinc-800 hover:border-zinc-600',
  danger: 'text-zinc-200 border-none bg-red-600 focus:bg-red-500 focus:outline-none transition-colors duration-75 hover:bg-red-700 focus:ring-1 focus:ring-red-300'
}

export const Button = ({
  size = 'md',
  type = 'primary',
  isSubmit,
  icon,
  children,
  text,
  className,
  ...rest
}) => {
  const opacityClassName = 'disabled:opacity-50 disabled:pointer-events-none'
  const sizeClassName = BUTTON_SIZES[size]
  const iconSizeClassName = ICON_SIZES[size]
  const typeClassName = BUTTON_TYPES[type]

  return (

    <button
      className={`text-sm w-full font-normal rounded-2 py-1 px-2 inline-flex items-center justify-center gap-2  ${opacityClassName} ${typeClassName} ${sizeClassName} ${className}`}
      {...(isSubmit & {type: 'submit'})}
      {...rest}
    >
      {icon && <FontAwesomeIcon className={iconSizeClassName} icon={icon}/>}
      {(text || children) && text ? text : children}
    </button>
  )
}
