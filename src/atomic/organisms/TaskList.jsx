import {ListItem} from "../molecules/ListItem.jsx";
import {sortByPin} from "../../utils/sortByPin.js";

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
        <ListItem key={task.id} item={task} />
      )}
    </div>
  )
}
