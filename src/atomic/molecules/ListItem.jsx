import {Checkbox} from "../atoms/Checkbox.jsx";
import {Button} from "../atoms/Button.jsx";
import {useTask} from "../../contexts/useTask.js";
import {Input} from "../atoms/Input.jsx";
import {useRef, useState} from "react";
import {faSave} from "@fortawesome/free-solid-svg-icons/faSave";
import {Actions} from "./Actions.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faThumbtack} from "@fortawesome/free-solid-svg-icons/faThumbtack";
import {RoutePaths} from "../../router/RoutePaths.js";
import {useSection} from "../../contexts/useSection.js";
import {faArrowUpRightFromSquare} from "@fortawesome/free-solid-svg-icons/faArrowUpRightFromSquare";
import {useNavigate} from "react-router-dom";
import {faClose} from "@fortawesome/free-solid-svg-icons/faClose";
import {Select} from "../atoms/Select.jsx";

const FormWrapper = ({children, editMode, ...rest}) => (
  editMode
    ? <form {...rest}>{children}</form>
    : <div {...rest}>{children}</div>
)

const NO_SECTION_SELECT_VALUE = 'no-section'

export const ListItem = ({
  item,
  isSection
}) => {
  const navigate = useNavigate()
  const [editMode, setEditMode] = useState(false)
  const [inputValue, setInputValue] = useState(item.title)
  const [selectedSection, setSelectedSection] = useState(item.sectionId || NO_SECTION_SELECT_VALUE)
  const [showInputError, setShowInputError] = useState(false)

  const inputRef = useRef(null)

  const { toggleTaskDone, removeTask, editTask, getTasksBySectionId } = useTask()
  const { sections, editSection, removeSection } = useSection()

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

    editItem(item.id, {
      ...item,
      sectionId: selectedSection === NO_SECTION_SELECT_VALUE ? null : selectedSection,
      title: inputValue
    })
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

  const onKeyDownInput = (e) => {
    if (e.key !== 'Escape') {
      return
    }

    e.preventDefault()
    setEditMode(false)
  }

  return (
    <FormWrapper editMode={editMode} onSubmit={saveChanges} className="flex gap-2 justify-between items-start">
      {editMode ? (
        <Input
          onKeyDown={onKeyDownInput}
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
            <p className="flex text-sm items-start gap-2" title={`Open ${item.title}`}>
              <a
                href={RoutePaths.SECTION.replace(':sectionId', item.id)}
                target="_blank"
                rel="noreferrer"
                className=" text-inherit font-normal line-clamp-3 break-words cursor-pointer hover:text-zinc-50"
              >
                <FontAwesomeIcon className="py-1 h-3" icon={faArrowUpRightFromSquare} />
              </a>

              <span className="text-sm cursor-pointer hover:text-zinc-50" onClick={navigateToSectionPage}>
                {item.title}{' '}
                <span className="text-zinc-400">
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
          <div className="flex flex-items gap-1">
            <Select
              className="w-22"
              value={selectedSection}
              onChange={(e) => setSelectedSection(e.target.value)}
            >
              <option value={NO_SECTION_SELECT_VALUE}>No section</option>
              {sections.map((section) => (
                <option key={section.id} value={section.id}>
                  {section.title}
                </option>
              ))}
            </Select>

            <Button
              isSubmit
              className="w-max"
              icon={faSave}
              onClick={saveChanges}
              type="ghost"
            />

            <Button
              className="w-max"
              icon={faClose}
              onClick={() => setEditMode(false)}
              type="ghost"
            />
          </div>

        ): (
          <Actions
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
