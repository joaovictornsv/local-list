import { twMerge } from 'tailwind-merge';

export const Select = ({
  children,
  label,
  labelClassName,
  className,
  ...rest
}) => {
  return (
    <label
      className={twMerge('flex w-full flex-col gap-2 text-sm', labelClassName)}
    >
      {label && <span>{label}</span>}
      <select
        className={twMerge(
          'rounded bg-neutral-700 px-2 py-1 text-sm',
          'focus:outline-none focus:ring-1 focus:ring-zinc-400',
          className,
        )}
        {...rest}
      >
        {children}
      </select>
    </label>
  );
};
