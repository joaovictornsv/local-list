import {twMerge} from "tailwind-merge";

export const Select = ({
  children,
  className,
  ...rest
}) => {

  return (
    <select
      className={twMerge(
        'text-sm bg-neutral-700 px-2 py-1 rounded',
        'focus:outline-none focus:ring-1 focus:ring-zinc-400',
        className
      )}
      {...rest}
    >
      {children}
    </select>
  )
}
