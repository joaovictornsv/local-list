import {twMerge} from "tailwind-merge";

export const Select = ({
  children,
  label,
  labelClassName,
  className,
  ...rest
}) => {

  return (
    <label className={twMerge("flex gap-2 w-full text-sm flex-col", labelClassName)}>
      {label && <span>{label}</span>}
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
    </label>
  )
}
