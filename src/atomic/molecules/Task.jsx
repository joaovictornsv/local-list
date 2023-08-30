import {Checkbox} from "../atoms/Checkbox.jsx";
import {Button} from "../atoms/Button.jsx";
import {useTask} from "../../contexts/useTask.js";
import {Input} from "../atoms/Input.jsx";
import {useRef, useState} from "react";
import {faSave} from "@fortawesome/free-solid-svg-icons/faSave";
import {Options} from "./Options.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faThumbtack} from "@fortawesome/free-solid-svg-icons/faThumbtack";

export const Task = ({ task }) => {
  const [editMode, setEditMode] = useState(false)
  const [inputValue, setInputValue] = useState(task.title)
  const [showInputError, setShowInputError] = useState(false)

  const inputRef = useRef(null)

  const { toggleTaskDone, removeTask, editTask } = useTask()

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
    editTask(task.id, { ...task, title: inputValue })
    setEditMode(false)
  }

  const onChange = (e) => {
    setShowInputError(false)
    setInputValue(e.target.value)
  }

  const onPinTask = () => {
    editTask(task.id, { ...task, pinned: !task.pinned })
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
          id={task.id}
        />
      )}

      <div className="flex items-center gap-2">
        {task.pinned && !editMode && <FontAwesomeIcon icon={faThumbtack} className="text-sm rotate-45 text-zinc-400"/>}

        {editMode ? (
          <Button className="w-max" icon={faSave} onClick={saveChanges} type="ghost"/>
        ): (
          <Options
            onDelete={() => removeTask(task.id)}
            onEdit={startEditMode}
            onPin={onPinTask}
            alreadyPinned={task.pinned}
          />
        )}
      </div>

    </div>
  )
}
