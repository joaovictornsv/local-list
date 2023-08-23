import {Checkbox} from "./Checkbox.jsx";

export const Task = ({task}) => (
  <div key={task.title} className="flex items-center gap-4">
    <Checkbox checked={task.done}/>
    <span>{task.title}</span>
  </div>
)
