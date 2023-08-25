import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck} from "@fortawesome/free-solid-svg-icons/faCheck";

export const Checkbox = ({
  label,
  id,
  checked,
  ...rest
}) => {
  return (
    <label htmlFor={id} className="text-sm flex items-center gap-2">
      <input
        type="checkbox"
        className="hidden peer p-2 rounded"
        id={id}
        {...rest}
      />

      <div className="h-4 w-4 bg-zinc-600 rounded-sm peer-checked:bg-zinc-200 flex items-center justify-center">
        <FontAwesomeIcon icon={faCheck} className={`text-zinc-800 text-xs ${checked?'block':'hidden'}`}/>
      </div>

      <span className="peer-checked:line-through">
        {label}
      </span>
    </label>
  )
}
