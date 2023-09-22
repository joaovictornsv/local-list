import {Input} from "../atoms/Input.jsx";
import {Button} from "../atoms/Button.jsx";
import {useEffect, useRef, useState} from "react";
import {useTask} from "../../contexts/useTask.js";
import {useSection} from "../../contexts/useSection.js";
import {faPlus} from "@fortawesome/free-solid-svg-icons/faPlus";
import {generateRandomPlaceholder} from "../../utils/generateRandomPlaceholder.js";
import {useSettings} from "../../contexts/useSettings.js";
import {SECTION_VALUE } from "../../hooks/useSettingsStorage.js";


export const AddForm = ({ isSectionScope, sectionId }) => {
  const [inputValue, setInputValue] = useState('')
  const [showInputError, setShowInputError] = useState(false)
  const [randomPlaceholder, setRandomPlaceholder] = useState('')

  const { settings } = useSettings()

  useEffect(() => {
    setRandomPlaceholder(generateRandomPlaceholder())
  }, []);

  const inputRef = useRef(null)

  const { newTask } = useTask()
  const { newSection } = useSection()

  const validateInput = () => {
    if (!inputValue.trim()) {
      setShowInputError(true)
      inputRef.current.focus()
      return false
    }
    return true
  }

  const onAddTask = (e) => {
    if (e) {
      e.preventDefault()
    }

    if (!validateInput()) {
      return
    }

    setInputValue('')
    newTask({
      title: inputValue,
      sectionId
    })
  }
  const onAddSection = (e) => {
    if (e) {
      e.preventDefault()
    }
    if (!validateInput()) {
      return
    }
    setInputValue('')
    newSection({
      title: inputValue
    })
  }

  const onChange = (e) => {
    setShowInputError(false)
    setInputValue(e.target.value)
  }

  const onSubmit = isSectionScope
    ? onAddTask
    : settings.defaultItemToAdd === SECTION_VALUE
    ? onAddSection
    : onAddTask

  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col gap-2 ">
        <Input
          value={inputValue}
          onChange={onChange}
          errorMessage={showInputError && 'Please fill the field with valid input'}
          label={isSectionScope ? 'Add new subtask' : 'What do you need to do?'}
          placeholder={randomPlaceholder}
          ref={inputRef}
        />
        <div className="flex items-center self-end gap-2">
          <Button
            text="Add task"
            icon={faPlus}
            className="w-max"
            onClick={onAddTask}
            isSubmit={isSectionScope || settings.defaultItemToAdd !== SECTION_VALUE}
          />
          {!isSectionScope && (
            <Button
              text="Add section"
              icon={faPlus}
              className="w-max"
              onClick={onAddSection}
              isSubmit={settings.defaultItemToAdd === SECTION_VALUE}
            />
          )}
        </div>
      </div>
    </form>
  )
}
