export const Select = ({
  children,
  className,
  ...rest
}) => {

  return (
    <select
      className={`rounded px-2 text-sm py-1 focus:outline-none focus:ring-1 focus:ring-zinc-400 bg-neutral-700 ${className}`}
      {...rest}
    >
      {children}
    </select>
  )
}
