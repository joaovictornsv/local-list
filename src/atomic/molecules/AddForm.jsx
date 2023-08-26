import {Input} from "../atoms/Input.jsx";
import {Button} from "../atoms/Button.jsx";
import {useRef, useState} from "react";
import {useTask} from "../../contexts/useTask.js";
import {useSection} from "../../contexts/useSection.js";
import {faPlus} from "@fortawesome/free-solid-svg-icons/faPlus";


export const AddForm = ({ isSectionScope, sectionId }) => {
  const [inputValue, setInputValue] = useState('')
  const [showInputError, setShowInputError] = useState(false)

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

  return (
    <form onSubmit={onAddTask}>
      <div className="flex flex-col gap-2 ">
        <Input
          value={inputValue}
          onChange={onChange}
          errorMessage={showInputError && 'Please fill the field with valid input'}
          label={isSectionScope ? 'Add new subtask' : 'What you need to do?'}
          placeholder="Buy milk"
          ref={inputRef}
        />
        <div className="flex items-center self-end gap-2">
          <Button isSubmit onClick={onAddTask} icon={faPlus} text="Add task" />
          {!isSectionScope && <Button onClick={onAddSection} icon={faPlus} text="Add section" />}
        </div>
      </div>
    </form>
  )
}
