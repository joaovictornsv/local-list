import {Button} from "../atoms/Button.jsx";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons/faArrowLeft";
import {useNavigate, useSearchParams} from "react-router-dom";
import {RoutePaths} from "../../router/RoutePaths.js";
import {faCopy} from "@fortawesome/free-solid-svg-icons/faCopy";
import {Input} from "../atoms/Input.jsx";
import {useTask} from "../../contexts/useTask.js";
import {useSection} from "../../contexts/useSection.js";
import {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck} from "@fortawesome/free-solid-svg-icons/faCheck";

export const Export = () => {
  const navigate = useNavigate()
  const {tasks, getTasksBySectionId} = useTask()
  const {sections, getSection} = useSection()

  const [exportLink, setExportLink] = useState('')
  const [copied, setCopied] = useState(false)
  const [exportingTasks, setExportingTasks] = useState([])

  const [urlSearchParams] = useSearchParams()
  const {sectionId} = Object.fromEntries(urlSearchParams)

  const section = sectionId && getSection(sectionId)

  useEffect(() => {
    generateLink()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tasks]);

  const generateLink = () => {
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

    const data = btoa(JSON.stringify({
      tasks: minifiedTasks,
      sections: sectionsToExport
    }))

    const link = `${window.location.origin}${RoutePaths.IMPORT}?data=${data}`
    setExportLink(link)
    setExportingTasks(tasksToExport)
  }

  const copyLinkToClipboard = () => {
    navigator.clipboard.writeText(exportLink)
      .then(() => {
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      })
  }

  if (!exportLink) {
    return null
  }

  return (
    <div className="w-full flex flex-col justify-start gap-8">
      <div className="flex flex-col gap-12 items-start">
        <Button
          className="w-max"
          icon={faArrowLeft}
          text={sectionId ? 'Section' : 'Home'}
          type="ghost"
          onClick={() => navigate(
            sectionId
              ? RoutePaths.SECTION.replace(':sectionId', section.id)
              : RoutePaths.HOME
          )}
        />

        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold">
              Share your data
            </h1>
            <p className="text-sm text-zinc-400">
              Copy the link below to share your data with another device or browser.
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
                <div className="flex items-center gap-2">
                  <Input readOnly value={exportLink} className="bg-zinc-950"  />

                  <Button
                    icon={faCopy}
                    className="w-max"
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
