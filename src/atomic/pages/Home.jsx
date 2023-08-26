import {useTask} from "../../contexts/useTask.js";
import {useSection} from "../../contexts/useSection.js";
import {AddForm} from "../molecules/AddForm.jsx";
import {TaskList} from "../organisms/TaskList.jsx";
import {SectionList} from "../organisms/SectionList.jsx";
import {Button} from "../atoms/Button.jsx";
import {faFileExport} from "@fortawesome/free-solid-svg-icons/faFileExport";
import {useNavigate} from "react-router-dom";
import {RoutePaths} from "../../router/RoutePaths.js";

export const Home = () => {
  const navigate = useNavigate()
  const {getIndependentTasks} = useTask()
  const {sections} = useSection()

  const tasks = getIndependentTasks()

  return (
    <div className="w-full flex flex-col justify-start gap-8">
      <div className="flex flex-col items-start justify-between gap-12">
        <Button className="w-max" icon={faFileExport} text="Export" type="ghost" onClick={() => navigate(RoutePaths.EXPORT)}/>

        <h1 className="text-3xl font-bold">
          LocalList
        </h1>
      </div>

      <AddForm />

      <div className="flex flex-col gap-4">
        <TaskList tasks={tasks} />

        {!!tasks?.length && !!sections?.length && (
          <div className="bg-zinc-500 h-px" />
        )}

        <SectionList sections={sections}/>
      </div>
    </div>
  )
}
