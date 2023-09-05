import {Checkbox} from "../atoms/Checkbox.jsx";
import {Button} from "../atoms/Button.jsx";
import {useTask} from "../../contexts/useTask.js";
import {Input} from "../atoms/Input.jsx";
import {useRef, useState} from "react";
import {faSave} from "@fortawesome/free-solid-svg-icons/faSave";
import {Options} from "./Options.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faThumbtack} from "@fortawesome/free-solid-svg-icons/faThumbtack";
import {useNavigate} from "react-router-dom";
import {RoutePaths} from "../../router/RoutePaths.js";
import {useSection} from "../../contexts/useSection.js";
import {faArrowUpRightFromSquare} from "@fortawesome/free-solid-svg-icons/faArrowUpRightFromSquare";

const FormWrapper = ({children, editMode, ...rest}) => (
  editMode
    ? <form {...rest}>{children}</form>
    : <div {...rest}>{children}</div>
)

export const ListItem = ({
  item,
  isSection
}) => {
  const navigate = useNavigate()
  const [editMode, setEditMode] = useState(false)
  const [inputValue, setInputValue] = useState(item.title)
  const [showInputError, setShowInputError] = useState(false)

  const inputRef = useRef(null)

  const { toggleTaskDone, removeTask, editTask, getTasksBySectionId } = useTask()
  const { editSection, removeSection } = useSection()

  const tasks = isSection ? getTasksBySectionId(item.id) : []
  const editItem = isSection ? editSection : editTask
  const removeItem = isSection ? removeSection : removeTask

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

  const saveChanges = (e) => {
    if (e) {
      e.preventDefault()
    }

    if (!validateInput()) {
      return
    }
    editItem(item.id, { ...item, title: inputValue })
    setEditMode(false)
  }

  const onChange = (e) => {
    setShowInputError(false)
    setInputValue(e.target.value)
  }

  const onPinItem = () => {
    editItem(item.id, { ...item, pinned: !item.pinned })
  }

  const navigateToSectionPage = () => {
    navigate(`${RoutePaths.SECTION.replace(':sectionId', item.id)}`)
  }


  return (
    <FormWrapper editMode={editMode} onSubmit={saveChanges} className="flex gap-2 justify-between items-start">
      {editMode ? (
        <Input
          value={inputValue}
          onChange={onChange}
          className="bg-transparent"
          errorMessage={showInputError && 'Please fill the field with valid input'}
          ref={inputRef}
        />
      ): (
        isSection
        ? (
          <div className="w-max">
            <p className="flex items-start gap-2 cursor-pointer hover:text-zinc-50" onClick={navigateToSectionPage}>
              <FontAwesomeIcon className="py-1 h-3" icon={faArrowUpRightFromSquare} />

              <span className="text-sm line-clamp-3 break-words">
                {item.title}{' '}
                <span className="text-sm text-zinc-400">
                  {tasks.filter(t => t.done).length}/{tasks.length}
                </span>
              </span>
            </p>
          </div>
        ) : (
          <Checkbox
            onChange={() => toggleTaskDone(item.id)}
            checked={item.done}
            label={!editMode && item.title}
            id={item.id}
          />
        )
      )}

      <div className="flex items-center gap-2">
        {item.pinned && !editMode && <FontAwesomeIcon icon={faThumbtack} className="text-sm rotate-45 text-zinc-400"/>}

        {editMode ? (
          <Button
            isSubmit
            className="w-max"
            icon={faSave}
            onClick={saveChanges}
            type="ghost"
          />
        ): (
          <Options
            onDelete={() => removeItem(item.id)}
            onEdit={startEditMode}
            onPin={onPinItem}
            alreadyPinned={item.pinned}
          />
        )}
      </div>
    </FormWrapper>
  )
}
