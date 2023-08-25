import {Checkbox} from "./Checkbox.jsx";

export const Task = ({task, onCheckTask}) => {
  console.log(task)
  return (
    <Checkbox
      onChange={() => onCheckTask({ title: task.title })}
      checked={task.done}
      label={task.title}
      id={task.title}
    />
  )
}
