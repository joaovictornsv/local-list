import {Section} from "../molecules/Section.jsx";
import {sortByPin} from "../../utils/sortByPin.js";


export const SectionList = ({sections}) => {

  if (!sections) {
    return (
      <span className="text-sm">
        Loading sections...
      </span>
    )
  }

  return (
    <div className="flex flex-col gap-2">
      {sections.sort(sortByPin).map((section) =>
        <Section key={section.id} section={section} />
      )}
    </div>
  )
}
