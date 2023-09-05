import {sortByPin} from "../../utils/sortByPin.js";
import {ListItem} from "../molecules/ListItem.jsx";


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
        <ListItem isSection key={section.id} item={section} />
      )}
    </div>
  )
}
