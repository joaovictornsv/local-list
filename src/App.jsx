import {Input} from "./components/Input.jsx";
import {Button} from "./components/Button.jsx";
import {useState} from "react";
import {Task} from "./components/Task.jsx";
import {Section} from "./components/Section.jsx";
import {faSquarePlus} from "@fortawesome/free-regular-svg-icons";



export default function App() {
  const [tasks, setTasks] = useState([])
  const [sections, setSections] = useState([])
  const [task, setTask] = useState('')

  const onAddTask = () => {
    setTasks([
      ...tasks,
      {
        done: false,
        title: task,
      }
    ])
  }
  const onAddSection = () => {
    setSections([
      ...sections,
      {
        title: task,
        tasks: []
      }
    ])
  }

  const onCheckTask = ({
    title
  }) => {
    setTasks(
      tasks.map((t) => {
        if (t.title === title) {
          t.done = !t.done
        }

        return t
      })
    )
  }

  console.log(tasks)

  return (
    <div className="flex h-screen w-screen bg-gradient-to-r from-zinc-800 to-zinc-900">
      <div className="flex flex-col gap-2 mx-auto w-96">
        <h1 className="text-3xl font-bold">
          local-list
        </h1>
        <Input value={task} onChange={(e) => setTask(e.target.value) }/>
        <div className="flex items-center self-end gap-2">
          <Button onClick={onAddTask} text="+ Add task" />
          <Button onClick={onAddSection} text="+ Add section" />
        </div>

        {!!tasks.length && (
          <span>
          Done: {tasks.filter(t => t.done).length}/{tasks.length}
        </span>
        )}

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            {tasks.map((t) =>
              <Task key={t.title} task={t} onCheckTask={onCheckTask}/>
            )}
          </div>

          {!!tasks.length && !!sections.length && (
            <div className="bg-zinc-500 h-px" />
          )}

          <div className="flex flex-col gap-2">
            {sections.map((s) =>
              <Section key={s.title} section={s} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
