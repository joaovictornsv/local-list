import {Button} from "../atoms/Button.jsx";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons/faArrowLeft";
import {useNavigate} from "react-router-dom";
import {RoutePaths} from "../../router/RoutePaths.js";
import {useTask} from "../../contexts/useTask.js";
import {useSection} from "../../contexts/useSection.js";
import {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck} from "@fortawesome/free-solid-svg-icons/faCheck";
import {Textarea} from "../atoms/Textarea.jsx";
import {isValidJsonString} from "../../utils/isValidJsonString.js";

const isValidJsonData = (data) => {
  console.log(data)
  if (!Array.isArray(data.sections) || !Array.isArray(data.tasks)) {
    console.log('not a array')
    return false
  }

  const validTasks = data.tasks.length ? data.tasks.every((task) => {
    return (
      task.title !== undefined &&
      task.done !== undefined
    )
  }) : true
  const validSections =  data.sections.length ? data.sections.every((task) => {
    return (
      task.id !== undefined &&
      task.title !== undefined
    )
  }) : true

  console.log('validSections', validSections)
  console.log('validTasks', validTasks)

  return !(!validTasks || !validSections);
}

export const Import = () => {
  const navigate = useNavigate()
  const [dataToImport, setDataToImport] = useState('')
  const [tasksToImport, setTasksToImport] = useState([])
  const [sectionsToImport, setSectionsToImport] = useState([])

  const { importTasks } = useTask()
  const { importSections } = useSection()

  const [dataLoaded, setDataLoaded] = useState(false)
  const [invalidJsonData, setInvalidJsonData] = useState(false)


  const validateAndParseData = (e) => {
    const data = e.target.value
    setDataToImport(data)

    if (!isValidJsonString(data)) {
      console.log('invalid string')
      setInvalidJsonData(true)
      return
    }

    const parsedData = JSON.parse(data)
    if (!isValidJsonData(parsedData)) {
      setInvalidJsonData(true)
      return
    }

    setTasksToImport(parsedData.tasks)
    setSectionsToImport(parsedData.sections)
    setInvalidJsonData(false)
  }

  const importData = () => {
    importTasks(tasksToImport)
    importSections(sectionsToImport)
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
              Paste the JSON data bellow to import a external data
            </p>
          </div>

          <Textarea
            rows="5"
            value={dataToImport}
            onChange={validateAndParseData}
            className="bg-zinc-950 resize-none"
          />

          {dataToImport && invalidJsonData && (
            <span className="text-sm">
              Invalid JSON provided.
            </span>
          )}

          {dataToImport && !invalidJsonData && (
            <div className="flex flex-col gap-4">
              <p>
              <span className="text-sm text-zinc-400">
                Data to be imported:
              </span><br/>
                <span>
                {tasksToImport.length} task{tasksToImport.length > 1 ? 's' : ''} and {sectionsToImport.length} section{sectionsToImport.length > 1 ? 's' : ''}
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
