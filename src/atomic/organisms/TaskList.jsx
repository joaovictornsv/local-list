import {Task} from "../molecules/Task.jsx";

const sortByPin = (itemA, itemB) => {
  return (itemA.pinned === itemB.pinned)? 0 : itemA.pinned? -1 : 1;
}

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
        <span className="text-sm text-zinc-400">
          Done: {tasks.filter(t => t.done).length}/{tasks.length}
        </span>
      )}
      {tasks.sort(sortByPin).map((task) =>
        <Task key={task.id} task={task} />
      )}
    </div>
  )
}
