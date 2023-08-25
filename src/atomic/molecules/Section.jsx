import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowUpRightFromSquare} from "@fortawesome/free-solid-svg-icons/faArrowUpRightFromSquare";

export const Section = ({
  section,
}) => {
  return (
    <div className="w-max">
      <p className="flex items-center gap-2 hover:text-zinc-50">
        <FontAwesomeIcon className="h-3 cursor-pointer" icon={faArrowUpRightFromSquare} />

        <span className="text-sm cursor-pointer">
        {section.title}
      </span>
      </p>
    </div>
  )
}

