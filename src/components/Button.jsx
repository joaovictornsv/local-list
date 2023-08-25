import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const BUTTON_SIZES = {
  sm: 'py-1 px-2',
  md: 'py-2 px-2',
}

export const Button = ({
  size = 'md',
  icon,
  children,
  text,
  ...rest
}) => {
  const opacityClassName = 'disabled:opacity-50 disabled:pointer-events-none'
  const sizeClassName = BUTTON_SIZES[size]

  return (

    <button
      className={`text-sm text-zinc-200 font-normal py-1 px-2 inline-flex items-center justify-center gap-2 border-none bg-zinc-950 hover:bg-zinc-900 focus:bg-zinc-800 transition-colors duration-75 focus:outline-none focus:ring-1 focus:ring-zinc-400 ${opacityClassName} ${sizeClassName}`}
      {...rest}
    >
      {icon && <FontAwesomeIcon icon={icon}/>}
      {(text || children) && text ? text : children}
    </button>
  )
}
