import {Button} from "../atoms/Button.jsx";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons/faArrowLeft";
import {useNavigate, useSearchParams} from "react-router-dom";
import {RoutePaths} from "../../router/RoutePaths.js";
import {useTask} from "../../contexts/useTask.js";
import {useSection} from "../../contexts/useSection.js";
import {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck} from "@fortawesome/free-solid-svg-icons/faCheck";

export const Import = () => {
  const navigate = useNavigate()

  const [urlSearchParams] = useSearchParams()
  const {data} = Object.fromEntries(urlSearchParams)

  const {tasks, sections} = JSON.parse(data || '{}')
  const { importTasks } = useTask()
  const { importSections } = useSection()

  const [dataLoaded, setDataLoaded] = useState(false)

  const importData = () => {
    importTasks(tasks)
    importSections(sections)
    setDataLoaded(true)
  }


  return (
    <div className="w-full flex flex-col justify-start gap-8">
      <div className="flex flex-col gap-12 items-start">
        <Button
          className="w-max"
          icon={faArrowLeft}
          text="Home"
          type="ghost"
          onClick={() => navigate( RoutePaths.HOME)}
        />

        <div className="flex flex-col gap-8 w-full">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold">
              Import data
            </h1>
            <p className="text-sm text-zinc-400">
              You are importing a external data
            </p>
          </div>

          {!data && (
            <span className="text-sm">
              No data provided
            </span>
          )}

          {data && (
            <div className="flex flex-col gap-4">
              <p>
              <span className="text-sm text-zinc-400">
                Data to be imported:
              </span><br/>
                <span>
                {tasks.length} task{tasks.length > 1 ? 's' : ''} and {sections.length} section{sections.length > 1 ? 's' : ''}
              </span>
              </p>

              <div className="w-full flex flex-col items-center gap-2">
                {dataLoaded ? (
                  <span className="text-sm py-4 flex justify-center items-center gap-2">
                    <FontAwesomeIcon icon={faCheck}/>
                    Import completed!
                  </span>
                ): (
                  <>
                    <Button
                      text="Import"
                      className="w-full"
                      onClick={importData}
                    />
                    <Button
                      text="Cancel"
                      className="w-full"
                      type="outline"
                      onClick={() => navigate(RoutePaths.HOME)}
                    />
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
