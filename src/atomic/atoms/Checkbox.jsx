import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck} from "@fortawesome/free-solid-svg-icons/faCheck";

export const Checkbox = ({
  label,
  id,
  checked,
  ...rest
}) => {
  return (
    <label htmlFor={id} className="flex justify-start items-start text-sm cursor-pointer gap-2">
      <input
        type="checkbox"
        className="hidden p-2 rounded"
        id={id}
        {...rest}
      />

      <div>
        <div className={`h-4 w-4 rounded-sm ${checked?'bg-zinc-200':'bg-zinc-600 '} flex items-center justify-center`}>
          <FontAwesomeIcon icon={faCheck} className={`text-zinc-800 text-xs ${checked?'block':'hidden'}`}/>
        </div>
      </div>

      <div>
        <span className={`line-clamp-3 break-all ${checked?'line-through':''}`}>
          {label}
        </span>
      </div>
    </label>
  )
}
