import {Section} from "../molecules/Section.jsx";

const sortByPin = (itemA, itemB) => {
  return (itemA.pinned === itemB.pinned)? 0 : itemA.pinned? -1 : 1;
}


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
