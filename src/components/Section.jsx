import {Input} from "./Input.jsx";
import {Button} from "./Button.jsx";
import {Task} from "./Task.jsx";
import {useState} from "react";

export const Section = ({
  section,
  onAddTaskToSection
}) => {
  const [task, setTask] = useState('')

  const onAddSubTask = () => {
    onAddTaskToSection({
      sectionTitle: section.title,
      task: {
        done: false,
        title: task,
      }
    })
  }

  return (
    <details key={section.title} >
      <summary>
        {section.title}
      </summary>
      <div className="ml-2 pl-8 border-l">
        <div className="flex items-center grow">
          <Input value={task} onChange={(e) => setTask(e.target.value) }/>
          <Button onClick={onAddSubTask}>+</Button>
        </div>
        {section.tasks.map((t) =>
          <Task key={t.title} task={t}/>
        )}
      </div>

    </details>
  )
}
