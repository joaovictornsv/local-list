import {useTask} from "../../contexts/useTask.js";
import {useSection} from "../../contexts/useSection.js";
import {AddForm} from "../molecules/AddForm.jsx";
import {TaskList} from "../organisms/TaskList.jsx";
import {SectionList} from "../organisms/SectionList.jsx";

export const Home = () => {
  const {getIndependentTasks} = useTask()
  const {sections} = useSection()

  const tasks = getIndependentTasks()

  return (
    <div className="flex h-full w-full">
      <div className="flex flex-col justify-start gap-8 mx-auto w-96 mt-16 pb-16">
        <h1 className="text-3xl font-bold">
          LocalList
        </h1>

        <AddForm />

        <div className="flex flex-col gap-4">
          <TaskList tasks={tasks} />

          {!!tasks?.length && !!sections?.length && (
            <div className="bg-zinc-500 h-px" />
          )}

          <SectionList sections={sections}/>
        </div>
      </div>
    </div>
  )
}