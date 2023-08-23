import {Input} from "./components/Input.jsx";
import {Button} from "./components/Button.jsx";
import {useState} from "react";
import {Checkbox} from "./components/Checkbox.jsx";
import {Task} from "./components/Task.jsx";
import {Section} from "./components/Section.jsx";



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

  const onAddTaskToSection = ({
    task,
    sectionTitle
  }) => {
    setSections(sections.map((s) => {
      if (s.title === sectionTitle) {
        s.tasks.push(task)
      }
      return s
    }))
  }

  return (
    <div className="flex h-screen w-screen">
      <div className="flex flex-col mx-auto w-96">
        <h1 className="text-3xl font-bold">
          local-list
        </h1>
        <Input value={task} onChange={(e) => setTask(e.target.value) }/>
        <div className="flex items-center self-end">
          <Button onClick={onAddTask} >+ Add task</Button>
          <Button onClick={onAddSection}>+ Add section</Button>
        </div>

        <div className="flex flex-col">
          {tasks.map((t) =>
            <Task key={t.title} task={t}/>
          )}

          {sections.map((s) =>
            <Section key={s.title} section={s} onAddTaskToSection={onAddTaskToSection}/>
          )}
        </div>
      </div>
    </div>
  )
}
