import {Section} from "../molecules/Section.jsx";

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
      {sections.map((section) =>
        <Section key={section.id} section={section} />
      )}
    </div>
  )
}
