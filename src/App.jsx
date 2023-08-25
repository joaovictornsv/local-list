import {Task} from "./atomic/molecules/Task.jsx";
import {Section} from "./atomic/molecules/Section.jsx";
import {AddForm} from "./atomic/molecules/AddForm.jsx";
import {useTask} from "./contexts/useTask.js";
import {useSection} from "./contexts/useSection.js";

export default function App() {
  const {tasks} = useTask()
  const {sections} = useSection()

  if (!tasks || !sections) {
    return null
  }

  return (
    <div className="flex h-screen w-screen bg-gradient-to-r from-zinc-800 to-zinc-900">
      <div className="flex flex-col gap-8 mx-auto w-96 mt-16">
        <h1 className="text-3xl font-bold">
          LocalList
        </h1>

        <AddForm />

        <div className="flex flex-col gap-4">
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

          {!!tasks.length && !!sections.length && (
            <div className="bg-zinc-500 h-px" />
          )}

          <div className="flex flex-col gap-2">
            {sections.map((section) =>
              <Section key={section.id} section={section} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
