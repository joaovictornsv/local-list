import {Input} from "../atoms/Input.jsx";
import {Button} from "../atoms/Button.jsx";
import {useRef, useState} from "react";
import {useTask} from "../../contexts/useTask.js";
import {useSection} from "../../contexts/useSection.js";
import {faPlus} from "@fortawesome/free-solid-svg-icons/faPlus";

export const AddForm = () => {
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

  const onAddTask = () => {
    if (!validateInput()) {
      return
    }

    newTask({
      title: inputValue
    })
  }
  const onAddSection = () => {
    if (!validateInput()) {
      return
    }
    newSection({
      title: inputValue
    })
  }

  const onChange = (e) => {
    setShowInputError(false)
    setInputValue(e.target.value)
  }

  return (
    <div className="flex flex-col gap-2 ">
      <Input
        value={inputValue}
        onChange={onChange}
        errorMessage={showInputError && 'Please fill the field with valid input'}
        label="What you need to do?"
        placeholder="Walk with the dog..."
        ref={inputRef}
      />
      <div className="flex items-center self-end gap-2">
        <Button onClick={onAddTask} icon={faPlus} text="Add task" />
        <Button onClick={onAddSection} icon={faPlus} text="Add section" />
      </div>
    </div>
  )
}
