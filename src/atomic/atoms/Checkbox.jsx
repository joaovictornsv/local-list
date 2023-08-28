export const Checkbox = ({
  label,
  id,
  checked,
  ...rest
}) => {
  return (
    <label htmlFor={id} className="flex min-w-0 w-full justify-start items-start text-sm cursor-pointer gap-2">
      <input
        type="checkbox"
        className="mt-1 rounded bg-neutral-600 accent-zinc-200"
        id={id}
        {...rest}
      />

      <span className={`line-clamp-3 break-words ${checked?'line-through':''}`}>
        {label}
      </span>
    </label>
  )
}
