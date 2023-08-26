import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowUpRightFromSquare} from "@fortawesome/free-solid-svg-icons/faArrowUpRightFromSquare";
import {useNavigate} from "react-router-dom";
import {Button} from "../atoms/Button.jsx";
import {faSave} from "@fortawesome/free-solid-svg-icons/faSave";
import {faPencil} from "@fortawesome/free-solid-svg-icons/faPencil";
import {faTrash} from "@fortawesome/free-solid-svg-icons/faTrash";
import {useRef, useState} from "react";
import {useSection} from "../../contexts/useSection.js";
import {Input} from "../atoms/Input.jsx";
import {useTask} from "../../contexts/useTask.js";
import {RoutePaths} from "../../router/RoutePaths.js";

export const Section = ({
  section,
}) => {
  const navigate = useNavigate()
  const [editMode, setEditMode] = useState(false)
  const [inputValue, setInputValue] = useState(section.title)
  const [showInputError, setShowInputError] = useState(false)
  const [showRemoveConfirmation, setShowRemoveConfirmation] = useState(false)

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
    editSection(section.id, { title: inputValue })
    setEditMode(false)
  }

  const onChange = (e) => {
    setShowInputError(false)
    setInputValue(e.target.value)
  }

  const askRemoveConfirmation = () => {
    setShowRemoveConfirmation(true)
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
              {tasks.length ? (
                `${tasks.filter(t => t.done).length}/${tasks.length}`
              ): 'No tasks'}
            </span>
          </p>
        </div>
      )}

      {editMode ? (
        <Button icon={faSave} onClick={saveChanges} type="ghost"/>
      ): (
        <div className="flex relative items-center gap-1">
          <Button icon={faPencil} onClick={startEditMode} type="ghost"/>
          <Button icon={faTrash} onClick={askRemoveConfirmation}  type="ghost"/>
          {showRemoveConfirmation && <div className="absolute top-0 flex flex-col gap-1 right-0 translate-x-full">
            <Button className="ml-2" size="sm" text="Sure?" type="danger" onClick={() => removeSection(section.id)}/>
            <Button className="ml-2" size="sm" text="Cancel" onClick={() => setShowRemoveConfirmation(false)}/>
          </div>}
        </div>
      )}
    </div>
  )
}

