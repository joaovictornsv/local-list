import classNames from 'classnames';

export const Checkbox = ({ label, id, checked, ...rest }) => {
  return (
    <label
      htmlFor={id}
      className="flex w-full min-w-0 cursor-pointer items-start justify-start gap-2 text-sm"
    >
      <input
        type="checkbox"
        className="mt-1 rounded bg-neutral-600 accent-zinc-200"
        id={id}
        checked={checked}
        {...rest}
      />

      <span
        className={classNames('line-clamp-3 break-words', {
          'line-through': checked,
        })}
      >
        {label}
      </span>
    </label>
  );
};
