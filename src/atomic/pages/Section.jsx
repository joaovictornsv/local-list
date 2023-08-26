import {useNavigate, useParams} from "react-router-dom";
import {TaskList} from "../organisms/TaskList.jsx";
import {useSection} from "../../contexts/useSection.js";
import {useEffect, useState} from "react";
import {AddForm} from "../molecules/AddForm.jsx";
import {Button} from "../atoms/Button.jsx";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons/faArrowLeft";
import {useTask} from "../../contexts/useTask.js";

export const Section = () => {
  const navigate = useNavigate()
  const { sectionId } = useParams()
  const { getSection } = useSection()
  const {getTasksBySectionId} = useTask()

  const [section, setSection] = useState()
  const [tasks, setTasks] = useState()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setSection(getSection(sectionId))
    setTasks(getTasksBySectionId(sectionId))
    setIsLoading(false)
  }, [getTasksBySectionId, getSection, sectionId]);

  if (isLoading) {
    return (
      <div className="flex w-screen">
        <span className="m-auto">Loading...</span>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-screen w-screen bg-gradient-to-r from-zinc-800 to-zinc-900">
      <div className="flex flex-col justify-start gap-12 mx-auto w-96 mt-4">
        <Button className="w-max" icon={faArrowLeft} text="Home" type="ghost" onClick={() => navigate('/')} />

        {section ? (
          <div className="flex flex-col gap-8">
            <h1 className="text-3xl font-bold">
              {section.title}
            </h1>

            <AddForm isSectionScope sectionId={sectionId} />

            {tasks.length ? (
              <div className="flex flex-col gap-4">
                <TaskList tasks={tasks} />
              </div>
            ): (
              <div className="w-52 text-center mx-auto">
                <span className="text-sm text-zinc-400">
                   {/* eslint-disable-next-line react/no-unescaped-entities */}
                  You have not created any tasks for this section
                </span>
              </div>
            )}
          </div>
        ) : (
          <div className="flex">
            <span className="m-auto">Section not found</span>
          </div>
        )}

      </div>
    </div>
  )
}
