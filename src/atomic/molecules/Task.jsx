import {Checkbox} from "../atoms/Checkbox.jsx";
import {Button} from "../atoms/Button.jsx";
import {faTrash} from "@fortawesome/free-solid-svg-icons/faTrash";
import {useTask} from "../../contexts/useTask.js";
import {Input} from "../atoms/Input.jsx";
import {faPencil} from "@fortawesome/free-solid-svg-icons/faPencil";
import {useRef, useState} from "react";
import {faSave} from "@fortawesome/free-solid-svg-icons/faSave";

export const Task = ({ task }) => {
  const [editMode, setEditMode] = useState(false)
  const [inputValue, setInputValue] = useState(task.title)
  const [showInputError, setShowInputError] = useState(false)

  const inputRef = useRef(null)

  const { toggleTaskDone, removeTask,editTask } = useTask()

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
    editTask(task.id, { title: inputValue })
    setEditMode(false)
  }

  const onChange = (e) => {
    setShowInputError(false)
    setInputValue(e.target.value)
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
        <Checkbox
          onChange={() => toggleTaskDone(task.id)}
          checked={task.done}
          label={!editMode && task.title}
          id={task.title}
        />
      )}

      {editMode ? (
        <Button icon={faSave} onClick={saveChanges} type="ghost"/>
      ): (
        <div className="flex items-center gap-1">
          <Button icon={faPencil} onClick={startEditMode} type="ghost"/>
          <Button icon={faTrash} onClick={() => removeTask(task.id)}  type="ghost"/>
        </div>
      )}

    </div>
  )
}
