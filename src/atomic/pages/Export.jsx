import {Button} from "../atoms/Button.jsx";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons/faArrowLeft";
import {useNavigate, useSearchParams} from "react-router-dom";
import {RoutePaths} from "../../router/RoutePaths.js";
import {faCopy} from "@fortawesome/free-solid-svg-icons/faCopy";
import {useTask} from "../../contexts/useTask.js";
import {useSection} from "../../contexts/useSection.js";
import {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck} from "@fortawesome/free-solid-svg-icons/faCheck";
import {Textarea} from "../atoms/Textarea.jsx";

export const Export = () => {
  const navigate = useNavigate()
  const {tasks, getTasksBySectionId} = useTask()
  const {sections, getSection} = useSection()

  const [exportData, setExportData] = useState('')
  const [copied, setCopied] = useState(false)
  const [exportingTasks, setExportingTasks] = useState([])

  const [urlSearchParams] = useSearchParams()
  const {sectionId} = Object.fromEntries(urlSearchParams)

  const section = sectionId && getSection(sectionId)

  useEffect(() => {
    generateData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tasks]);

  const generateData = () => {
    const tasksToExport = sectionId
      ? getTasksBySectionId(sectionId)
      : tasks

    const sectionsToExport = sectionId
      ? [section]
      : sections

    const minifiedTasks = tasksToExport.map(({title, done, sectionId}) => ({
      title,
      done,
      ...(sectionId && {sectionId})
    }))

    const data = JSON.stringify({
      tasks: minifiedTasks,
      sections: sectionsToExport
    })

    setExportData(data)
    setExportingTasks(tasksToExport)
  }

  const copyLinkToClipboard = () => {
    navigator.clipboard.writeText(exportData)
      .then(() => {
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      })
  }

  if (!exportData) {
    return null
  }

  return (
    <div className="w-full flex flex-col justify-start gap-8">
      <div className="flex flex-col gap-12 items-start">
        <Button
          className="w-max"
          icon={faArrowLeft}
          text={sectionId ? 'Section' : 'Share'}
          type="ghost"
          onClick={() => navigate(
            sectionId
              ? RoutePaths.SECTION.replace(':sectionId', section.id)
              : RoutePaths.SHARE
          )}
        />

        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold">
              Share your data
            </h1>
            <p className="text-sm text-zinc-400">
              Copy the json below to share your data with another device or browser.
            </p>
          </div>

          {sectionId && !section ? (
            <span className="text-sm">Section not found</span>
          ): (
            <>
              <p>
                <span className="text-sm text-zinc-400">
                  You are sharing {sectionId ? (
                    <>the section <span className="text-zinc-200 font-bold">{section.title}</span>, that includes</>
                ) : 'a total of'}:
                </span><br/>
                  <span>
                  {exportingTasks.length} task{exportingTasks.length > 1 ? 's' : ''}
                    {!sectionId && (
                      <>
                        {' '}and {sections.length} section{sections.length > 1 ? 's' : ''}
                      </>
                    )}
                </span>
              </p>
              <div className="w-full flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <Textarea rows="5" readOnly value={exportData} className="resize-none"  />

                  <Button
                    icon={faCopy}
                    text="Copy"
                    onClick={copyLinkToClipboard}
                  />
                </div>
                {copied && (
                  <span className="text-sm flex justify-center items-center gap-2">
                    <FontAwesomeIcon icon={faCheck}/>
                    Copied!
                  </span>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
