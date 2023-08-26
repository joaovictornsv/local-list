import {Task} from "../molecules/Task.jsx";

export const TaskList = ({ tasks }) => {

  if (!tasks) {
    return (
      <span className="text-sm">
        Loading tasks...
      </span>
    )
  }

  return (
    <div className="flex flex-col gap-2">
      {!!tasks.length && (
        <span className="text-sm">
          Done: {tasks.filter(t => t.done).length}/{tasks.length}
        </span>
      )}
      {tasks.map((task) =>
        <Task key={task.id} task={task} />
      )}
    </div>
  )
}
