import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowUpRightFromSquare} from "@fortawesome/free-solid-svg-icons/faArrowUpRightFromSquare";
import {useNavigate} from "react-router-dom";
import {Button} from "../atoms/Button.jsx";
import {faSave} from "@fortawesome/free-solid-svg-icons/faSave";
import {useRef, useState} from "react";
import {useSection} from "../../contexts/useSection.js";
import {Input} from "../atoms/Input.jsx";
import {useTask} from "../../contexts/useTask.js";
import {RoutePaths} from "../../router/RoutePaths.js";
import {Options} from "./Options.jsx";
import {faThumbtack} from "@fortawesome/free-solid-svg-icons/faThumbtack";

export const Section = ({
  section,
}) => {
  const navigate = useNavigate()
  const [editMode, setEditMode] = useState(false)
  const [inputValue, setInputValue] = useState(section.title)
  const [showInputError, setShowInputError] = useState(false)

  const inputRef = useRef(null)

  const { editSection, removeSection } = useSection()
  const {getTasksBySectionId} = useTask()

  const tasks = getTasksBySectionId(section.id)

  const validateInput = () => {
    if (!inputValue.trim()) {
      setShowInputError(true)
      inputRef.current.focus()
      return false
    }
    return true
  }

  const startEditMode = () => {
    setEditMode(true)
  }


  const saveChanges = () => {
    if (!validateInput()) {
      return
    }
    editSection(section.id, { ...section, title: inputValue })
    setEditMode(false)
  }

  const onChange = (e) => {
    setShowInputError(false)
    setInputValue(e.target.value)
  }

  const onPinSection = () => {
    editSection(section.id, { ...section, pinned: !section.pinned })
  }

  const navigateToSectionPage = () => {
    navigate(`${RoutePaths.SECTION.replace(':sectionId', section.id)}`)
  }

  return (
    <div className={`flex gap-2 justify-between ${editMode ? 'items-start' : 'items-center'}`}>
      {editMode ? (
        <Input
          value={inputValue}
          onChange={onChange}
          className="bg-transparent"
          errorMessage={showInputError && 'Please fill the field with valid input'}
          ref={inputRef}
        />
      ): (
        <div className="w-max">
          <p className="flex items-center gap-2 cursor-pointer hover:text-zinc-50" onClick={navigateToSectionPage}>
            <FontAwesomeIcon className="h-3" icon={faArrowUpRightFromSquare} />

            <span className="text-sm line-clamp-3 break-all leading-none">
              {section.title}{' '}
            </span>

            <span className="text-sm text-zinc-400">
              {tasks.filter(t => t.done).length}/{tasks.length}
            </span>
          </p>
        </div>
      )}

      <div className="flex items-center gap-2">
        {section.pinned && !editMode  && <FontAwesomeIcon icon={faThumbtack} className="text-sm rotate-45 text-zinc-400"/>}

        {editMode ? (
          <Button className="w-max" icon={faSave} onClick={saveChanges} type="ghost"/>
        ): (
          <Options
            onDelete={() => removeSection(section.id)}
            onEdit={startEditMode}
            onPin={onPinSection}
            alreadyPinned={section.pinned}
          />
        )}
      </div>
    </div>
  )
}

